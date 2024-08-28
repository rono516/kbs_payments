import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useState } from "react";
import TabPanel, { a11yProps } from "../../../../shared/components/tab/TabPanel";
import { ArrowBack } from '@mui/icons-material';

const banks = [
    { id: 1, name: 'Equity Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 2, name: 'KCB Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 3, name: 'Cooperative Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 4, name: 'Family Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 5, name: 'National Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 6, name: 'Absa Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 7, name: 'Standard Chartered Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 8, name: 'Barclays Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 9, name: 'Stanbic Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 10, name: 'NCBA Bank', accountNumber: '123456789', branch: 'Nairobi' },
    { id: 11, name: 'CBA Bank', accountNumber: '123456789', branch: 'Nairobi' },
];

export default function BankTransfer() {
    const [selectedBank, selectBank] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSelectBank = (bank) => {
        selectBank(bank);
    };

    return (
        <Paper sx={{
                padding: 2,
                margin: 2,
                color: 'primary.main',
                height: '100%',
                backgroundColor: 'secondary.lighter'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                    borderBottom: '1px solid', // Adding the dividing line
                    borderColor: 'divider' // Using the theme's divider color
                }}
            >
                <Typography variant="h6" sx={{ flexGrow: 1, ml: 3, color: 'primary.main' }}> BANK TRANSFER </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => window.history.back()}
                    sx={{ alignSelf: 'center', marginRight: 2, mb: 1 }}
                >
                    Back
                </Button>
            </Box>
            <Box sx={{ color: 'primary.main' }}>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        {banks.map((bank) => (
                            <Paper
                                key={bank.id}
                                elevation={3}
                                sx={{
                                    marginBottom: 2,
                                    color: 'primary.main',
                                    padding: 1,
                                    '&:hover': {
                                        boxShadow: 6,
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar sx={{ bgcolor: 'warning.main' }}>{bank.name.charAt(0)}</Avatar>
                                    <Stack onClick={() => handleSelectBank(bank)}>
                                        <Typography variant="body1">{bank.name}</Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        {!selectedBank && (
                            <Stack direction="row">
                                <img src={poster} alt="poster" style={{ width: '100%' }} />
                                {/* <img src={poster2} alt="poster" style={{ width: '100%' }} /> */}
                            </Stack>
                        )}
                        {selectedBank && (
                            <Stack spacing={3} direction="column">
                                <Typography variant="h6">You have selected {selectedBank?.name}</Typography>
                                <Typography variant="h6">Please select the mode of transfer</Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Tabs
                                        orientation="horizontal"
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Vertical tabs example"
                                        sx={{ borderRight: 1, borderColor: 'divider' }}
                                    >
                                        <Tab label="Via PesaLink" {...a11yProps(0)} />
                                        <Tab label="Via Mpesa" {...a11yProps(1)} />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        <Stack direction="row" spacing={3}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Account Number"
                                                type="number"
                                                size="small" />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Amount"
                                                type="number"
                                                size="small" />
                                        </Stack>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Stack direction="row" spacing={3}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Mpesa Number"
                                                type="number"
                                                size="small" />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Amount"
                                                type="number"
                                                size="small" />
                                        </Stack>
                                    </TabPanel>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        Transfer
                                    </Button>
                                </Box>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
