import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const { sacco_user_id } = useParams<{ sacco_user_id: string }>();
    const [otpdata, setOtpData] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (value: string) => {
        setOtpData(value);
    };

    const submitForm = async () => {
        const formData = new FormData();
        formData.append('otp_digit', otpdata);

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/verify-member/${sacco_user_id}/`, formData);
            if (response.data.bool === true) {
                localStorage.setItem('MemberLoginStatus', 'true');
                localStorage.setItem('sacco_user_id', response.data.sacco_user_id);

                // Store member data in local storage
                const memberData = response.data.member_data;

                const dateString = memberData.created_at;
                const date = new Date(dateString);
                const options: Intl.DateTimeFormatOptions = {
                    year: 'numeric',
                    month: 'short'
                };
                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

                localStorage.setItem('first_name', memberData.first_name);
                localStorage.setItem('middle_name', memberData.middle_name);
                localStorage.setItem('last_name', memberData.last_name);
                localStorage.setItem('eligible_amount', memberData.eligible_amount);
                localStorage.setItem('state', memberData.state);
                localStorage.setItem('date', formattedDate);
                
                navigate('/auth/referral');
            } else {
                setErrorMsg(response.data.msg);
            }
        } catch (error) {
            console.log(error);
            setErrorMsg('An error occurred during OTP verification.');
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
                    <Button onClick={submitForm} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', border: '0px', width: '100%', marginTop: '20px' }}>
                        Verify
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
}
