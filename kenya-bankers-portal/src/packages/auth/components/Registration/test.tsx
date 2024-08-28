import React, { useState } from "react";
import axios from "axios";
import { Box, Button, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateOfBirth: '',
        idNumber: '',
        phone_number:'',
        password: '',
        // otp_digit: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        const requiredFields = ['name', 'email', 'dateOfBirth', 'idNumber', 'phone_number', 'password', 'confirmPassword'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`${field.replace(/_/g, ' ')} is required`); // Replace underscores for better readability
                setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
                return;
            }
        }

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
            return;
        }

        // Generate OTP digit
        const otp_digit = Math.floor(100000 + Math.random() * 900000)

        // Prepare the data
        const data = {
            email: formData.email,
            date_of_birth: formData.dateOfBirth,
            password: formData.password,
            idNumber: formData.idNumber,
            phone_number: formData.phone_number,
            name: formData.name,
            otp_digit:otp_digit
        };

        try {
            // Make the POST request
            console.log("About to make post request")
            const response = await axios.post('http://localhost:8000/api/register/', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            console.log("Made the request");
            console.log("register response")
            console.log( response)

            if (response.status === 201) {
                const saccoUserId = response.data.sacco_user_id;
                console.log('Sacco User ID:', saccoUserId); // Logging Sacco User ID to the console
                localStorage.setItem('phone', response.data.phone);
                localStorage.setItem('access_token', response.data.access);
                navigate(`/auth/verify-otp/${saccoUserId}`);
            } else {
                setError('Registration failed');
                setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
            }
        } catch (error) {
            setError(error.response.data.error || 'An error occurred');
            setTimeout(() => setError(''), 5000); // Clear error after 5 seconds
        }
    };

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
                onSubmit={handleSubmit}
                sx={{
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    width: "500px",
                    backgroundColor: 'secondary.lighter'
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main' }}> Create an account</Typography>
                    <Typography variant="body1" sx={{ color: 'warning.main' }}> Discover the wonderful of the Kenya Bankers Sacco</Typography>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="name"
                        label="What's your name"
                        type="text"
                        autoComplete="current-name"
                        variant="outlined"
                        value={formData.name}
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
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="current-email"
                        variant="outlined"
                        value={formData.email}
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
                        id="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        autoComplete="current-date"
                        variant="outlined"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        sx={{
                            backgroundColor:'white',
                            '& input': {
                                color: 'black',
                            } 
                        }}
                        InputLabelProps={{
                            shrink: true, // Ensures the label is always shrunk
                        }}
                    />
                    <TextField
                        fullWidth
                        id="idNumber"
                        label="ID Number"
                        type="text"
                        autoComplete="current-id-number"
                        variant="outlined"
                        value={formData.idNumber}
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
                        id="phone_number"
                        label="Phone Number"
                        type="text"
                        autoComplete="current-phone-number"
                        variant="outlined"
                        value={formData.phone_number}
                        onChange={handleChange}
                        sx={{
                            backgroundColor:'white',
                            '& input': {
                                color: 'black',
                            } 
                        }}
                    />
                    {/* <TextField
                        fullWidth
                        id="employment_status"
                        label="Employment Status"
                        type="text"
                        variant="outlined"
                        value={formData.employment_status}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    /> */}
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={formData.password}
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
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={formData.confirmPassword}
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
                <Box>
                    <Button type="submit" size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', border: '0px', width: '100%', marginTop: '20px' }}>
                        Next
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
}