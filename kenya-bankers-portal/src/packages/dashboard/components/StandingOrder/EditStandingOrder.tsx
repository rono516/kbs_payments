import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel, { a11yProps } from "../../../../shared/components/tab/TabPanel.tsx";
import { SyntheticEvent, useState } from "react";

export default function EditStandingOrder() {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Card sx={{ color: 'primary.main', textAlign: 'center' }}>
            <CardHeader
                title="Edit Standing Order"
            />
            <CardContent>
                <Stack spacing={3} direction="column">
                    <Typography variant="h6">Name of Standing order</Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <Tabs
                            orientation="horizontal"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Pay to M-pesa" {...a11yProps(0)} />
                            <Tab label="Pay to Bank" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Stack direction="column" spacing={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Phone Number"
                                    type="number"
                                    size="small"
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
                                    type="date"
                                    size="small"
                                    label="Select Date"
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
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                />
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack direction="column" spacing={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Account Number"
                                    type="number"
                                    size="small"
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
                                    type="date"
                                    size="small"
                                    label="Select Date"
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
                                    sx={{
                                        backgroundColor:'white',
                                        '& input': {
                                            color: 'black',
                                        } 
                                    }}
                                />
                            </Stack>
                        </TabPanel>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Update Order
                        </Button>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
