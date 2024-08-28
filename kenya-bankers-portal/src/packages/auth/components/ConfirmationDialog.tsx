import React from "react";
import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';

export interface SimpleDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function ConfirmationDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box p={2} textAlign="center">
                <Typography variant="h4" sx={{ color: 'primary.main', marginBottom: 2 }}>Success!!</Typography>
                <Stack spacing={2} direction="column" alignItems="center">
                    <VerifiedIcon sx={{ color: 'primary.main', fontSize: '100px' }} />
                    <Typography variant="h5" sx={{ color: 'primary.main' }}>Welcome to the world of easy finances.</Typography>
                </Stack>
                <Button onClick={handleClose} size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', width: '100%', marginTop: '20px' }}>OK</Button>
            </Box>
        </Dialog>
    );
}
