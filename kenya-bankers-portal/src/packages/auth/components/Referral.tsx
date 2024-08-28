import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "./ConfirmationDialog.tsx";
import axios from "axios";

export default function Referral() {
    const navigate = useNavigate();
    const [referredName, setReferredName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        if (redirectToDashboard) {
            navigate('/dashboard');
        }
    };
    
    const handleNext = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/save-referral/', {
                sacco_user_id: localStorage.getItem('sacco_user_id'),  // Adjust if necessary based on how you store user ID
                referral: referredName
            });
            if (response.status === 200) {
                setRedirectToDashboard(true);
                openDialog();
                // Optionally handle success message or navigate to next step
                // navigate('/auth/set-password');
                // navigate('/dashboard')
            } else {
                // Handle other status codes or errors
                console.error('Failed to save referral:', response.data.error);
                // Handle error state
            }
        } catch (error) {
            console.error('Error saving referral:', error);
            // Handle error state
        }
    };

    const handleSkip = () => {
        setRedirectToDashboard(true);
        openDialog();
        // Handle the case where user skips the referral step
        // For example, navigate to the next page directly
        // navigate('/auth/set-password');
    };

    useEffect(()=>{
        document.title = "Member Referral";
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
                sx={{
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    width: "500px",
                    backgroundColor: 'secondary.lighter'
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main' }}> Just one more step to go</Typography>
                    <Typography variant="body1" sx={{ color: 'warning.main' }}>Who referred you to our platform?</Typography>
                </Box>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="name"
                        type="text"
                        autoComplete="current-name"
                        variant="outlined"
                        sx={{
                            backgroundColor:'white',
                            '& input': {
                                color: 'black',
                            } 
                        }}
                        value={referredName}
                        onChange={(e) => setReferredName(e.target.value)}
                    />
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button onClick={handleNext} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', border: '0px', width: '100%' }}>
                        Finish
                    </Button>
                </Box>
                <Box sx={{ marginTop: '10px' }} justifyContent="center">
                    <Typography variant="body1" sx={{ color: 'warning.main' }}>
                        You can skip this step if you don't have a referral
                        <Button onClick={handleSkip} size="small" sx={{ backgroundColor: 'info.main', color: 'primary.contrastText', border: '0px', marginInlineStart:'10px'}}>
                        Skip
                        </Button>
                    </Typography>                    
                </Box>
            </Paper>
            <ConfirmationDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
            />
        </Stack>
    );
}
