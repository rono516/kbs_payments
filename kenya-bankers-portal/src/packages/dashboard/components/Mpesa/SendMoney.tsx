import {Avatar, Box, Button, Card, CardContent, Paper, Stack, TextField, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel, {a11yProps} from "../../../../shared/components/tab/TabPanel.tsx";
import {useState} from "react";
const frequentContacts = [
    {
        name: "John Doe",
        phone: "0712345678"
    },
    {
        name: "Jane Doe",
        phone: "0712345678"
    },
    {
        name: "John Doe",
        phone: "0712345678"
    },
    {
        name: "Jane Doe",
        phone: "0712345678"
    },
    {
        name: "John Doe",
        phone: "0712345678"
    },
    {
        name: "Jane Doe",
        phone: "0712345678"
    },
    {
        name: "John Doe",
        phone: "0712345678"
    },
    {
        name: "Jane Doe",
        phone: "0712345678"
    },
    {
        name: "John Doe",
        phone: "0712345678"
    },

]

export default function SendMoney() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Paper
            sx={{
                p:2,
                m:2,
                color: 'primary.main',
                height: '100%',
                backgroundColor: 'secondary.lighter'
            }}
        >
            <Typography variant="h4" component="h2">Send Money</Typography>
            <Card sx={{ color: 'primary.main',}}>
                <CardContent>
                    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Stack direction="column" spacing={3}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Vertical tabs example"
                                    sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="To My Phone" {...a11yProps(0)} />
                                    <Tab label="To Someone Else" {...a11yProps(1)} />
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        variant="outlined"
                                        type="number"
                                    />
                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <Button size="large" variant="contained" color="primary">Send</Button>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Stack direction="column" spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Recipient's Phone Number"
                                            variant="outlined"
                                            type="number"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Stack>
                                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                                        <Button size="large" variant="contained" color="primary">Send</Button>
                                    </Box>
                                    <Typography variant="h6" sx={{mt:2}}>Frequent Contacts</Typography>
                                    {
                                        frequentContacts.map((contact, index) => (
                                            <Stack direction="row" key={index} spacing={3}>
                                                <Avatar sx={{bgcolor:'warning.main'}}>{contact.name[0]}</Avatar>
                                                <Stack direction="column">
                                                    <Typography variant="body1">{contact.name}</Typography>
                                                    <Typography variant="subtitle2">{contact.phone}</Typography>
                                                </Stack>
                                            </Stack>
                                        ))
                                    }
                                </TabPanel>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack direction={"row"}>
                                <img src={poster} alt="poster" style={{width: '100%'}}/>
                                <img src={poster2} alt="poster" style={{width: '100%'}}/>
                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Paper>
    )
}