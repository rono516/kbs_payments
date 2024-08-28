from datetime import datetime, date
import random
from django.core.cache import cache
import uuid
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseRedirect
from django.http import HttpResponse
import requests
from rest_framework import status
import json
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
import vonage
from django.conf import settings
from django.urls import reverse
from urllib.parse import urlencode
import paypalrestsdk
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from mpesa.api.b2c import B2C
from mpesa.api.mpesa_express import MpesaExpress
from django_daraja.mpesa.core import MpesaClient
from .serializers import LoanApplicationSerializer, SavingsApplicationSerializer, MemberSerializer

# from .serializers import MemberSerializer
from .helpers import get_access_token, generate_password, get_timestamp, generate_access_token
from .models import CustomUser, SavingsApplication, LoanApplication

access_token = get_access_token()

def index(request):
    return render(request, "api/index.html")

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        otp_digit = data.get('otp_digit')

        if not email or not password or not otp_digit:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:                                
            user = User.objects.create_user(username=email, email=email, password=password)
            if user:
                custom_user = CustomUser.objects.create_user(
                    email=email, 
                    password=password, 
                    phone=data.get('phone_number'), 
                    id_number=data.get('idNumber'), 
                    sacco_user_id=None, 
                    date_of_birth=data.get('date_of_birth'),
                    otp_digit=otp_digit
                )
                refresh = RefreshToken.for_user(user)
                return JsonResponse({'message': 'User registered successfully', 'sacco_user_id': custom_user.id, 'access': str(refresh.access_token), 'phone': custom_user.phone}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        phone = data.get('phone')
        password = data.get('password') 

        user = authenticate(phone=phone, password=password)
        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            # Generate OTP
            otp = random.randint(100000, 999999)
            # Store OTP in cache (or save in the database)
            cache.set(f"otp_{user.sacco_user_id}", otp, timeout=300)  # 5 minutes timeout

            # sending otp to phone
            vonage_number = phone.lstrip("+")
            client = vonage.Client(key="cfd95ab1", secret="8dj5jJ6hWM1X072W")
            sms = vonage.Sms(client)
            response_sms = sms.send_message({
                "from": "The Kenya Bankers",
                "to": f"{vonage_number}",
                "text": f"Your OTP for account verification is: {otp}",
            })
            print("Vonage API Response:", response_sms)

            # Handle success or failure
            if response_sms["messages"][0]["status"] == "0":
                # Send OTP via email (optional, if you still want to do this)
                send_mail(
                    "OTP Verify Account",
                    f"Use OTP to verify your account: {otp}",
                    "email",
                    [phone],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is </p><p>{otp}</p>'
                )

                # Fetch additional member data
                url = f'https://api.sandbox.kwara.com/members/{user.sacco_user_id}'
                headers = {
                    'Authorization': f'Bearer {access_token}',
                    'accept': 'application/json',
                }
                try:
                    response = requests.get(url, headers=headers)
                    response.raise_for_status()
                    member_data = response.json().get('data', {}).get('attributes', {})
                except requests.RequestException as e:
                    return JsonResponse({'error': str(e)}, status=500)
                
                return JsonResponse({
                    'message': 'Login successful',
                    'sacco_user_id': user.sacco_user_id,
                    'home':user.physical_address,
                    'work':user.profession,
                    'access': str(refresh.access_token),
                    'phone': str(phone),
                    'member_data': member_data
                }, status=200)
            else:
                # Handle SMS sending failure
                return JsonResponse({'error': f"Failed to send OTP via SMS: {response_sms['messages'][0]['error-text']}"}, status=500)

            # Fetch and store access token
            # access_token = get_access_token()
            # print(f"Generated Access Token: {access_token}")  # Debug print

            # if access_token:
            #     request.session['access_token'] = access_token
            #     request.session.modified = True
            #     request.session.save()  # Explicitly save the session

           
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def login_verify_otp(request, sacco_user_id):
    if request.method == 'POST':
        
        entered_otp = request.POST.get('otp_digit')

        # Retrieve the OTP from cache (or database)
        cached_otp = cache.get(f"otp_{sacco_user_id}")

        if cached_otp and str(cached_otp) == entered_otp:
            user = CustomUser.objects.get(sacco_user_id=sacco_user_id)
            login(request, user)  # Log in the user

            refresh = RefreshToken.for_user(user)
            # Fetch savings details
            access_token = get_access_token()

            url = f"https://api.sandbox.kwara.com/members/{sacco_user_id}/savings"
            headers = {
                'Authorization': f'Bearer {access_token}',
                'accept': 'application/json',
            }
            try:
                response = requests.get(url, headers=headers)
                response.raise_for_status()
                savings_data = response.json().get('data', [])

                # Extract details of "FOSA Current" or product id "6006"
                fosa_savings = next(
                    (s for s in savings_data if s.get('attributes', {}).get('product_name') == "FOSA Current" or s.get('attributes', {}).get('product_id') == "6006"), 
                    None
                )

                if fosa_savings:
                    # Extract the ID (account number) and available balance
                    fosa_details = {
                        'account_number': fosa_savings['id'],
                        'available_balance': fosa_savings['attributes'].get('available_balance'),
                    }

                    return JsonResponse({
                        'message': 'Login successful',
                        'sacco_user_id': user.sacco_user_id,
                        'access': str(refresh.access_token),
                        'fosa_details': fosa_details,
                    }, status=200)
                else:
                    return JsonResponse({
                        'message': 'Login successful, but no FOSA Current savings account found',
                        'sacco_user_id': user.sacco_user_id,
                        'access': str(refresh.access_token),
                    }, status=200)
                
            except requests.exceptions.RequestException as e:
                return JsonResponse({'error': 'Failed to fetch savings details: ' + str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Invalid or expired OTP'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Debug print to check session before flushing
        print(f"Session before logout: {request.session.items()}")

        # Clear session data including the access token
        request.session.flush()

        # Debug print to confirm session has been flushed
        print("Session after logout:", request.session.items())

        return Response({"message": "Logout successful"}, status=204)

@csrf_exempt
def registers(request):
    # import requests
    # data = json.loads(request.body)
    # data = request.POST.dict()
    files = request.FILES
    files_dict = {
        'profile_photo': files.get('picture')
    }

    url = "https://api.sandbox.kwara.com/members"
    access_token = get_access_token()
    data = { "data": { "attributes": {
                    "title": "Mr.",
                    "first_name": "Collins",
                    "middle_name": "Kiplagat",
                    "last_name": "Rono",
                    "date_of_birth": "August 2000",
                    "email": "ronocollins20003@gmail.com",
                    "notes": "developer",
                    "phone_number": "0792009586",
                    "secondary_phone_number": "0112568131",
                    "postal_address": "00200",
                    "physical_address": "Juja Road",
                    "marital_status": "Single",
                    "marital_status_other": "Single",
                    "gender": "Male",
                    "gender_other": "Male",
                    "kin": ["Brian Rono"],
                    "profession": "Developer",
                    "employment_status": "employed",
                    "terms_of_service": "Contract",
                    "currently_working": True,
                    "joining_fee": "0",
                    "employer": "Packlines",
                    "employer_phone_number": "0112568131",
                    "business": "Developer",
                    "staff_id": "A003",
                    "kra_pin": "A013546705T",
                    "subscribed_to_mbanking": "YES",
                    "mobile_loan_disallowed": "NO",
                    # "profile_photo": files.get("picture")
                } } }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.post(url, json=data, files=files_dict, headers=headers)

    return JsonResponse(response.json())

@csrf_exempt
def create_member(request):

    # access_token = get_access_token()
    # request.session['access_token'] = access_token  # Store access token in session

    url = 'https://api.sandbox.kwara.com/members'
    headers = {
        'accept': 'application/json',
        'content-type': 'application/json',
        'Authorization': f'Bearer {access_token}',  # Replace '..' with your actual token
    }

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    date_of_birth = data.get("dateOfBirth")
    id_number = data.get("idNumber")
    phone_number = data.get("phone")
    name = data.get("name")
    otp_digit = data.get("otp_digit")

    # Additional fields
    title = data.get("title")
    secondary_phone_number = data.get("secondary_phone_number")
    notes = data.get("notes")
    postal_address = data.get("postal_address")
    physical_address = data.get("physical_address")
    marital_status = data.get("marital_status")
    marital_status_other = data.get("marital_status_other")
    gender = data.get("gender")
    gender_other = data.get("gender_other")
    kin = data.get("kin", [])
    historical_member_id = data.get("historical_member_id")
    profession = data.get("profession")
    employment_status = data.get("employment_status")
    terms_of_service = data.get("terms_of_service")
    currently_working = data.get("currently_working")
    joining_fee = data.get("joining_fee")
    joining_fee_reference = data.get("joining_fee_reference")
    employer = data.get("employer")
    employer_phone_number = data.get("employer_phone_number")
    business = data.get("business")
    staff_id = data.get("staff_id")
    kra_pin = data.get("kra_pin")
    subscribed_to_mbanking = data.get("subscribed_to_mbanking")
    mobile_loan_disallowed = data.get("mobile_loan_disallowed")

    # Convert string values to boolean
    currently_workin = currently_working.lower() == 'true'
    print(f"Original currently_working: {currently_working}")
    print(f"Converted currently_working_bool: {currently_workin}")

    name_parts = name.split(' ')
    first_name = name_parts[0]
    middle_name = ' '.join(name_parts[1:-1]) if len(name_parts) > 2 else ''
    last_name = name_parts[-1]

    member_data = {
        "data": {
            "attributes": {
                "title": title,
                "first_name": first_name,
                "middle_name": middle_name,
                "last_name": last_name,
                "date_of_birth": date_of_birth,
                "email": email,
                "notes": notes,
                "phone_number": phone_number,
                "secondary_phone_number": secondary_phone_number,
                "postal_address": postal_address,
                "physical_address": physical_address,
                "marital_status": marital_status,
                "marital_status_other": marital_status_other,
                "gender": gender,
                "gender_other": gender_other,
                "kin": kin,
                "historical_member_id": historical_member_id,
                "profession": profession,
                "employment_status": employment_status,
                "terms_of_service": terms_of_service,
                "currently_working": currently_workin,
                "joining_fee": joining_fee,
                "joining_fee_reference": joining_fee_reference,
                "employer": employer,
                "employer_phone_number": employer_phone_number,
                "business": business,
                "staff_id": staff_id,
                "kra_pin": kra_pin,
                "subscribed_to_mbanking": subscribed_to_mbanking,
                "mobile_loan_disallowed": mobile_loan_disallowed
            }
        }
    }

    response = requests.post(url, json=member_data, headers=headers)

    if response.status_code == 201:
        sacco_user_id = response.json()['data']['id']
        
        # Send OTP via SMS
        try:
            vonage_number = phone_number.lstrip("0")
            client = vonage.Client(key="d96eb0db", secret="njwhPJXia8QAan34")
            sms = vonage.Sms(client)
            response_sms = sms.send_message({
                "from": "The Kenya Bankers",
                "to": f"254{vonage_number}",
                "text": f"Your OTP for account verification is: {otp_digit}",
            })
            print("Vonage API Response:", response_sms)

            # Handle success or failure
            if response_sms["messages"][0]["status"] == "0":
                # Send OTP via email (optional, if you still want to do this)
                send_mail(
                    "OTP Verify Account",
                    f"Use OTP to verify your account: {otp_digit}",
                    "email",
                    [email],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is </p><p>{otp_digit}</p>'
                )

                # Create user instance
                user = CustomUser.objects.create_user(
                    email=email,
                    password=password,
                    id_number=id_number,
                    sacco_user_id=sacco_user_id,
                    date_of_birth=date_of_birth,
                    phone=phone_number,
                    name=name,
                    notes=notes,
                    secondary_phone_number=secondary_phone_number,
                    postal_address=postal_address, 
                    physical_address=physical_address,
                    marital_status=marital_status,
                    gender=gender,
                    historical_member_id=historical_member_id,
                    profession=profession,
                    employment_status=employment_status,
                    terms_of_service=terms_of_service,
                    currently_working=currently_working,
                    joining_fee=joining_fee,
                    joining_fee_reference=joining_fee_reference,
                    employer=employer,
                    employer_phone_number=employer_phone_number,
                    business=business,
                    staff_id=staff_id,
                    kra_pin=kra_pin,
                    subscribed_to_mbanking=subscribed_to_mbanking,
                    mobile_loan_disallowed=mobile_loan_disallowed,
                    otp_digit=otp_digit
                )
                refresh = RefreshToken.for_user(user)

                return JsonResponse({'data': response.json(), 'sacco_user_id': sacco_user_id, 'phone':phone_number, 'access': str(refresh.access_token), 'home':physical_address, 'work':profession}, status=response.status_code)
            else:
                # Handle SMS sending failure
                return JsonResponse({'error': f"Failed to send OTP via SMS: {response_sms['messages'][0]['error-text']}"}, status=500)
        
        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=500)
        
    else:
        return JsonResponse({'error': 'Failed to create member'}, status=response.status_code)

@csrf_exempt
def verify_member_via_otp(request, sacco_user_id):
    if request.method == 'POST':
        otp_digit = request.POST.get('otp_digit')
        user = CustomUser.objects.filter(sacco_user_id=sacco_user_id, otp_digit=otp_digit).first()
        if user:
            user.verify_status = True
            user.save()

            # Fetch member data
            access_token = get_access_token()
            url = f'https://api.sandbox.kwara.com/members/{sacco_user_id}'
            headers = {
                'Authorization': f'Bearer {access_token}',
                'accept': 'application/json',
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            member_data = response.json().get('data', {}).get('attributes', {})

            return JsonResponse({
                'bool': True,
                'sacco_user_id': sacco_user_id,
                'member_data': member_data
            })
        else:
            return JsonResponse({'bool': False}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def save_referral(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        sacco_user_id = data.get('sacco_user_id')
        referral = data.get('referral')

        try:
            user = CustomUser.objects.get(sacco_user_id=sacco_user_id)
            user.referral = referral
            user.save()
            return JsonResponse({'message': 'Referral saved successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)



@api_view(['POST'])
@csrf_exempt
def change_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        sacco_user_id = data.get('sacco_user_id')
        
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        try:
            user = CustomUser.objects.get(sacco_user_id=sacco_user_id)
            if not check_password(old_password, user.password):
                return JsonResponse({'error': 'Old password is incorrect'}, status=400)            
            user.set_password(new_password)
            user.save()
            return JsonResponse({'success': 'Password changed successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    

@csrf_exempt
def show_member(request, member_id):
    # access_token = get_access_token()
    if request.method == 'GET':
        url = f'https://api.sandbox.kwara.com/members/{member_id}'
        headers = {
            'Authorization' : f'Bearer {access_token}',
            'accept': 'application/json',
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def show_members(request):
    # access_token = get_access_token()
    if request.method == 'GET':
        url = 'https://api.sandbox.kwara.com/members'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'accept': 'application/json',
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def show_saving_product(request, savings_id):
    # access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/savings_products/{savings_id}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        "accept": "application/json",
        'content-type': 'application/json',
    }
    response = requests.get(url, headers=headers)
    return JsonResponse(response.json())


@csrf_exempt
def show_savings(request, savings_id):
    # access_token = get_access_token()

    if request.method == 'GET':

        url = f"https://api.sandbox.kwara.com/savings/{savings_id}?include=transactions"

        headers = {
            "accept": "application/json",
            'Authorization' : f'Bearer {access_token}',
        }
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def show_saving_transactions(request, savings_id):

    # access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/savings/{savings_id}/transactions"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        return JsonResponse(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def show_member_savings(request, member_id):

    if request.method == 'GET':
        try:
            url = f"https://api.sandbox.kwara.com/members/{member_id}/savings"
            headers = {
                "accept": "application/json",
                "Authorization": f"Bearer {access_token}"
            }

            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def show_member_loans(request, member_id):
    # access_token = get_access_token()

    try:
        url = f"https://api.sandbox.kwara.com/members/{member_id}/loans"
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        return JsonResponse(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
@csrf_exempt
def create_savings_application(request, member_id):
    serializer = SavingsApplicationSerializer(data=request.data)
    # access_token = get_access_token()
    
    if serializer.is_valid():

        # Get the account holder based on the member_id
        account_holder = get_object_or_404(CustomUser, sacco_user_id=member_id)
        
        # Check if the savings account already exists for the member with the same product_id
        if SavingsApplication.objects.filter(account_holder_id=account_holder, product_id=request.data['product_id']).exists():
            return Response({'error': 'Savings account already exists for this product.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the savings application data
        savings_application = serializer.save(account_holder_id=account_holder)
        
        # savings_application = serializer.save()

        # Send the savings application to the external API
        url = f"https://api.sandbox.kwara.com/members/{member_id}/savings"
        payload = {
            "data": {
                "attributes": {
                    "account_holder_id": request.data['account_holder_id'],
                    "product_id": request.data['product_id'],
                    "name": request.data['name'],
                    "monthly_remittance_amount": request.data['monthly_remittance_amount']
                }
            }
        }
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return Response(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=response.status_code)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@csrf_exempt
def show_savings_details(request, member_id, savings_id):
    # access_token = get_access_token()  

    url = f"https://api.sandbox.kwara.com/members/{member_id}/savings/{savings_id}?include=product"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=response.status_code)

    
@api_view(['POST'])
@csrf_exempt
def create_loan_application(request, member_id):
    serializer = LoanApplicationSerializer(data=request.data)
    # access_token = get_access_token()
    
    if serializer.is_valid():

        # Get the account holder based on the member_id
        account_holder = get_object_or_404(CustomUser, sacco_user_id=member_id)

        # Check if the savings account already exists for the member with the same product_id
        if LoanApplication.objects.filter(account_holder_id=account_holder, product_id=request.data['product_id']).exists():
            return Response({'error': 'Loan account already exists for this product.'}, status=status.HTTP_400_BAD_REQUEST)

    #   # Save the loan application data
        loan_application = serializer.save(account_holder_id=account_holder)

        # Send the loan application to the external API
        url = f"https://api.sandbox.kwara.com/members/{member_id}/loans"
        payload = {
            "data": {
                "attributes": {
                    "account_holder_id": request.data['account_holder_id'],
                    "product_id": request.data['product_id'],
                    "amount": request.data['amount'],
                    "repayment_installments": request.data['repayment_installments'],
                    "repayment_period": request.data['repayment_period'],
                    "repayment_period_unit": request.data['repayment_period_unit'],
                    "anticipated_disbursement_date": request.data['anticipated_disbursement_date'],
                    "first_repayment_date": request.data['first_repayment_date'],
                    "disbursement_mode": request.data['disbursement_mode'],
                    "disbursement_bank_details": {
                        "bank":request.data['bank'],
                        "bank_branch":request.data['bank_branch'],
                        "account_number":request.data['account_number']

                    },
                }
            }
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            return Response(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return Response({'error': str(e)}, status=response.status_code)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@csrf_exempt
def show_loan_details(request, member_id, loan_id):

    url = f"https://api.sandbox.kwara.com/members/{member_id}/loans/{loan_id}?include=product"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=response.status_code)
    
@csrf_exempt
def show_loan_transactions(request, loan_id):

    url = f"https://api.sandbox.kwara.com/loans/{loan_id}/transactions"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        return JsonResponse(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
def list_loan_products(request):

    if request.method == 'GET':

        url = "https://api.sandbox.kwara.com/loan_products"

        headers = {
            "accept": "application/json",
            'Authorization' : f'Bearer {access_token}',
        }
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def loan_product(request, loan_id):

    if request.method == 'GET':

        url = f"https://api.sandbox.kwara.com/loan_products/{loan_id}"

        headers = {
            "accept": "application/json",
            'Authorization' : f'Bearer {access_token}',
        }
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
            return JsonResponse(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def loan_eligibility_by_products(request, member_id):
    access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/members/{member_id}/loan_eligibility?include=product"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)

    return JsonResponse(response.json())


@csrf_exempt
def show_member_savings_and_loans(request, member_id):
    if request.method == 'GET':
        try:
            savings_url = f"https://api.sandbox.kwara.com/members/{member_id}/savings"
            loans_url = f"https://api.sandbox.kwara.com/members/{member_id}/loans"
            headers = {
                "accept": "application/json",
                "Authorization": f"Bearer {access_token}"
            }

            # Fetch savings data
            savings_response = requests.get(savings_url, headers=headers)
            savings_response.raise_for_status()
            savings_data = savings_response.json().get("data", [])

            # Fetch loans data
            loans_response = requests.get(loans_url, headers=headers)
            loans_response.raise_for_status()
            loans_data = loans_response.json().get("data", [])

            # Extract the savings and loan IDs with the most recent updated_at
            most_recent_savings = max(savings_data, key=lambda x: x["attributes"]["updated_at"], default=None)
            most_recent_loan = max(loans_data, key=lambda x: x["attributes"]["updated_at"], default=None)

            # Extract only the savings_id and loan_id of the most recent entries
            recent_savings_id = most_recent_savings["id"] if most_recent_savings else None
            recent_loan_id = most_recent_loan["id"] if most_recent_loan else None

            # Return the combined response
            return JsonResponse({
                "savings_id": recent_savings_id,
                "loan_id": recent_loan_id,
                "savings_data": savings_data,
                "loans_data": loans_data
            }, status=200)
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def change_member_state(request, member_id):
    
    access_token = get_access_token()
    
    url = "https://api.sandbox.kwara.com/members/4688NLMT/state"

    payload = { "data": { "attributes": { "event": "approve" } } }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.put(url, json=payload, headers=headers)

    print(response.text)

@csrf_exempt
def transaction_channel(request):

    access_token = get_access_token()

    url = "https://api.sandbox.kwara.com/transaction_channels"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(url, headers=headers)

    return JsonResponse(response.json())

@csrf_exempt
def lipa_na_mpesa(request):
    try:

        # data = json.loads(request.body)
        # business_shortCode = 888880
        # phone = data.get('phone')
        # amount = data.get('amount')
        # description = data.get('description')
        # code = data.get('code')
        # acct_number = data.get('acct_number')

        business_shortCode = "888880"
        phone = "254724265242"
        amount = "100"
        description = "Customer PayBill Online"
        code = business_shortCode
        acct_number = "37231995236"

        
        formatted_time = get_timestamp()
        decoded_password = generate_password()
        access_token = generate_access_token()

        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        mpesa_request = {
            "BusinessShortCode": "174379",
            "Password": decoded_password,
            "Timestamp": formatted_time,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": "174379",
            "PhoneNumber": phone,
            "CallBackURL": "https://mydomain.com/path",
            "AccountReference": acct_number,
            "TransactionDesc": description,
        }

        
        response = requests.request("POST", api_url, headers=headers, json=mpesa_request)
        response_data = response.json()
        if response.status_code == 200:
            return JsonResponse(response_data, status=200)
        else:
            return JsonResponse(response_data, status=response.status_code)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)

    
@csrf_exempt
def extract_members(request):
    access_token = get_access_token()
    if request.method == 'GET':
        url = 'https://api.sandbox.kwara.com/members'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'accept': 'application/json',
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
        except requests.RequestException as e:
            print(f"RequestException: {e}")
            return JsonResponse({'error': str(e)}, status=500)

        try:
            members_data = response.json().get('data', [])
            for member in members_data:
                attributes = member.get('attributes', {})
                first_name = attributes.get('first_name', '')
                middle_name = attributes.get('middle_name', '')
                last_name = attributes.get('last_name', '')

                # Combine names into one field
                name = f"{first_name} {middle_name} {last_name}".strip()
                date_of_birth = attributes.get('date_of_birth', '')
                phone = attributes.get('phone_number', '')
                email = attributes.get('email', '')
                sacco_user_id = member['id']

                if not phone:
                    print(f"Skipping member with sacco_user_id={sacco_user_id} due to missing phone number.")
                    continue
                
                if not email:
                    print(f"Skipping member with sacco_user_id={sacco_user_id} due to missing email.")
                    continue
                
                if not date_of_birth:
                    print(f"Skipping member with sacco_user_id={sacco_user_id} due to missing date_of_birth.")
                    continue
                
                if not name:
                    print(f"Skipping member with sacco_user_id={sacco_user_id} due to missing date_of_birth.")
                    continue

                default_password = "12345"

                # Check if the user with the given phone already exists
                try:
                    user = CustomUser.objects.get(phone=phone)
                    user.name = name
                    user.date_of_birth = date_of_birth
                    user.email = email
                    user.sacco_user_id = sacco_user_id
                    user.set_password(default_password)
                    user.save()
                except CustomUser.DoesNotExist:
                    CustomUser.objects.create(
                        name=name,
                        date_of_birth=date_of_birth,
                        phone=phone,
                        email=email,
                        sacco_user_id=sacco_user_id
                    )
                    user.set_password(default_password)
                    user.save()
            return JsonResponse(response.json(), status=response.status_code)
        except Exception as e:
            print(f"Exception: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
@csrf_exempt
def extract_single_member(request):
    sacco_user_id = '7125HQOE'  # Set the specific sacco_user_id here
    access_token = get_access_token()

    if request.method == 'GET':
        url = f'https://api.sandbox.kwara.com/members/{sacco_user_id}'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'accept': 'application/json',
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Raise an error for bad status codes
        except requests.RequestException as e:
            print(f"RequestException: {e}")
            return JsonResponse({'error': str(e)}, status=500)

        try:
            member = response.json().get('data', {}).get('attributes', {})
            if not member:
                return JsonResponse({'error': 'Member not found'}, status=404)

            # Process member data
            first_name = member.get('first_name', '')
            middle_name = member.get('middle_name', '')
            last_name = member.get('last_name', '')
            name = f"{first_name} {middle_name} {last_name}".strip()
            date_of_birth = member.get('date_of_birth', '')
            phone = member.get('phone_number', '')
            email = member.get('email', '')

            default_password = "12345"

            # Check if the user with the given phone already exists
            try:
                user = CustomUser.objects.get(phone=phone)
                user.name = name
                user.date_of_birth = date_of_birth
                user.email = email
                user.sacco_user_id = sacco_user_id
                user.set_password(default_password)
                user.save()
            except CustomUser.DoesNotExist:
                user = CustomUser.objects.create(
                    name=name,
                    date_of_birth=date_of_birth,
                    phone=phone,
                    email=email,
                    sacco_user_id=sacco_user_id
                )
                user.set_password(default_password)
                user.save()

            return JsonResponse(member, status=response.status_code)
        except Exception as e:
            print(f"Exception: {e}")
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




# @api_view(['POST'])
@csrf_exempt
def loan_creation(request, member_id):

    access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/members/{member_id}/loans"
    # payload = {
    #     "data": {
    #         "attributes": {
    #             "account_holder_id": request.data['account_holder_id'],
    #             "product_id": request.data['product_id'],
    #             "amount": request.data['amount'],
    #             "repayment_installments": request.data['repayment_installments'],
    #             "repayment_period": request.data['repayment_period'],
    #             "repayment_period_unit": request.data['repayment_period_unit'],
    #             "anticipated_disbursement_date": request.data['anticipated_disbursement_date'],
    #             "first_repayment_date": request.data['first_repayment_date'],
    #             "disbursement_mode": request.data['disbursement_mode'],
    #             "disbursement_bank_details": request.data['disbursement_bank_details']
    #         }
    #     }
    # }
    payload = { "data": { "attributes": {
        "account_holder_id": "40304",
        "product_id": "3025",
        "amount": 100,
        "repayment_installments": 12,
        "repayment_period": 1,
        "anticipated_disbursement_date": "2025-12-30",
        "first_repayment_date": "2024-08-30",
        "repayment_period_unit": "MONTHS",
        "disbursement_mode": "fosa",
        "disbursement_bank_details": {
            "bank": "DTB",
            "bank_branch": "Kayole",
            "account_number": "1234567"
        },
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.post(url, json=payload, headers=headers)
    return JsonResponse(response.json(), status=response.status_code)


@csrf_exempt
def savings_creation(request, member_id):

    access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/members/{member_id}/savings"
    payload = { "data": { "attributes": {
        "account_holder_id": "40304",
        "product_id": "1001",
        "name": 'Main Savings 1',
        "monthly_remittance_amount": 1000
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }
    response = requests.post(url, json=payload, headers=headers)
    return JsonResponse(response.json(), status=response.status_code)


@csrf_exempt
def savings_authorization(request, savings_id):
    access_token = get_access_token()

    url = f"https://api.sandbox.kwara.com/savings/{savings_id}/authorization_holds"
    generate_identifier = str(uuid.uuid4())
    dateTime = datetime.now().isoformat()

    payload = {
        "data": {
            "attributes": {
                "amount": 10000,
                "external_reference_id": generate_identifier,
                "user_transaction_time": dateTime,
                "phone_number": "+254721615262"
            },
            "type": "authorization_holds"
        }
    }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)
    return JsonResponse(response.json(), status=response.status_code)


@csrf_exempt
def savings_deposit(request):
    access_token = get_access_token()
    data = json.loads(request.body)

    savings_id = data.get('savings_id')
    amount = data.get('amount')
    phone = data.get('phone_number')
    notes = data.get('notes')

    url = "https://api.sandbox.kwara.com/savings_transactions"

    payload = { "data": { "attributes": {
        "type": "DEPOSIT",
        "savings_id": savings_id,
        "amount": amount,
        "phone_number": phone,
        # "to_savings_account": "20040304211",
        # "to_loan_account": "SC501NNC",
        "notes": notes,
        "manual_journal_entry": True,
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)
    return JsonResponse(response.json(), status=response.status_code)

@csrf_exempt
def savings_withdrawal(request):

    access_token = get_access_token()

    url = "https://api.sandbox.kwara.com/savings_transactions"

    payload = { "data": { "attributes": {
        "type": "WITHDRAWAL",
        "savings_id": "19567311",
        "amount": 100,
        "phone_number": "0792908623",
        # "to_savings_account": "19567311",
        "to_savings_account": "20040304211",
        # "to_loan_account": "SC501NNC",
        "authorization_hold_id": "9fbadd7e-3a9f-4215-85c6-eff64a1c47a5",
        "bank_branch": "Kayole",
        "notes": "Trial",
        "payment_method": "cash",
        # "reference": "SXB387DBU",
        "manual_journal_entry": True,
        "idempotency_key": "9fbadd7e-3a9f-4215-85c6-eff64a1c47a5",
        # "predefined_fee_name": ""
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)
    print("Payload: ", json.dumps(payload, indent=4))
    print("Response Status Code: ", response.status_code)
    print("Response Text: ", response.text)
    
    return JsonResponse(response.json(), status=response.status_code)

@csrf_exempt
def savings_transfer(request):

    # access_token = get_access_token()
    data = json.loads(request.body)
    savings_id = data.get('savings_id')
    amount = data.get('amount')
    phone_number = data.get('phone_number')
    to_savings_account = data.get('acc_number')
    notes = data.get('notes')

    url = "https://api.sandbox.kwara.com/savings_transactions"

    payload = { "data": { "attributes": {
        "type": "TRANSFER",
        "savings_id": savings_id,
        "amount": amount,
        "phone_number": phone_number,
        "to_savings_account": to_savings_account,
        # "to_loan_account": "SC501NNC",
        "notes": notes,
        "manual_journal_entry": True,
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)
    print("Payload: ", json.dumps(payload, indent=4))
    print("Response Status Code: ", response.status_code)
    print("Response Text: ", response.text)
    
    return JsonResponse(response.json(), status=response.status_code)


@csrf_exempt
def loan_repayment(request):
    access_token = get_access_token()
    data = json.loads(request.body)

    loan_id = data.get('loan_id')
    amount = data.get('amount')
    # phone_number = data.get('phone_number')
    # bank_branch = data.get('bank_branch')
    notes = data.get('notes')
    # payment_method = data.get('payment_method')
    # reference = data.get('reference')

    url = "https://api.sandbox.kwara.com/loan_transactions"

    payload = { "data": { "attributes": {
        "type": "REPAYMENT",
        "loan_id": loan_id,
        "amount": amount,
        # "phone_number": phone_number,
        # "bank_branch": bank_branch,
        "notes": notes,
        # "payment_method": payment_method,
        # "reference": reference,
        "manual_journal_entry": True
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)

    print(response.text)    
    return JsonResponse(response.json(), status=response.status_code)

@csrf_exempt
def token_na_mpesa(request):
    try:
        
        access_token = generate_access_token()

        api_url = 'https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest'

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        business_shortCode = 174379
        # formatted_time = get_timestamp()
        # decoded_password = generate_password()
        # access_token = generate_access_token()
    
        payload = {
            "Initiator": 'Packline_Systems',
            "SecurityCredential": "ToVfosfH3sb2b/yiK1H555Lzf9t4m8BImJ/cSGomKgffoo6558+ah1pxhpkI1DzG+TH6jBfn49JpEU8Hrra86hJSSxm1B41ABY3MuZOht6/ro55drvRYqT4PTRBsGiOlHU8DlwCNQl7+GSB38rILuBEA3QziK4WdVX+nVkqcPLhyvYPCHGnzYlFJHoFWD4+DQ/67EIzi2H+SQRmg+6o/+w0YDXWkqS7N/qJO9NNEbUaJlSRBE6ddQJSOe2hvX/j/ZcawKFXwCyI1kgPwxgOvilwfaSzhx8kyrLWTffoBo/50QuPhs0XYSnmwrGl2dMAaGnFDtv8MJUsjUgG/k05MeQ==",
            "CommandID": "BusinessPayBill",
            "SenderIdentifierType": "4",
            "RecieverIdentifierType": "4",
            "Amount": "100",
            "PartyA": "4137281",
            "PartyB": "888880",
            "AccountReference": "37231995236",
            "Requester": "254745171342",
            "Remarks": "ok",
            "QueueTimeOutURL": "https://alutamax.com/ResultsListener.php", 
            "ResultURL": "https://alutamax.com/TimeOutListener.php" 
        }

        response = requests.post(api_url, json=payload, headers=headers)
        response_data = response.json()
        print(response_data)
        return JsonResponse(response_data, status=response.status_code)
    
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=500)
    

        # api_url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest"

        # mpesa_request = { 
        #     "Initiator":"Packline_Systems",
        #     "SecurityCredential": decoded_password,
        #     "Command ID": "BusinessPayBill",
        #     "SenderIdentifierType": "4",
        #     "RecieverIdentifierType":"4",
        #     "Amount":"100",
        #     "PartyA": business_shortCode,
        #     "PartyB":"888880",
        #     "AccountReference":"37231995236",
        #     "Requester":"254724265242",
        #     "Remarks":"OK",
        #     "QueueTimeOutURL":"http://127.0.0.1:8000/api/callback",
        #     "ResultURL":"http://127.0.0.1:8000/api/callback",
        # }

        # try:
        #     response = requests.post(api_url, json=mpesa_request, headers=headers)
        #     response_data = response.json()
        #     if response.status_code == 200:
        #         return JsonResponse(response_data, status=200)
        #     else:
        #         return JsonResponse(response_data, status=response.status_code)
        # except requests.exceptions.RequestException as e:
        #     return JsonResponse({'error': str(e)}, status=500)
    # else:
    #     return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def mpesa(request):

    try:
        business_shortCode = 174379
        formatted_time = get_timestamp()
        decoded_password = generate_password()
        access_token = generate_access_token()

        api_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        payload = {
            'BusinessShortCode': str(business_shortCode),
            'Password': decoded_password,
            'Timestamp': formatted_time,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': str(100),
            'PartyA': str(254724265242),  # Ensure it's a string
            'PartyB': "888880",  # Ensure it's a string and correct paybill number
            'PhoneNumber': str(254724265242),  # Ensure it's a string
            'CallBackURL': "https://mydomain.com/b2b/queue/",
            'AccountReference': "37231995236",
            'TransactionDesc': "transaction_desc"
        }

        response = requests.post(api_url, json=payload, headers=headers)
        response_data = response.json()
        print(response_data)
        return JsonResponse(response_data, status=response.status_code)
    
    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def test_loan_repayment(request):
    access_token = get_access_token()
    # data = json.loads(request.body)

    # loan_id = data.get('loan_id')
    # amount = data.get('amount')
    # phone_number = data.get('phone_number')
    # bank_branch = data.get('bank_branch')
    # notes = data.get('notes')
    # payment_method = data.get('payment_method')
    # reference = data.get('reference')

    url = "https://api.sandbox.kwara.com/loan_transactions"

    payload = { "data": { "attributes": {
        "type": "REPAYMENT",
        "loan_id": "DE082579",
        "amount": 3000,
        # "phone_number": phone_number,
        # "bank_branch": bank_branch,
        # "notes": notes,
        # "payment_method": payment_method,
        # "reference": reference,
        "manual_journal_entry": True
    } } }
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.post(url, json=payload, headers=headers)

    print(response.text)    
    return JsonResponse(response.json(), status=response.status_code)

@csrf_exempt
def checkout_paypal(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        amount = data.get('amount')

        if not amount:
            return HttpResponseBadRequest("Amount is required")

        host = request.get_host()
        paypal_checkout = {
            'business': settings.PAYPAL_RECEIVER_EMAIL,
            'amount': amount,
            'item_name': "Deposit",
            'invoice': str(uuid.uuid4()),
            'currency': 'KES',
            'notify_url': f"http://{host}{reverse('paypal-ipn')}",
            'return_url': f"http://{host}{reverse('paypal-payment-success')}",
            'cancel_url': f"http://{host}{reverse('paypal-payment-fail')}",
            'cmd': '_xclick',
        }

        base_url = "https://www.sandbox.paypal.com/cgi-bin/webscr" if settings.PAYPAL_TEST else "https://www.paypal.com/cgi-bin/webscr"
        query_string = urlencode(paypal_checkout)
        paypal_url = f"{base_url}?{query_string}"

        return JsonResponse({'paypal_url': paypal_url})

    return HttpResponseBadRequest("Invalid request method")
# import paypalrestsdk
# import json
# import uuid
# from django.conf import settings
# from django.http import JsonResponse, HttpResponseBadRequest
# from django.views.decorators.csrf import csrf_exempt



@csrf_exempt
def checkout_paypal_restsdk(request):
    # if request.method == 'POST':
    #     data = json.loads(request.body)
    #     amount = data.get('amount')

        # if not amount:
        #     return HttpResponseBadRequest("Amount is required")

        # Configure PayPal SDK
        paypalrestsdk.configure({
            "mode": settings.PAYPAL_MODE,  # 'sandbox' or 'live'
            "client_id": settings.PAYPAL_CLIENT_ID,
            "client_secret": settings.PAYPAL_SECRET
        })

        # Create payment
        payment = paypalrestsdk.Payment({
            "intent": "sale",  # or 'authorize' for authorization
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                    "total": 43,
                    "currency": "USD"
                },
                "description": "Deposit"
            }],
            "redirect_urls": {
                "return_url": f"http://{request.get_host()}{reverse('paypal-payment-success')}",
                "cancel_url": f"http://{request.get_host()}{reverse('paypal-payment-fail')}"
            }
        })

        if payment.create():
            # Redirect the user to PayPal to approve the payment
            for link in payment['links']:
                if link['rel'] == 'approval_url':
                    approval_url = link['href']
                    return HttpResponseRedirect(approval_url)
            return HttpResponseBadRequest("Approval URL not found.")
        else:
            return JsonResponse({"status": "failure", "error": payment.error})

    # return HttpResponseBadRequest("Invalid request method")

@csrf_exempt
def pay_customer_mpesa(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            amount = data.get('amount')
            phone = data.get('mpesa_number')
            # Check if the phone number starts with '0'
            if phone.startswith('0'):
                # Replace the leading '0' with '254'
                formatted_phone = '254' + phone[1:]
            else:
                # If it doesn't start with '0', keep it unchanged or handle accordingly
                formatted_phone = phone
        # Example parameters - these should come from your request or be defined appropriately
            env = "sandbox"
            app_key = "SE0XXGYedB9EGpSUwmqXZpU8S4GGAxtE5CBAS0CzH2PMGTer"
            app_secret = "FYuKxMJ75xaruVqWXqG5lNiLy508SwEmTNk3A8zZqDjeCtPnYXBwK8MvyPQAvkD9"
            initiator_name = "testapi"
            security_credential = "VjPqX630LrWDuX2U+zQ1ovU8IdTWrsLyjeJWDeaOAYEelrUxTnW9pr6vkYsdlknLpdQqkT3Y0r1LLTA2KCzyAhqfArp46987pvCVISJa4mEpdG/Gae3ffkHyCCHxhxuXLXS0tA15MFydnAzM7ivSotExzfL/eguv0QPsFyeixEQEgSqjY5nkLagBUa5+pWAm0xIrUKfunQF06/Icq19EkpphOXE2GEF8W+vnzKDzTDboIyHoedxOim3MwjOKH/TYvcU0PypNXImQdObf+2sFm4oy0svBOswg8Xfnu7eotVxi2nQxC5whHiSur6GVS2QmG45DxAG3WBYeLgpbhWXrVg=="
            command_id = "BusinessPayment"
            amount = amount
            party_a = "174379"  # Example Shortcode
            party_b = formatted_phone  # Example Phone Number
            remarks = "Payment remarks"
            queue_timeout_url = "https://mydomain.com/b2c/queue"
            result_url = "https://mydomain.com/b2c/result"
            occassion = "optional_ocassion"
            # Create an instance of the B2C class
            b2c = B2C(env=env, app_key=app_key, app_secret=app_secret)
            # Call the transact method with the necessary parameters
            response = b2c.transact(
                initiator_name=initiator_name,
                security_credential=security_credential,
                command_id=command_id,
                amount=amount,
                party_a=party_a,
                party_b=party_b,
                remarks=remarks,
                queue_timeout_url=queue_timeout_url,
                result_url=result_url,
                occassion=occassion
            )
            # Return the response as JSON
            return JsonResponse(response)

    return JsonResponse({"message": "Invalid request method"}, status=400)

@csrf_exempt
def pay_bill(request):
    print("Running")
    # data = json.loads(request.body)
    amount = 10
    phone_number = "254792009556"
    # M-Pesa credentials and environment setup
    env = "sandbox"
    app_key = "SE0XXGYedB9EGpSUwmqXZpU8S4GGAxtE5CBAS0CzH2PMGTer"
    app_secret = "FYuKxMJ75xaruVqWXqG5lNiLy508SwEmTNk3A8zZqDjeCtPnYXBwK8MvyPQAvkD9"
    business_shortcode = "174379"  # Replace with your Business Shortcode
    passcode = "nteSGPPHrFIJDB9PC+P3og1GuQROO1sxGzUwAJEhUArukeMiVjAF6D0Gwwei8gwpisAEk9ZjfJSM6E2J21AVUYizdmxtTxwM3B+d7xTOTSFwYpHedH74O99lgrhQcVv+ajUiTVCI79q0Iewk0B01RGBL19dtkLPZcA3PdgP0TFG2f0n6CdWAf4Ep5f2MUk7QLlu7tJINRK5Uffzn1xpxoo/r4yFslC5HSpLVwMSa0S2RHiahs4z2jzzfO40JzYbe/lZBcujkoDtrkpRdvfyOOcjFgM9fyZz6ad8rYKwHTxIAiq0Gs6yXQ5kiXyWoIAck6n++t2lyAe5xCJTr6LUVaQ=="  # Replace with your passcode
    callback_url = "https://mydomain.com/callback"  # Replace with your callback URL
    reference_code = "your_reference_code"  # Replace with your reference code
    description = "Payment for services"
    # Create an instance of MpesaExpress
    mpesa = MpesaExpress(env=env, app_key=app_key, app_secret=app_secret)
    # Make the payment request using stk_push
    response = mpesa.stk_push(
        business_shortcode=business_shortcode,
        passcode=passcode,
        amount=amount,
        callback_url=callback_url,
        reference_code=reference_code,
        phone_number=phone_number,
        description=description
    )
    # Return the response as JSON
    return JsonResponse(response)

@csrf_exempt
def customer_pay_bill(request):
    if request.method == "POST":
        data = json.loads(request.body)
        amount = data.get('amount')
        phone = data.get('phone')
        account_number = data.get('account_number')
        if phone.startswith('0'):
                # Replace the leading '0' with '254'
                formatted_phone = '254' + phone[1:]
        else:
                # If it doesn't start with '0', keep it unchanged or handle accordingly
                formatted_phone = phone
        cl = MpesaClient()
        print("phone "+formatted_phone)
        phone_number = formatted_phone
        amount = int(amount)
        account_reference = account_number
        transaction_desc = 'paybill'
        callback_url = "https://kbs-internet-banking.com/api/callback"
        response = cl.stk_push(phone_number, amount, account_reference, transaction_desc, callback_url)
        return HttpResponse(response)
    else:
        return JsonResponse({"Error": "Invalid request method"})

def payment_successfull(request):
    return HttpResponse("Payment Successful")

def payment_failed(request):
    return HttpResponse("Payment Failed")

def return_auth_token():
    client_id = settings.STANBIC_CLIENT_ID
    client_secret = settings.STANBIC_CLIENT_SECRET
    token_url = settings.STANBIC_TOKEN_URL
    scope = settings.STANBIC_SCOPE

    payload = {
    'grant_type': 'client_credentials',
    'client_id': client_id,
    'client_secret': client_secret,
    'scope': scope
    }
    response = requests.post(token_url,data=payload)
    access_token = response.json().get("access_token")
    # print(access_token)
    return access_token

@csrf_exempt
def swift_payment(request):
  """
    Handles SWIFT payment processing via Stanbic Bank's API.

    This function processes a POST request to initiate a SWIFT payment by sending a request 
    to the Stanbic Bank sandbox API. It collects payment details from the request, constructs 
    a payload, and makes an API call to the SWIFT endpoint.

    Parameters:
    - request (HttpRequest): The HTTP request object, expected to be a POST request with the 
      following form data:
        - from_account: The originator's bank account number.
        - to_account: The recipient's bank account number.
        - phone: The phone number of the originator.
        - from_bank: The originator's bank code.
        - to_bank: The recipient's bank code.
        - amount: The amount to be transferred.
        - reason: The reason for the transfer.

    Returns:
    - JsonResponse: If the request method is POST, returns the JSON response from the Stanbic 
      Bank API.
    - HttpResponse: If the request method is not POST, renders the "swift_acccount_to_account.html" template.

    API Details:
    - Endpoint: https://api.connect.stanbicbank.co.ke/api/sandbox/swift-payments/
    - Authorization: Bearer token obtained from return_auth_token()
    - Payload:
        - originatorAccount: Contains the account and mobile number of the originator.
        - requestedExecutionDate: Static date set to "2024-08-09".
        - dbsReferenceId: Randomly generated 6-digit reference ID.
        - txnNarrative: Static value "TESEAPS123".
        - callBackUrl: Static callback URL "https://clientdomain.com/client/Callback".
        - schedule: Contains scheduling information such as transfer frequency and date range.
        - transferTransactionInformation: Contains details about the amount, counterparty 
          account, counterparty identity, and remittance information.

    Example Usage:
    - Sending a POST request with the necessary form data to initiate a SWIFT payment.
    """
  
  if request.method == "POST":
    access_token = return_auth_token()
    data = json.loads(request.body)
    amount = data.get('amount')
    url = "https://api.connect.stanbicbank.co.ke/api/sandbox/swift-payments/"
    headers = {
      "Authorization": f"Bearer {access_token}",
      "content-type": "application/json",
      "accept": "application/json"
    }

    from_account = settings.KBS_FROM_ACCOUNT
    phone = settings.KBS_FROM_PHONE
    
    # from_account = request.POST.get("from_account")
    to_account = data.get("to_account")
    # phone = request.POST.get("phone")
    # from_bank = request.POST.get("from_bank")
    from_bank = "SBICKENX"
    to_bank = data.get("to_bank")
    amount = data.get("amount")
    # reason = request.POST.get("reason")
    creditCurrency = data.get("creditCurrency")
    if not all([to_account, to_bank, amount, creditCurrency]):
        return JsonResponse({"error": "Missing required fields"}, status=400)
    payload = {
    "originatorAccount": {
      "identification": {
        "identification": from_account,
        "debitCurrency": "KES",
        "mobileNumber": phone
      }
    },
    "requestedExecutionDate": "2024-08-09",
    "dbsReferenceId": str(random.randrange(100000, 1000000)),
    "txnNarrative": "TESEAPS123",
    "callBackUrl": "https://clientdomain.com/client/Callback",
    "schedule": {
      "transferFrequency": "DAILY",
      "on": "12",
      "startDate": "2021-02-13",
      "endDate": "2022-01-03",
      "repeat": "3",
      "every": "1"
    },
    # 1220179020894 0100013845845
    "transferTransactionInformation": {
      "instructedAmount": {
        "amount": amount,
        "creditCurrency": creditCurrency
      },
      "counterpartyAccount": {
        "identification": {
          "identification": to_account,
          "correspondentBank": from_bank,
          "beneficiaryBank": to_bank
        }
        },
        "counterparty": {
          "name": "TAAM OIL LTD",
          "postalAddress": {
            "addressLine": "UGANDA",
            "postCode": "1100 ZZ",
            "town": "Kampala",
            "country": "UG"
          }
        },
        "remittanceInformation": {
          "type": "deposit",
          "content": "deposit"
        },
        "endToEndIdentification": "5e1a3da132cc"
      }
    }

    response = requests.post(url=url,headers=headers,json=payload)
    # print("response "+response)
    # print(payload)
    return JsonResponse(response.json())
  else:
    return JsonResponse({"Error": "Invalid request method"})
  
def get_date(self):
    current_date = date.today()
    formatted_day = current_date.isoformat()
    # print(formatted_day)
    return formatted_day

@csrf_exempt
def payout_paypal(request):
    if request.method == "POST":
        data = json.loads(request.body)
        amount = data.get('amount')
        receiver_email = data.get('email')
        
    
        paypalrestsdk.configure({
            "mode": settings.PAYPAL_MODE,
            "client_id": settings.PAYPAL_CLIENT_ID,
            "client_secret": settings.PAYPAL_SECRET
        })
        payout = paypalrestsdk.Payout({
            "sender_batch_header": {
                "sender_batch_id": str(uuid.uuid4()),
                "email_subject": "You have a payout!",
            },
            "items": [
                {
                    "recipient_type": "EMAIL",
                    "amount": {
                        "value": amount,  # Amount to send
                        "currency": "USD"
                    },
                    "receiver": receiver_email,  # User's PayPal email
                    "note": "Thank you for using our service!",
                    "sender_item_id": str(uuid.uuid4())
                }
            ]
        })
        if payout.create():
            # withdraw from FOSA here
            return JsonResponse({"status": "success", "payout_batch_id": payout.batch_header.payout_batch_id})
        else:
                return JsonResponse({"status": "failure", "error": payout.error})
            
    else:
        return JsonResponse({"Error": "Invalid request method"})