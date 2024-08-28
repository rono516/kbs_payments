from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [

    # main urls
    path('register/', views.create_member),
    path('create-member/', views.registers),
    path('login/', views.login_view),
    path('login-verify-otp/<str:sacco_user_id>/', views.login_verify_otp, name='login_verify_otp'),
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('verify-member/<str:sacco_user_id>/', views.verify_member_via_otp, name='verify_member_via_otp'),
    path('save-referral/', views.save_referral, name='save_referral'),
    path('change-password/', views.change_password, name='change_password'),

    # member urls
    path('show_members', views.show_members),
    path('show_member/<str:member_id>/', views.show_member),     #test id int -> 40304
    path('show_member_savings_and_loans/<str:member_id>/', views.show_member_savings_and_loans, name='show_member_savings_and_loans'),
    # path('member_savings/<str:member_id>/', views.member_savings, name='member_savings'),
    # path('member_loans/<str:member_id>/', views.member_loans, name='member_loans'),


    

    # savings urls
    path('show_member_savings/<str:member_id>', views.show_member_savings),
    path("savings_product/<str:savings_id>", views.show_saving_product ),
    path("show_savings/<str:savings_id>", views.show_savings),
    path("saving_authorization/<str:savings_id>", views.savings_authorization ),
    path("savings_deposit/", views.savings_deposit),
    path("saving_withdrawal/", views.savings_withdrawal ),
    path("savings_transfer/", views.savings_transfer ),
    path('savings-application/<str:member_id>', views.create_savings_application, name='create_savings_application'),
    path('savings-detail/<str:member_id>/<str:savings_id>', views.show_savings_details, name='show_savings_details'),
    path('show_saving_transactions/<str:savings_id>', views.show_saving_transactions),
    # path("saving_product/", views.show_saving_product),
    
    
    # loan urls
    path('show_member_loans/<str:member_id>', views.show_member_loans),
    path('show_loan_transactions/<str:loan_id>', views.show_loan_transactions),
    path('loan-details/<str:member_id>/<str:loan_id>', views.show_loan_details, name='show_loan_details'),
    path('loan-application/<str:member_id>', views.create_loan_application, name='create_loan_application'),
    path('loan_eligibility_by_products/<str:member_id>', views.loan_eligibility_by_products),
    path("loan_repayment/", views.loan_repayment),

    # Payment Endpoints
    path("checkout_paypal", views.checkout_paypal), #open page to send to paypal checkout
    path("success", views.payment_successfull, name="paypal-payment-success"),
    path("failed", views.payment_failed, name="paypal-payment-fail"),
    path("swift_payment", views.swift_payment),
    path("payout_paypal", views.payout_paypal), # pay to customer
    path("checkout_paypal_restsdk", views.checkout_paypal_restsdk),
    path("pay_customer_mpesa", views.pay_customer_mpesa ),
    path("pay_bill", views.pay_bill),
    path("customer_pay_bill", views.customer_pay_bill),
    # path("withdrawal", views.withdrawal),


    # test urls
    path('list_loan_products/', views.list_loan_products),
    path('loan_products/<int:loan_id>', views.loan_product),
    path('loan_creation/<str:member_id>', views.loan_creation),
    path('savings_creation/<str:member_id>', views.savings_creation),
    path('transaction_channel/', views.transaction_channel),
    path('change_member_state/<int:member_id>', views.change_member_state),
    path('extract_members', views.extract_members),
    path('extract_member', views.extract_single_member),
    path('lipanampesa', views.token_na_mpesa),
    path('mpesa', views.lipa_na_mpesa),
    path("test-loan_repayment/", views.test_loan_repayment),
    # path('get_access_token/', views.get_access_token),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)