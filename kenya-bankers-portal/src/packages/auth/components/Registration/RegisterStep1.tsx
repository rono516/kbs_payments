import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Stack, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Step1Props {
    onNext: (data: any) => void;
    formData: any;
}

const RegisterStep1: React.FC<Step1Props> = ({ onNext, formData: initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            title: value
        });
    };

    const handleRegister = () => {
        navigate('/auth/login'); // Replace '/register' with the route to your registration page
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields = ['title', 'name', 'email', 'dateOfBirth', 'idNumber', 'phone', 'password', 'confirmPassword'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`${field.replace(/_/g, ' ')} is required`);
                setTimeout(() => setError(''), 5000);
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setTimeout(() => setError(''), 5000);
            return;
        }

        onNext(formData);
    };

    useEffect(()=>{
        document.title = "Registration Step1";
    });

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
                onSubmit={handleNext}
                sx={{
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    width: "500px",
                    backgroundColor: 'secondary.lighter',
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main', mt: 4 }}>Step 1: Basic Information</Typography>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Stack spacing={2} direction="row" sx={{mb: 2 }}>
                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white' }}>
                        <InputLabel id="title-label">Title</InputLabel>
                        <Select
                            labelId="title-label"
                            id="title"
                            value={formData.title}
                            label="Title"
                            onChange={handleSelectChange}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="Mr" sx={{ color: 'black' }}>Mr</MenuItem>
                            <MenuItem value="Mrs" sx={{ color: 'black' }}>Mrs</MenuItem>
                            <MenuItem value="Ms" sx={{ color: 'black' }}>Ms</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        id="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                </Stack>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        variant="outlined"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        id="idNumber"
                        label="ID Number"
                        type="text"
                        variant="outlined"
                        value={formData.idNumber}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        type="text"
                        variant="outlined"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                </Stack>
                <Box>
                    <Button type="submit" size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', width: '100%', marginTop: '20px' }}>
                        Next
                    </Button>
                </Box>
                <Box sx={{ marginTop: '10px' }} justifyContent="center">
                    <Typography variant="body1" sx={{ color: 'warning.main' }}>
                        Already have an account? Login
                        <Button onClick={handleRegister} size="small" sx={{ backgroundColor: 'info.main', color: 'primary.contrastText', border: '0px', marginInlineStart:'10px'}}>
                        Login
                        </Button>
                    </Typography>                    
                </Box>
            </Paper>
        </Stack>
    );
};

export default RegisterStep1;
