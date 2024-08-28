import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const baseUrl = 'http://127.0.0.1:8000/api';

const LoanForm: React.FC = () => {
    const member_id = localStorage.getItem('sacco_user_id');
    const [loading, setLoading] = useState(false);
    const product_id = localStorage.getItem('product_id') || '';
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        account_holder_id: member_id || '',
        product_id: product_id,
        amount: '',
        repayment_installments: '',
        repayment_period: '',
        repayment_period_unit: '',
        anticipated_disbursement_date: '',
        first_repayment_date: '',
        disbursement_mode: '',
        bank: '',
        bank_branch: '',
        account_number: ''
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
            await axios.post(`${baseUrl}/loan-application/${member_id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/loans/my');
        }catch (error: any) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || "Loan account already exists for this product.");
            } else {
                setError("An error occurred while creating the loan application."); // Generic error message
            }
        }finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, m: 4, backgroundColor: '#F5F5F5', color: 'black', '& input': { color: 'black' } }}>
            <Typography variant="h6">Loan Application</Typography>
            {/* Display the error message if it exists */}
            {error && <Typography color="error" sx={{ mb:2 }}>{error}</Typography>}
            {/* <TextField
                name="account_holder_id"
                label="Account Holder ID"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.account_holder_id}
                disabled
                // sx={{
                //     backgroundColor:'white',
                // }}
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
            <TextField
                name="repayment_installments"
                label="Repayment Installments"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.repayment_installments}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="repayment_period"
                label="Repayment Period"
                type="number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.repayment_period}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="repayment_period_unit"
                label="Repayment Period Unit"
                select
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.repayment_period_unit}
                sx={{ color: 'black',backgroundColor:'white' }}
                SelectProps={{
                    MenuProps: { PaperProps: { sx: { bgcolor: 'white', '& .MuiMenuItem-root': { color: 'black' } } } },
                    sx: { color: 'black' }
                }}
                inputProps={{ style: { color: 'black' } }}
            >
                <MenuItem value="MONTHS" sx={{ color: 'black' }}>Months</MenuItem>
                <MenuItem value="WEEKS" sx={{ color: 'black' }}>Weeks</MenuItem>
                <MenuItem value="DAYS" sx={{ color: 'black' }}>Days</MenuItem>
            </TextField>
            <TextField
                name="anticipated_disbursement_date"
                label="Anticipated Disbursement Date"
                type="date"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.anticipated_disbursement_date}
                InputLabelProps={{ shrink: true }}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="first_repayment_date"
                label="First Repayment Date"
                type="date"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.first_repayment_date}
                InputLabelProps={{ shrink: true }}
                sx={{
                    backgroundColor:'white',
                }}
            />
            <TextField
                name="disbursement_mode"
                label="Disbursement Mode"
                select
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.disbursement_mode}
                sx={{ color: 'black', backgroundColor:'white' }}
                SelectProps={{
                    MenuProps: { PaperProps: { sx: { bgcolor: 'white', '& .MuiMenuItem-root': { color: 'black' } } } },
                    sx: { color: 'black' }
                }}
                inputProps={{ style: { color: 'black' } }}
            >
                <MenuItem value="fosa" sx={{ color: 'black' }}>FOSA</MenuItem>
                <MenuItem value="bank_account" sx={{ color: 'black' }}>Bank Account</MenuItem>
                <MenuItem value="mpesa" sx={{ color: 'black' }}>MPESA</MenuItem>
                <MenuItem value="cash" sx={{ color: 'black' }}>Cash</MenuItem>
                <MenuItem value="cheque" sx={{ color: 'black' }}>Cheque</MenuItem>
            </TextField>
            <Typography variant="h6" sx={{ mt: 2 }}>Loan Disbursement Bank Details</Typography>
            <TextField
                name="bank"
                label="Bank"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.bank}
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
            />
            <TextField
                name="account_number"
                label="Account Number"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formData.account_number}
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

export default LoanForm;
