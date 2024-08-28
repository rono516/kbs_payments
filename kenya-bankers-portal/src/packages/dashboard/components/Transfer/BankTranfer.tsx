import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography, Select, FormControl, InputLabel, MenuItem
} from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useState } from "react";
import TabPanel, { a11yProps } from "../../../../shared/components/tab/TabPanel";
import { ArrowBack } from '@mui/icons-material';

const banks = [
    { id: 1, name: 'Equity Bank', swiftCode: 'EQBLKENA', branch: 'Nairobi' },
    { id: 2, name: 'KCB Bank', swiftCode: 'KCBLKENX017', branch: 'Nairobi' },
    { id: 3, name: 'Cooperative Bank', swiftCode: 'KCOOKENAXXX', branch: 'Nairobi' },
    { id: 4, name: 'Family Bank', swiftCode: 'FABLKENAXXX', branch: 'Nairobi' },
    { id: 5, name: 'National Bank', swiftCode: 'NBKEKENX828', branch: 'Nairobi' },
    { id: 6, name: 'Absa Bank', swiftCode: 'BARCKENXNPB', branch: 'Nairobi' },
    { id: 7, name: 'Standard Chartered Bank', swiftCode: 'SCBLKENXXXX', branch: 'Nairobi' },
    { id: 8, name: 'Barclays Bank', swiftCode: 'BARCKENX', branch: 'Nairobi' },
    { id: 9, name: 'Stanbic Bank', swiftCode: 'SBICKENX', branch: 'Nairobi' },
    { id: 10, name: 'NCBA Bank', swiftCode: 'CBAFKENX', branch: 'Nairobi' },
];

const currencies = ["KES", "USD", "UGX"]

export default function BankTransfer() {
    const [selectedBank, selectBank] = useState(null);
    const [creditCurrency, setCreditCurrency] = useState("UGX");    
    const [accountNumber, setAccountNumber] = useState("");
    const [bankAmount, setBankAmount] = useState("");
    const [mpesaAmount, setMpesaAmount] = useState("");
    const [mpesaNumber, setMpesaNumber] = useState('');
    const [value, setValue] = useState(0);
    const [buttonText, setButtonText] = useState("Transfer");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSelectBank = (bank) => {
        selectBank(bank);
    };
    const handleMpesaNumberChange = (e) => setMpesaNumber(e.target.value);
    const handleMpesaAmountChange = (e) => setMpesaAmount(e.target.value);

    const handleSubmit = async () => {
        if (selectedBank && accountNumber && bankAmount) {
            setButtonText("Sending....");
            setIsProcessing(true);
            try {
                const response = await fetch("http://127.0.0.1:8000/api/swift_payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from_account: "YOUR_FROM_ACCOUNT", // Replace with your actual from account value
                        to_account: accountNumber,
                        from_bank: "SBICKENX", // This is hardcoded as per your backend code
                        to_bank: selectedBank.swiftCode,
                        amount: bankAmount,
                        creditCurrency: creditCurrency,
                        reason: "Transfer", // Optional, depending on your backend needs
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok && data.bankStatus == "PROCESSED") {
                    setButtonText("Payment Successful");
                    console.log("Payment successful", data);
                    setAccountNumber("");
                    setBankAmount("");
                } else {
                    setButtonText("Payment Failed");
                    console.error("Payment failed", data);
                }
            } catch (error) {
                setButtonText("Error Occurred");
                console.error("An error occurred", error);
            }finally {
                setIsProcessing(false);
                setTimeout(() => setButtonText("Transfer"), 3000); // Reset button text after 3 seconds
            }
        } else {
            console.log("Please fill in all required fields.");
            // Optionally show a validation error message
        }
    };
    const handleMpesaSubmit = async () => {
        if (mpesaNumber && mpesaAmount) {
            setButtonText("Sending....");
            setIsProcessing(true);
            try {
                const response = await fetch("http://127.0.0.1:8000/api/pay_customer_mpesa", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mpesa_number: mpesaNumber,
                        amount: mpesaAmount,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok && data.ResponseCode === '0') {
                    setButtonText("Payment Successful");
                    console.log("Payment successful", data);
                    setMpesaNumber("");
                    setMpesaAmount("");
                } else {
                    setButtonText("Payment Failed");
                    console.error("Payment failed", data);
                }
            } catch (error) {
                setButtonText("Error Occurred");
                console.error("An error occurred", error);
            } finally {
                setIsProcessing(false);
                setTimeout(() => setButtonText("Transfer"), 3000); // Reset button text after 3 seconds
            }
        } else {
            console.log("Please fill in all required fields.");
            // Optionally show a validation error message
        }
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
                                        <Tab label="Via SWIFT" {...a11yProps(0)} />
                                        <Tab label="Via Mpesa" {...a11yProps(1)} />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        <Stack direction="row" spacing={3}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Account Number"
                                                type="number"
                                                size="small"
                                                value={accountNumber}
                                                onChange={(e) => setAccountNumber(e.target.value)}
                                                sx={{
                                                    backgroundColor:'white',
                                                    '& input': {
                                                        color: 'black',
                                                    } 
                                                }}
                                                />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Amount"
                                                type="number"
                                                size="small"
                                                value={bankAmount}
                                                onChange={(e) => setBankAmount(e.target.value)}
                                                sx={{
                                                    backgroundColor:'white',
                                                    '& input': {
                                                        color: 'black',
                                                    } 
                                                }}
                                                />
                                            <FormControl fullWidth>
                                                <InputLabel id="creditCurrency-label">Credit Currency</InputLabel>
                                                <Select
                                                    labelId="creditCurrency-label"
                                                    value={creditCurrency}
                                                    onChange={(e) => setCreditCurrency(e.target.value)}
                                                    label="Credit Currency"
                                                    sx={{ backgroundColor: 'white', color: 'black' }}
                                                    size="small"
                                                >
                                                    {currencies.map((currency) => (
                                                        <MenuItem  sx={{ color: 'black' }} key={currency} value={currency}>
                                                            {currency}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Stack>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Stack direction="row" spacing={3}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Mpesa Number"
                                                type="number"
                                                size="small"
                                                value={mpesaNumber}
                                                onChange={handleMpesaNumberChange}
                                                sx={{
                                                    backgroundColor:'white',
                                                    '& input': {
                                                        color: 'black',
                                                    } 
                                                }}
                                                />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Amount"
                                                value={mpesaAmount}
                                                onChange={handleMpesaAmountChange}
                                                sx={{
                                                    backgroundColor:'white',
                                                    '& input': {
                                                        color: 'black',
                                                    } 
                                                }}
                                                type="number"
                                                size="small" />
                                        </Stack>
                                    </TabPanel>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => {
                                            if (value === 0) {
                                                handleSubmit();
                                            } else if (value === 1) {
                                                handleMpesaSubmit();
                                            }
                                        }}
                                        disabled={isProcessing}
                                    >
                                        {buttonText}
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
