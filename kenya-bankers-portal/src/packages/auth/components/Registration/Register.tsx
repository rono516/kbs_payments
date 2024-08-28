import React, { useEffect, useState } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Register: React.FC = () => {
    
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        email: '',
        dateOfBirth: '',
        idNumber: '',
        phone: '',
        password: '',
        confirmPassword: '',
        secondary_phone_number: '',
        notes: '',
        postal_address: '',
        physical_address: '',
        marital_status: '',
        marital_status_other: '',
        gender: '',
        gender_other: '',
        kin: '',
        historical_member_id: '',
        profession: '',
        employment_status: '',
        terms_of_service: '',
        currently_working: '',
        joining_fee: '',
        joining_fee_reference: '',
        employer: '',
        employer_phone_number: '',
        business: '',
        staff_id: '',
        kra_pin: '',
        subscribed_to_mbanking: '',
        mobile_loan_disallowed: ''
        // Add other fields for Step 2, 3, etc.
    });

    const handleNext = (data: any) => {
        setFormData(prevData => ({ ...prevData, ...data }));
        setCurrentStep(prevStep => prevStep + 1);
    };

    const handleBack = (data: any) => {
        setFormData(prevData => ({ ...prevData, ...data }));
        setCurrentStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Generate OTP digit
        const otp_digit = Math.floor(100000 + Math.random() * 900000);

        // Prepare the data
        const data = {
            ...formData,
            otp_digit: otp_digit
        };

        try {
            // Make the POST request
            console.log("About to make post request");
            const response = await axios.post('http://localhost:8000/api/register/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Made the request");
            console.log("register response");
            console.log(response);

            if (response.status === 201) {
                const saccoUserId = response.data.sacco_user_id;
                console.log('Sacco User ID:', saccoUserId); // Logging Sacco User ID to the console
                localStorage.setItem('phone', response.data.phone);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('home', response.data.home);
                localStorage.setItem('work', response.data.work);
                localStorage.setItem('sacco_user_id', saccoUserId);
                
                // Store the formData in local storage
                // Object.keys(formData).forEach(key => {
                //     localStorage.setItem(key, formData[key]);
                // });

                navigate(`/auth/verify-otp/${saccoUserId}`);
            } else {
                setError('Registration failed');
                setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
            }
        } catch (error: any) {
            setError(error.response?.data?.error || 'An error occurred');
            setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
        }
    };

    return (
        <div >
            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2 }}>
                    {error}
                </Typography>
            )}
            {currentStep === 1 && <RegisterStep1 onNext={handleNext} formData={formData} />}
            {currentStep === 2 && <RegisterStep2 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {currentStep === 3 && <RegisterStep3 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {currentStep === 4 && <RegisterStep4 onSubmit={handleSubmit} onBack={handleBack} formData={formData} />}
        </div>
    );
};

export default Register;

