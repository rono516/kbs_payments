import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function LoginVerifyOTP() {
    const navigate = useNavigate();
    const { sacco_user_id } = useParams<{ sacco_user_id: string }>();
    const [otpdata, setOtpData] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (value: string) => {
        setOtpData(value);
    };

    const submitForm = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('otp_digit', otpdata);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/login-verify-otp/${sacco_user_id}/`, formData);
            if (response.data.message === "Login successful") {
                // Save FOSA savings details to local storage if available
                if (response.data.fosa_details) {
                    localStorage.setItem('fosa_account_number', response.data.fosa_details.account_number);
                    localStorage.setItem('fosa_available_balance', response.data.fosa_details.available_balance);
                }               
                navigate('/dashboard');
            } else {
                setErrorMsg(response.data.error || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Error during OTP verification', error);
            setErrorMsg('An error occurred during OTP verification.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "User OTP Verify";
    }, []);

    return (
        <Stack
            sx={{
                backgroundColor: "secondary.lighter",
                height: "100vh",
                justifyContent: "center",
            }}
        >
            <Paper
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    width: "500px",
                    backgroundColor: 'secondary.lighter'
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main' }}> OTP Verification</Typography>
                    <Typography variant="body1" sx={{ color: 'warning.main' }}> Please enter the 6 digit code sent.</Typography>
                </Box>
                {errorMsg && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {errorMsg}
                    </Typography>
                )}
                <Stack spacing={2} sx={{ marginTop: '50px' }}>
                    <MuiOtpInput 
                        length={6} 
                        value={otpdata}
                        onChange={handleChange}
                        TextFieldsProps={{
                            sx: {
                                '& input': {
                                    color: 'black'  // Set the input text color to black
                                }
                            }
                        }}
                        />
                </Stack>
                <Box>
                    <Button onClick={submitForm} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', border: '0px', width: '100%', marginTop: '20px' }} disabled={loading}>
                        {loading ? 'Processing...' : 'Verify'}
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
}
