import React from "react";
import { Box, Card, CardContent, Grid, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "../../dashboard/components/RecentTransactions.tsx";
import AccountProfile from "../../dashboard/components/AccountProfile.tsx";
import LessonIcon from "../../../assets/images/drawable-hdpi/Group -61.png";
import SecurityIcon from "../../../assets/images/drawable-hdpi/pin.png";
import InfoIcon from "../../../assets/images/drawable-hdpi/Info Icon.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../auth/components/Logout.tsx";

export default function Setting() {
    const navigate = useNavigate();
    const handleCardClick = (url) => {
        navigate(url);
    };

    const phone = localStorage.getItem('phone');
    const work = localStorage.getItem("work");
    const home = localStorage.getItem("home");
    const state = localStorage.getItem("state");
    const date = localStorage.getItem("date");

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isZoomedIn = useMediaQuery(theme.breakpoints.up('md'));

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <Paper
            sx={{
                padding: 1,
                margin: 1,
                color: 'primary.main',
                height: '100%',
            }}
        >
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={isZoomedIn ? 8 : 12} lg={isZoomedIn ? 8 : 12} sx={{ backgroundColor: 'secondary.lighter' }}>
                    <Card sx={{ color: 'primary.main', width: '60%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Stack direction="column">
                                    <Box sx={{ mb: 1 }}>
                                        <Typography variant="h6">Phone Number</Typography>
                                        <Typography variant="body1">{phone ? phone : "254 XXX XXXX XXX"}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6">Status</Typography>
                                        <Typography variant="body1">{state ? state : "Loading..."} since {date ? date : "Loading..."}</Typography>
                                    </Box>
                                </Stack>
                                <Box sx={{ flexGrow: 1 }} />
                                <Stack direction="column">
                                    <Box sx={{ mb: 1 }}>
                                        <Typography variant="h6">Home</Typography>
                                        <Typography variant="body1">{home ? home : "Nairobi"}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h6">Work</Typography>
                                        <Typography variant="body1">{work ? work : "Westland Mall"}</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 3, color: 'primary.main', width: '60%' }} onClick={() => handleCardClick('/lessons')}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Stack direction="column" spacing={2}>
                                    <img src={LessonIcon} alt="lessons" />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h6">My Lessons</Typography>
                                    <Typography variant="body1">Tap to watch tutorials</Typography>
                                </Stack>
                                <Box sx={{ flexGrow: 1 }} />
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h6">60%</Typography>
                                    <Typography variant="body1">Progress</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 3, color: 'primary.main', width: '60%' }} onClick={() => handleCardClick('/change-password')}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Stack direction="column" spacing={2}>
                                    <img src={SecurityIcon} alt="security" />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h6">Security</Typography>
                                    <Typography variant="body1">Tap to change your PIN.</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 3, color: 'primary.main', width: '60%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Stack direction="column" spacing={2}>
                                    <img src={InfoIcon} alt="info" height={30} width={30} />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h6">About us</Typography>
                                    <Typography variant="body1">Tap to get in contact with us.</Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ mt: 3, color: 'primary.main', width: '60%' }}>
                        <CardContent>
                            <Stack direction="row" spacing={3}>
                                <Stack direction="column" spacing={2}>
                                    <LogoutIcon />
                                </Stack>
                                <Stack direction="column" spacing={2}>
                                    <Typography variant="h6" onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                                        Logout
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Second Column (Paper Items) */}
                <Grid item xs={12} md={isZoomedIn ? 4 : 12} lg={isZoomedIn ? 4 : 12}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '10px 0 10px 0', color:"primary.main" }}> Recent Transactions </Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}
