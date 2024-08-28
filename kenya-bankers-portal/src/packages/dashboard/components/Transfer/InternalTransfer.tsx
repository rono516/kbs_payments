import {AppBar, Box, Button, Card, CardContent, CardHeader, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ArrowBack } from '@mui/icons-material';
import MyAccountInternalTransfer from "./sub-components/MyAccountInternalTransfer.tsx";
import MyOtherAccountsInternalTransfer from "./sub-components/MyOtherAccountsInternalTransfer.tsx";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function InternalTransfer() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper 
            sx={{
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
                <Typography variant="h6" sx={{ flexGrow: 1, ml:3, color:'primary.main'}}> INTERNAL TRANSFER </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => window.history.back()}
                    sx={{ alignSelf: 'center', marginRight: 2, mb:1 }}
                >
                    Back
                </Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                >
                    <Tab label="Other Account" {...a11yProps(0)} />
                    <Tab label="My Accounts" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <MyAccountInternalTransfer />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <MyOtherAccountsInternalTransfer />
            </CustomTabPanel>
        </Paper>
    );
}