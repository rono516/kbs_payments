import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';  // Import Card directly from MUI
import CardContent from '@mui/material/CardContent';  // Import CardContent directly from MUI
import CardHeader from '@mui/material/CardHeader';  // Import CardHeader directly from MUI
import Typography from '@mui/material/Typography';  // Import Typography directly from MUI
import TabPanel from '../../../../shared/components/tab/TabPanel';  // Remove '.tsx' extension
import {a11yProps} from '../../../../shared/components/tab/TabPanel';  // Remove '.tsx' extension
import SavingSchemes from './SavingSchemes';  // Ensure correct path to SavingSchemes component
import LoanRepayment from './LoanRepayment';  // Ensure correct path to LoanRepayment component


export default function Transfer() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', backgroundColor: 'secondary.lighter', height: '100%', width: '100%' }}>
            <Card sx={{ m: 2, color: 'primary.main' }}>
                <CardHeader title="Deposit" />
                <CardContent>
                    <Typography variant="body2">I want to deposit to</Typography>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                    >
                        <Tab label="Savings Scheme" {...a11yProps(0)} />
                        <Tab label="Loan Repayment" {...a11yProps(1)} />
                    </Tabs>
                </CardContent>
            </Card>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <TabPanel value={value} index={0}>
                        <SavingSchemes />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <LoanRepayment />
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    );
}
