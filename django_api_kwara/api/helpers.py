from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import requests
import base64
from requests.auth import HTTPBasicAuth

# @csrf_exempt
def get_access_token():
    client_id = "378691dd4e1d586aa48e5d34569e21f899052b7808c18029415fbd4f0fa225d0"
    client_secret = "3dc8c392a02d183716f4d3adc211e09cb3033bc96560879505a49f55e7dc6d70"
    url = 'https://api.sandbox.kwara.com/oauth/token'
    payload = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    }
    response = requests.post(url, data=payload)

    if response.status_code == 200:
        access_token = response.json().get('access_token')
        if access_token:
            return access_token
        else:
            raise ValueError("Access token not found in the response")
    else:
        raise ValueError(f"Failed to fetch access token, status code: {response.status_code}")
    
def generate_access_token():

    consumer_key = 'zAKlTtAgnCh9PedrNrsEI5iWR6wFlxJe0RABS2P1Vk3RhWGe'
    consumer_secret = 'lUvBSD4BjiqgdtLJBQGmAX1wANPzryVZnA2XYlotrGXDNcx90wfKDMuojbER52er'
    api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    try:
        r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    except:
        r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret), verify=False)
        
    print(r.text)

    json_response = (
        r.json()
    )  # {'access_token': 'orfE9Dun2qqCpuXsORjcWGzvrAIY', 'expires_in': '3599'}

    my_access_token = json_response["access_token"]

    return my_access_token
    
def get_timestamp():
    unformatted_time = datetime.now()
    formatted_time = unformatted_time.strftime("%Y%m%d%H%M%S")

    return formatted_time

def generate_password():

    business_shortCode = '174379'
    passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
    formatted_time = datetime.now().strftime('%Y%m%d%H%M%S')

    data_to_encode = (
        business_shortCode + passkey + formatted_time
    )

    encoded_string = base64.b64encode(data_to_encode.encode())
    # print(encoded_string) b'MjAxOTAyMjQxOTUwNTc='

    decoded_password = encoded_string.decode("utf-8")

    return decoded_password