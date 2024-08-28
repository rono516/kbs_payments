import * as React from 'react';
import Grid from '@mui/material/Grid';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import poster from "../../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../../assets/images/drawable-hdpi/posters-08.png";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';
export default function MyAccountInternalTransfer(){
    // const member_id = localStorage.getItem('sacco_user_id');
    const phone = localStorage.getItem('phone');
    const savings_id = localStorage.getItem('fosa_account_number');

    const [formData, setFormData] = useState({
        notes: '',
        savings_id: savings_id || '',
        acc_number: '',
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

    useEffect(() => {
        document.title = "Transfer";
    }, []);
    
    return (
        <Box sx={{ minWidth: '100%'}}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body1">Enter Account Number and Amount to transfer.</Typography>
                        <TextField
                            id="acc_number"
                            name="acc_number"
                            label="Account Number"
                            variant="outlined"
                            onChange={handleChange}
                            value={formData.acc_number}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                        <TextField
                            id="amount"
                            name="amount"
                            label="Amount (KES)"
                            variant="outlined"
                            onChange={handleChange}
                            value={formData.amount}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                        <TextField
                            id="notes"
                            name="notes"
                            label="Description"
                            variant="outlined"
                            onChange={handleChange}
                            value={formData.notes}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                    </Stack>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>
                            {loading ? 'Processing...' : 'Transfer'}
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction={"row"}>
                        {/* <img src={poster} alt="poster" style={{width: '100%'}}/> */}
                        <img src={poster2} alt="poster" style={{width: '100%'}}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}
