// @mui
import { Stack, Typography, Grid } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from './Iconify';


const RoundedButton = ({ display, caption, icon, route }) => {
    const navigate = useNavigate()
    const theme = useTheme();
    const ButtonStyle = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        boxShadow: '0 4px 12px rgb(0 0 0 / 16%)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "6px",
    }));

    return (
        <Grid container onClick={() => (navigate(route, { replace: true }))}>
            <Stack sx={{ cursor: 'grab' }}>
                <ButtonStyle sx={{ marginLeft: '0.2em' }} xs={2} sm={2} md={2}>
                    <Iconify icon={icon} height={90} color="white" />
                </ButtonStyle >

                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>{display}</Typography>
                <Typography variant='body2' sx={{ justifyContent: 'center', color: theme.palette.primary.dark, fontSize: '0.79em', marginLeft: '0.2em' }}>{caption}</Typography>
            </Stack>
        </Grid>

    );
}

export default RoundedButton;