import React from 'react';
import {Box, Card, CardContent, IconButton, Paper, Stack, styled, Typography} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ClickableCard = ({ icon, image, name, onClick,height, width }) => (
    <Card
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        sx={{ height, width, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',margin:3 }}
    >
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'primary.main' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={image} alt={name} />
            </div>
            <Stack spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
                <Typography variant="h6" align="center">{name}</Typography>
            </Stack>
        </CardContent>
    </Card>

);

const IconItem = ({ icon, name }) => (
    <Item>
        <IconButton style={{ fontSize: 48 }}>{icon}</IconButton>
        <Typography variant="body1">{name}</Typography>
    </Item>
);

export { ClickableCard, IconItem };