import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

const SavingsForm: React.FC = () => {
    const member_id = localStorage.getItem('sacco_user_id')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        account_holder_id: member_id || '',
        product_id: '',
        name: '',
        monthly_remittance_amount: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear any previous errors

        try {
            await axios.post(`${baseUrl}/savings-application/${member_id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Navigate to a success page or display a success message
            navigate('/savings/my');
        }catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || "Savings account already exists for this product.");
            } else {
                setError("An error occurred while creating the savings application."); // Generic error message
            }
        }finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, m: 4, backgroundColor: '#F5F5F5', color: 'black', '& input': { color: 'black' } }}>
            <Typography variant="h6">Savings Application</Typography>
            {/* Display the error message if it exists */}
            {error && <Typography color="error" sx={{ mb:2 }}>{error}</Typography>}
            {/* <TextField
                name="account_holder_id"
                label="Account Holder ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.account_holder_id}
            /> */}
            <TextField
                name="product_id"
                label="Product ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.product_id}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="name"
                label="name"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.name}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="monthly_remittance_amount"
                label="Monthly Remittance Amount"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.monthly_remittance_amount}
                sx={{
                    backgroundColor:'white',
                }}
            />         
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                {loading ? 'Processing...' : 'Submit'}
            </Button>
        </Box>
    );
};

export default SavingsForm;
