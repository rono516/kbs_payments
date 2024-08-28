import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

const LoanRepayment: React.FC = () => {
    const member_id = localStorage.getItem('sacco_user_id');
    const phone = localStorage.getItem('phone');
    const { loan_id } = useParams<{ loan_id: string }>();

    const [formData, setFormData] = useState({
        // bank_branch: '',
        notes: '',
        // payment_method: '',
        // reference: '',
        loan_id: loan_id || '',
        amount: '',
        // phone_number: phone || ''
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
            await axios.post(`${baseUrl}/loan_repayment/`,formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Navigate to a success page or display a success message
            navigate(`/loans/loan-details/${member_id}/${loan_id}`);
        } catch (error) {
            console.error("Error creating savings transaction", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, m: 4, backgroundColor: '#F5F5F5', color: 'black', '& input': { color: 'black' } }}>
            <Typography variant="h6">Loan Repayment</Typography>
            <TextField
                name="loan_id"
                label="Loan ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.loan_id}
                sx={{
                    backgroundColor:'white',
                }}
                disabled
            />
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
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="bank_branch"
                label="Bank Branch"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.bank_branch}
                sx={{
                    backgroundColor:'white',
                }}
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
            {/* <TextField
                name="payment_method"
                label="Payment Method"
                select
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.payment_method}
                sx={{ color: 'black', backgroundColor:'white' }}
                SelectProps={{
                    MenuProps: { PaperProps: { sx: { bgcolor: 'white', '& .MuiMenuItem-root': { color: 'black' } } } },
                    sx: { color: 'black' }
                }}
                inputProps={{ style: { color: 'black' } }}
            >
                <MenuItem value="mobile_money" sx={{ color: 'black' }}>Mobile Money</MenuItem>
                <MenuItem value="cash" sx={{ color: 'black' }}>Cash</MenuItem>
                <MenuItem value="cheque" sx={{ color: 'black' }}>Cheque</MenuItem>
            </TextField> */}
            {/* <TextField
                name="reference"
                label="Reference"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.reference}
                sx={{
                    backgroundColor:'white',
                }}
            /> */}
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
                {loading ? 'Processing...' : 'Submit'}
            </Button>
        </Box>
    );
};

export default LoanRepayment;
