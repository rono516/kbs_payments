import {Box, Button, Stack, styled, Typography} from "@mui/material";
import BuyAirtimeCard from "../../../assets/images/drawable-hdpi/Buy Airtime.png";
import BuyDataCard from "../../../assets/images/drawable-hdpi/Buy Data.png";
import KplcPrepaidCard from "../../../assets/images/drawable-hdpi/KPLC Prepaid.png";
import WaterCard from "../../../assets/images/drawable-hdpi/Nairobi Water.png";
import PaybillCard from "../../../assets/images/drawable-hdpi/Pay Bill.png";
import logo from "../../../assets/new-logo.webp";
import FooterImg from "../../../assets/footer.png";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Landing() {
    const LandingPage = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
    }));
    const navigate=useNavigate()
    const handleClick = (path: string) => {
        navigate(path)
    }
    return (
        <LandingPage>
            <Box>
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                    spacing={3}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box component="img" src={BuyAirtimeCard} alt="Airtime" sx={{maxWidth: '100%', height: 'auto'}}/>
                    <Box component="img" src={BuyDataCard} alt="bundles" sx={{maxWidth: '100%', height: 'auto'}}/>
                    <Box component="img" src={KplcPrepaidCard} alt="kplc" sx={{maxWidth: '100%', height: 'auto'}}/>
                    <Box component="img" src={WaterCard} alt="water" sx={{maxWidth: '100%', height: 'auto'}}/>
                    <Box component="img" src={PaybillCard} alt="bill" sx={{maxWidth: '100%', height: 'auto'}}/>
                </Stack>
                <Stack direction="column" spacing={4} sx={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: 7,
                    marginBottom: 4,
                    flexGrow: 1,
                }}>
                    <Stack sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Box component="img" src={logo} alt="logo" sx={{width: '20%', height: 'auto'}}/>
                    </Stack>
                    <Box marginTop={4}>
                        <Typography sx={{cursor: "pointer"}} onClick={() => handleClick("/auth/login")} color="primary">
                            Login
                        </Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Typography color="primary">Or</Typography>
                    </Box>
                    <Box marginTop={4}>
                        <Button onClick={() => handleClick('/auth/register')} sx={{padding: 2}} variant="contained"
                                color="primary">
                            Become a Member
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <footer style={{position: 'fixed', bottom: '0', width: '100%', margin: '0px'}}>
                <img src={FooterImg} alt="Footer" style={{width: '100%', height: 'auto'}}/>
            </footer>
        </LandingPage>
    );
}