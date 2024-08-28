from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None,phone=None, sacco_user_id=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(phone=phone,email=email, sacco_user_id=sacco_user_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, phone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(phone, password, **extra_fields)

class CustomUser(AbstractBaseUser):
    sacco_user_id = models.CharField(max_length=100, null=False, primary_key=True)
    name=models.CharField(max_length=255,blank=True,null=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255,blank=True,null=False,unique=True)
    id_number = models.CharField(max_length=255,blank=True,null=False)
    date_of_birth = models.CharField(max_length=255,blank=True,null=False)
    notes=models.CharField(max_length=255,blank=True,null=False)
    secondary_phone_number=models.CharField(max_length=255,blank=True,null=False)
    postal_address=models.CharField(max_length=255,blank=True,null=False) 
    physical_address=models.CharField(max_length=255,blank=True,null=False)
    marital_status=models.CharField(max_length=255,blank=True,null=False)
    gender=models.CharField(max_length=255,blank=True,null=False)
    historical_member_id=models.CharField(max_length=255,blank=True,null=False)
    profession=models.CharField(max_length=255,blank=True,null=False)
    employment_status=models.CharField(max_length=255,blank=True,null=False)
    terms_of_service=models.CharField(max_length=255,blank=True,null=False)
    currently_working=models.CharField(max_length=255,blank=True,null=False)
    joining_fee=models.CharField(max_length=255,blank=True,null=False)
    joining_fee_reference=models.CharField(max_length=255,blank=True,null=False)
    employer=models.CharField(max_length=255,blank=True,null=False)
    employer_phone_number=models.CharField(max_length=255,blank=True,null=False)
    business=models.CharField(max_length=255,blank=True,null=False)
    staff_id=models.CharField(max_length=255,blank=True,null=False)
    kra_pin=models.CharField(max_length=255,blank=True,null=False)
    subscribed_to_mbanking=models.CharField(max_length=255,blank=True,null=False)
    mobile_loan_disallowed=models.CharField(max_length=255,blank=True,null=False)
    referral = models.CharField(max_length=100, blank=True, null=True)
    verify_status = models.BooleanField(default=False)
    otp_digit = models.CharField(max_length=10, blank=True, null=True)
    picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    USERNAME_FIELD = 'phone' 

    objects = CustomUserManager()

    def __str__(self):
        return self.email  # Customize as per your requirement
    
class LoanApplication(models.Model):
    account_holder_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='sacco_user_id', null=True)
    product_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    repayment_installments = models.IntegerField()
    repayment_period = models.IntegerField()
    repayment_period_unit = models.CharField(max_length=50)
    anticipated_disbursement_date = models.DateField()
    first_repayment_date = models.DateField()
    disbursement_mode = models.CharField(max_length=50)
    disbursement_mode = models.CharField(max_length=50)
    bank = models.CharField(max_length=255, blank=True, null=True)
    bank_branch = models.CharField(max_length=255, blank=True, null=True)
    account_number = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Loan Application for {self.account_holder_id}"
    
    class Meta:
        unique_together = ('account_holder_id', 'product_id')
    
class SavingsApplication(models.Model):
    account_holder_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='sacco_user_id', null=True)
    product_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    monthly_remittance_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Savings Application for {self.account_holder_id}"
    
    class Meta:
        unique_together = ('account_holder_id', 'product_id')
class WithdrawRequest(models.Model):
    payment_gateway = models.CharField(max_length=255)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE )
    amount = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

class DepositRequest(models.Model):
    payment_gateway = models.CharField(max_length=255)
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    amount = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)