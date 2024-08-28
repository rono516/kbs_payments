import React, { useState } from "react";
import { Box, Paper, Stack, TextField, Typography, Button, InputAdornment, Grid, Card, CardHeader, CardContent, Divider } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountProfile from "../../dashboard/components/AccountProfile";
import RecentTransactions from "../../dashboard/components/RecentTransactions";

export default function ChangePassword() {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [memberPasswordData, setMemberPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (event) => {
        setMemberPasswordData({
            ...memberPasswordData,
            [event.target.name]: event.target.value
        });
    };

    const submit = async () => {
        const { oldPassword, newPassword, confirmPassword } = memberPasswordData;

        if (newPassword !== confirmPassword) {
            setErrorMsg('New passwords do not match');
            setTimeout(() => setErrorMsg(''), 5000);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/change-password/', {
                sacco_user_id: localStorage.getItem('sacco_user_id'), 
                old_password: oldPassword,
                new_password: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                setSuccessMsg('Password changed successfully');
                setTimeout(() => {
                    setSuccessMsg('');
                    navigate('/');
                }, 5000);
            } else {
                setErrorMsg('Failed to change password');
                setTimeout(() => setErrorMsg(''), 5000);
            }
        } catch (error) {
            setErrorMsg(error.response.data.error || 'An error occurred');
            setTimeout(() => setErrorMsg(''), 5000);
        }finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            sx={{
                padding: 2,
                margin: 2,
                color: 'primary.main',
                height: '100%',
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter', p: 1 }}>
                    <Card>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CardHeader
                                sx={{ textAlign: 'center', color: 'primary.main' }}
                                title="Change Password"
                            />
                        </Box>
                        <CardContent>
                            {errorMsg && (
                                <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                                    {errorMsg}
                                </Typography>
                            )}
                            {successMsg && (
                                <Typography color="success" variant="body2" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
                                    {successMsg}
                                </Typography>
                            )}
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    name="oldPassword"
                                    label="Old Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    value={memberPasswordData.oldPassword}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: 'white',
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
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    value={memberPasswordData.newPassword}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: 'white',
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
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    value={memberPasswordData.confirmPassword}
                                    onChange={handleChange}
                                    sx={{
                                        backgroundColor: 'white',
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
                            <Divider sx={{ my: 2 }} />
                            <Button onClick={submit} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', border: '0px', width: '100%' }} disabled={loading}>
                                {loading ? 'Processing...' : 'Change Password'}
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px' }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}
