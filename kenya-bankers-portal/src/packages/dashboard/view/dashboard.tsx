import React, { useState } from 'react';
import { Grid, Paper, Typography, useTheme, useMediaQuery, Menu, MenuItem } from "@mui/material";
import { ClickableCard } from "../../../shared/components/card/ClickableCard.tsx";
import { AccountBalance, MoveDown, CurrencyExchange, Payments, AccountBalanceWallet, RequestQuote } from "@mui/icons-material";
import TransferImage from "../../../assets/images/drawable-hdpi/transfers-1.png";
import OnlinePaymentsImage from "../../../assets/images/drawable-hdpi/onlinepayments.png"
import FosaImage from "../../../assets/images/drawable-hdpi/Group -90.png";
import MpesaImage from "../../../assets/images/drawable-hdpi/withdraw-1.png";
import DepositImage from "../../../assets/images/drawable-hdpi/Group -80.png";
import StatementImage from "../../../assets/images/drawable-hdpi/Group -34.png";
import StandingOrderImage from "../../../assets/images/drawable-hdpi/Group -40.png";
import RecentTransactions from "../components/RecentTransactions.tsx";
import AccountProfile from "../components/AccountProfile.tsx";
import TransferDropdown from '../components/Transfer/TransferDropdown.tsx';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchoredEl, setAnchoredEl] = useState<null | HTMLElement>(null);

    // Updated handleCardClick function with correct event typing
    const handleCardClick = (event: React.MouseEvent<HTMLElement>, url: string) => {
        if (url === 'transfers') {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }else if (url === 'online-payments'){
            setAnchoredEl(anchoredEl ? null : event.currentTarget);
        }else {
            navigate(`/dashboard/${url}`);
        }
    };

    // Handle menu item click to navigate
    const handleMenuItemClick = (path: string) => {
        setAnchorEl(null);
        navigate(`/dashboard/${path}`);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setAnchoredEl(null);
    };

    const cardData = [
        { image: FosaImage, icon: <AccountBalance fontSize="large" />, name: "Front Office", url: "fosa-account" },
        { image: TransferImage, icon: <MoveDown fontSize="large" />, name: "Transfers", url: "transfers" },
        { image: MpesaImage, icon: <CurrencyExchange fontSize="large" />, name: "M-Pesa", url: "m-pesa" },
        { image: DepositImage, icon: <Payments fontSize="large" />, name: "Deposits", url: "deposit" },
        { image: StatementImage, icon: <AccountBalanceWallet fontSize="large" />, name: "Statements", url: "statements" },
        { image: StandingOrderImage, icon: <RequestQuote fontSize="large" />, name: "STO", url: "standing-orders" },
        { image: OnlinePaymentsImage, icon: <RequestQuote fontSize="large" />, name: "", url: "online-payments" },
    ];

    return (
        <Paper sx={{ padding: '2x 2px 0 2px', margin: '2x 2px 0 2px', height: '100%', }}>
            <Grid container spacing={5}>
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter' }}>
                    <Grid container spacing={5}>
                        {cardData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <ClickableCard
                                    image={card.image}
                                    icon={card.icon}
                                    name={card.name}
                                    height="180"
                                    width="auto"
                                    onClick={(event) => handleCardClick(event, card.url)}
                                />
                                {card.url === 'transfers' && (
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => handleMenuItemClick('internal-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Internal Transfer
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('bank-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Bank Transfer
                                        </MenuItem>
                                    </Menu>
                                )}
                                {card.url === 'online-payments' && (
                                    <Menu
                                        anchorEl={anchoredEl}
                                        open={Boolean(anchoredEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={() => handleMenuItemClick('paypal-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Paypal
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('credit-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Visa Card
                                        </MenuItem>
                                        <MenuItem onClick={() => handleMenuItemClick('credit-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Master Card
                                        </MenuItem>
                                        {/* <MenuItem onClick={() => handleMenuItemClick('bank-transfer')} sx={{color:'primary.main', fontWeight: 'bold'}}>
                                            Swift
                                        </MenuItem> */}
                                    </Menu>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <AccountProfile />
                    <Typography variant="h6" sx={{ padding: '20px 0 10px', color:"primary.main" }}>Recent Transactions</Typography>
                    <RecentTransactions />
                </Grid>
            </Grid>
        </Paper>
    );
}