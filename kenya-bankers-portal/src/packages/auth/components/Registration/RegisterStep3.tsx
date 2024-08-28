import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Paper, InputLabel, Select, MenuItem, SelectChangeEvent, FormControl } from '@mui/material';

interface Step3Props {
    onNext: (data: any) => void;
    onBack: (data: any) => void;
    formData: any;
}

const RegisterStep3: React.FC<Step3Props> = ({ onNext, onBack, formData: initialFormData }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSelectChange = (id: string) => (e: SelectChangeEvent<string>) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields = ['employment_status', 'terms_of_service', 'joining_fee', 'joining_fee_reference', 'employer', 'kra_pin'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`${field.replace(/_/g, ' ')} is required`);
                setTimeout(() => setError(''), 5000);
                return;
            }
        }
        onNext(formData);
    };

    useEffect(()=>{
        document.title = "Registration Step3";
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
                    overflow: "auto",
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>Step 3: Employment Details</Typography>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Stack spacing={2}>
                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white', color:'black' }}>
                        <InputLabel id="employment-status-label">Employment Status</InputLabel>
                        <Select
                            labelId="employment-status-label"
                            id="employment_status"
                            value={formData.employment_status}
                            label="Employment Status"
                            onChange={handleSelectChange('employment_status')}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="employed" sx={{ color: 'black' }}>Employed</MenuItem>
                            <MenuItem value="self_employed" sx={{ color: 'black' }}>Self Employed</MenuItem>
                            <MenuItem value="other" sx={{ color: 'black' }}>Other</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white', color:'black', mt:2 }}>
                        <InputLabel id="terms-of-service-label">Terms of Service</InputLabel>
                        <Select
                            labelId="terms-of-service-label"
                            id="terms_of_service"
                            value={formData.terms_of_service}
                            label="Terms of Service"
                            onChange={handleSelectChange('terms_of_service')}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="Contract" sx={{ color: 'black' }}>Contract</MenuItem>
                            <MenuItem value="Permanent" sx={{ color: 'black' }}>Permanent</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white', color:'black', mt:2 }}>
                        <InputLabel id="currently-working-label">Currently Working</InputLabel>
                        <Select
                            labelId="currently-working-label"
                            id="currently_working"
                            value={formData.currently_working}
                            label="Currently Working"
                            onChange={handleSelectChange('currently_working')}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="True" sx={{ color: 'black' }}>True</MenuItem>
                            <MenuItem value="False" sx={{ color: 'black' }}>False</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        id="joining_fee"
                        label="Joining Fee"
                        type="text"
                        variant="outlined"
                        value={formData.joining_fee}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="joining_fee_reference"
                        label="Joining Fee Reference"
                        type="text"
                        variant="outlined"
                        value={formData.joining_fee_reference}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="employer"
                        label="Employer"
                        type="text"
                        variant="outlined"
                        value={formData.employer}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="employer_phone_number"
                        label="Employer Phone Number"
                        type="text"
                        variant="outlined"
                        value={formData.employer_phone_number}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="business"
                        label="Business"
                        type="text"
                        variant="outlined"
                        value={formData.business}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="staff_id"
                        label="Staff ID"
                        type="text"
                        variant="outlined"
                        value={formData.staff_id}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="kra_pin"
                        label="KRA PIN"
                        type="text"
                        variant="outlined"
                        value={formData.kra_pin}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />

                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white', color:'black', mt:2 }}>
                        <InputLabel id="subscribed-to-mbanking-label">Subscribed to M-Banking</InputLabel>
                        <Select
                            labelId="subscribed-to-mbanking-label"
                            id="subscribed_to_mbanking"
                            value={formData.subscribed_to_mbanking}
                            label="Subscribed to M-Banking"
                            onChange={handleSelectChange('subscribed_to_mbanking')}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="YES" sx={{ color: 'black' }}>YES</MenuItem>
                            <MenuItem value="NO" sx={{ color: 'black' }}>NO</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <FormControl sx={{ minWidth: 120, backgroundColor: 'white', color:'black', mt:2 }}>
                        <InputLabel id="mobile-loan-disallowed-label">Mobile Loan Disallowed</InputLabel>
                        <Select
                            labelId="mobile-loan-disallowed-label"
                            id="mobile_loan_disallowed"
                            value={formData.mobile_loan_disallowed}
                            label="Mobile Loan Disallowed"
                            onChange={handleSelectChange('mobile_loan_disallowed')}
                            sx={{ backgroundColor: 'white', color: 'black' }}
                        >
                            <MenuItem value="YES" sx={{ color: 'black' }}>YES</MenuItem>
                            <MenuItem value="NO" sx={{ color: 'black' }}>NO</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Box display="flex" justifyContent="space-between" marginTop="20px">
                    <Button onClick={onBack} size="large" sx={{ backgroundColor: 'grey.500', color: 'white' }}>
                        Back
                    </Button>
                    <Button type="submit" size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                        Next
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
};

export default RegisterStep3;