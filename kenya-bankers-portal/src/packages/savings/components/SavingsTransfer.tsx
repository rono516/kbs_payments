import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

const SavingsTransfer: React.FC = () => {
    const member_id = localStorage.getItem('sacco_user_id');
    const phone = localStorage.getItem('phone');
    const { savings_id } = useParams<{ savings_id: string }>();
    const acc_number = localStorage.getItem('fosa_account_number');

    const [formData, setFormData] = useState({
        notes: '',
        savings_id: acc_number || '',
        acc_number: savings_id || '',
        amount: '',
        phone_number: phone || ''
    });

    const [loading, setLoading] = useState(false);

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

        try {

            // Perform savings transaction
            await axios.post(`${baseUrl}/savings_transfer/`,formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Navigate to a success page or display a success message
            navigate('/savings/my');
        } catch (error) {
            console.error("Error creating savings transaction", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, m: 4, backgroundColor: '#F5F5F5', color: 'black', '& input': { color: 'black' } }}>
            <Typography variant="h6">Savings Transfer</Typography>
            {/* <TextField
                name="savings_id"
                label="Savings ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.savings_id}
                disabled
            /> */}
            <TextField
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.amount}
                sx={{
                    backgroundColor:'white',
                }}
            />
            {/* <TextField
                name="phone_number"
                label="Phone Number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.phone_number}
            /> */}
            <TextField
                name="notes"
                label="Description"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.notes}
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

export default SavingsTransfer;
