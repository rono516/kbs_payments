import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Stack, Paper } from '@mui/material';

interface Step4Props {
    onBack: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
}

const RegisterStep4: React.FC<Step4Props> = ({ onBack, onSubmit, formData: initialFormData })=> {
    const [formData] = useState(initialFormData);
    useEffect(()=>{
        document.title = "Registration Step4";
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
                component="div"
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
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>Step 4: Review and Submit</Typography>
                </Box>
                <Box sx={{ color:'black' }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>Basic Information</Typography>
                    <Typography>Title: {formData.title}</Typography>
                    <Typography>Name: {formData.name}</Typography>
                    <Typography>Email: {formData.email}</Typography>
                    <Typography>Date of Birth: {formData.dateOfBirth}</Typography>
                    <Typography>ID Number: {formData.idNumber}</Typography>
                    <Typography>Phone Number: {formData.phone_number}</Typography>
                </Box>
                <Box sx={{ marginTop: '20px', color:'black' }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>Additional Details</Typography>
                    <Typography>Postal Address: {formData.postal_address}</Typography>
                    <Typography>Physical Address: {formData.physical_address}</Typography>
                    <Typography>Marital Status: {formData.marital_status}</Typography>
                    <Typography>Marital Status (Other): {formData.marital_status_other}</Typography>
                    <Typography>Gender: {formData.gender}</Typography>
                    <Typography>Gender (Other): {formData.gender_other}</Typography>
                    <Typography>Next of Kin: {formData.kin}</Typography>
                    <Typography>Historical Member ID: {formData.historical_member_id}</Typography>
                    <Typography>Profession: {formData.profession}</Typography>
                </Box>
                <Box sx={{ marginTop: '20px', color:'black' }}>
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>Employment Details</Typography>
                    <Typography>Employment Status: {formData.employment_status}</Typography>
                    <Typography>Terms of Service: {formData.terms_of_service}</Typography>
                    <Typography>Currently Working: {formData.currently_working}</Typography>
                    <Typography>Joining Fee: {formData.joining_fee}</Typography>
                    <Typography>Joining Fee Reference: {formData.joining_fee_reference}</Typography>
                    <Typography>Employer: {formData.employer}</Typography>
                    <Typography>Employer Phone Number: {formData.employer_phone_number}</Typography>
                    <Typography>Business: {formData.business}</Typography>
                    <Typography>Staff ID: {formData.staff_id}</Typography>
                    <Typography>KRA PIN: {formData.kra_pin}</Typography>
                    <Typography>Subscribed to M-Banking: {formData.subscribed_to_mbanking}</Typography>
                    <Typography>Mobile Loan Disallowed: {formData.mobile_loan_disallowed}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginTop="20px">
                    <Button onClick={onBack} size="large" sx={{ backgroundColor: 'grey.500', color: 'white' }}>
                        Back
                    </Button>
                    <Button onClick={onSubmit} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
};

export default RegisterStep4;
