import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import InternalTransfer from "./InternalTransfer.tsx";
import {Card, CardContent} from "@mui/material";
import BankTransfer from "./BankTranfer.tsx";
import TabPanel from "../../../../shared/components/tab/TabPanel.tsx";
import {a11yProps} from "../../../../shared/components/tab/TabPanel.tsx";

export default function Transfer() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex',  backgroundColor: 'secondary.lighter', height: '100%',width:'100%'}}
        >
            <Card sx={{m:2, width: '17%'}}>
                <CardContent>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="INTERNAL" {...a11yProps(0)} sx={{ whiteSpace: 'normal', textAlign: 'left', width: '100%' }}/>
                        <Tab label="TO BANK" {...a11yProps(1)} sx={{ whiteSpace: 'normal', textAlign: 'left', width: '100%' }}/>
                    </Tabs>
                </CardContent>
            </Card>
            <Card sx={{m:2}}>
                <CardContent>
                    <TabPanel value={value} index={0}>
                        <InternalTransfer/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <BankTransfer/>
                    </TabPanel>
                </CardContent>
            </Card>
        </Box>
    );
}
