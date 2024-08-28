import React, { useEffect, useState } from "react";
import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api';

export default function Login() {
    const navigate = useNavigate();
    const [memberLoginData, setMemberLoginData] = useState({
        phone: '',
        password: ''
    });

    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setMemberLoginData({
            ...memberLoginData,
            [event.target.name]: event.target.value
        });
    };

    const handleRegister = () => {
        navigate('/auth/register'); // Replace '/register' with the route to your registration page
    };

    const login = async () => {
        const data = {
            phone: memberLoginData.phone,
            password: memberLoginData.password,
        };
        setLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/login/`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const { sacco_user_id } = response.data;
                // Store the sacco_user_id in local storage or context
                localStorage.setItem('sacco_user_id', sacco_user_id);
                localStorage.setItem('phone', response.data.phone);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('home', response.data.home);
                localStorage.setItem('work', response.data.work);
                localStorage.setItem('MemberLoginStatus', 'true');

                // Save additional member data in local storage
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
                // localStorage.setItem('eligible_amount', memberData.eligible_amount);
                localStorage.setItem('state', memberData.state);
                localStorage.setItem('date', formattedDate);
                
                navigate(`/auth/login-verify-otp/${sacco_user_id}`);
                // navigate('/dashboard');
            } else {
                setErrorMsg('Login failed');
            }
        } catch (error) {
            console.error('Error during login', error);
            setErrorMsg('Invalid phone or password');
        }
    };

    useEffect(() => {
        document.title = "Member Login";
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
                    backgroundColor:'secondary.lighter'
                }}
            >
                <Box sx={{ marginBottom:'20px', textAlign:'center' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color:'primary.main', marginBottom:3 }}> Welcome To Kenya Bankers Sacco</Typography>
                    <Typography variant="body1" sx={{ color:'warning.main', marginBottom:3 }}> Please Login to continue</Typography>
                </Box>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone no."
                        type="text"
                        placeholder="+254"
                        autoComplete="current-id-number"
                        variant="outlined"
                        value={memberLoginData.phone}
                        onChange={handleChange}
                        sx={{
                            backgroundColor:'white',
                            '& input': {
                                color: 'black',
                            } 
                        }}
                    />
                    <TextField
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={memberLoginData.password}
                        onChange={handleChange}
                        sx={{
                            backgroundColor:'white',
                            '& input': {
                                color: 'black',
                            } 
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                {errorMsg && (
                    <Typography color="error" variant="body2">
                        {errorMsg}
                    </Typography>
                )}
                <Box>
                    <Button onClick={login} size="large" sx={{ backgroundColor:'primary.main', color:'primary.contrastText', border:'0px', width:'100%', marginTop:'20px' }} disabled={loading}>
                        {loading ? 'Logging...' : 'Login'}
                    </Button>
                </Box>
                <Box sx={{ marginTop: '10px' }} justifyContent="center">
                    <Typography variant="body1" sx={{ color: 'warning.main' }}>
                        Don't have an account?
                        <Button onClick={handleRegister} size="small" sx={{ backgroundColor: 'info.main', color: 'primary.contrastText', border: '0px', marginInlineStart:'10px'}}>
                        Register
                        </Button>
                    </Typography>                    
                </Box>
            </Paper>
        </Stack>
    );
}
