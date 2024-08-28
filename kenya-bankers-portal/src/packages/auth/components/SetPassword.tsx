import React, {useState} from "react";
import {Box, Button, Paper, Stack, TextField, Typography} from "@mui/material";
import ConfirmationDialog from "./ConfirmationDialog.tsx";
import {useNavigate} from "react-router-dom";

export default function SetPassword() {
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }
    const redirect = () => {
        navigate('/dashboard')
    }
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
                    backgroundColor:'secondary.lighter'
                }}
            >
                <Box sx={{marginBottom:'20px'}} justifyContent="center">
                    <Typography variant="body1" sx={{color:'warning.main'}}>One more thing</Typography>
                    <Typography variant="h4" sx={{color:'primary.main'}}> Create Your Password</Typography>
                </Box>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="name"
                        type="password"
                        placeholder="Create password"
                        autoComplete="current-name"
                        variant="outlined"
                        sx={{backgroundColor:'primary.contrastText',border:'0px'}}
                    />
                    <TextField
                        fullWidth
                        id="name"
                        type="password"
                        autoComplete="current-name"
                        placeholder="Confirm password"
                        variant="outlined"
                        sx={{backgroundColor:'primary.contrastText',border:'0px'}}
                    />
                </Stack>
                <Box>
                    <Button onClick={openDialog} size="large" sx={{backgroundColor:'primary.main',color:'primary.contrastText',border:'0px',width:'100%',marginTop:'20px'}}>Finish</Button>
                </Box>
                <ConfirmationDialog
                    open={dialogOpen}
                    onClose={() => redirect()}
                    />
            </Paper>
        </Stack>
    );
}
