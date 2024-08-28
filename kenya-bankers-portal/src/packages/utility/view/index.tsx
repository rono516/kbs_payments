import {Grid, Paper, Typography} from "@mui/material";
import { ClickableCard } from "../../../shared/components/card/ClickableCard.tsx";
import { AccountBalance, MoveDown, CurrencyExchange, Payments, AccountBalanceWallet, Description } from "@mui/icons-material";
import AppleMusicIcon from "../../../assets/images/drawable-hdpi/Group -56.png";
import AmazonPrimeIcon from "../../../assets/images/drawable-hdpi/Group -55.png";
import NetflixIcon from "../../../assets/images/drawable-hdpi/Group -53.png";
import KplcIcon from "../../../assets/images/drawable-hdpi/Group 130.png";
import DstvIcon from "../../../assets/images/drawable-hdpi/Group 132.png";
import zukuIcon from "../../../assets/images/drawable-hdpi/Group 131.png";
import WaterBillIcon from "../../../assets/images/drawable-hdpi/waterbill-1.png";
import BuyAirtimeIcon from "../../../assets/images/drawable-hdpi/buy_airtime-1.png";
import { useNavigate } from "react-router-dom";
import RecentTransactions from "../../dashboard/components/RecentTransactions.tsx";
import AccountProfile from "../../dashboard/components/AccountProfile.tsx";

export default function Utility() {
    const navigate = useNavigate();
    const handleCardClick = (card) => {
        const minimalState = { name: card.name, description:card.description };
        console.log("Card clicked:", card);
        navigate(card.url , { state: minimalState });
    };
    const cardData = [
        { image: BuyAirtimeIcon, icon: <AccountBalance fontSize="large" />, name: "BUY AIRTIME", url: "/dashboard/m-pesa/paybill", description: "Buy Airtime" },
        { image: KplcIcon, icon: <MoveDown fontSize="large" />, name: "KPLC PREPAID", url: "/dashboard/m-pesa/paybill", description: "KPLC PREPAID" },
        { image: WaterBillIcon, icon: <CurrencyExchange fontSize="large" />, name: "WATER BILL", url: "/dashboard/m-pesa/paybill", description: "WATER BILL" },
        { image: zukuIcon, icon: <Payments fontSize="large" />, name: "ZUKU", url: "/dashboard/m-pesa/paybill", description: "Pay ZUKU" },
        { image: KplcIcon, icon: <Payments fontSize="large" />, name: "KPLC POSTPAID", url: "/dashboard/m-pesa/paybill", description: "KPLC POSTPAID" },
        { image: DstvIcon, icon: <AccountBalanceWallet fontSize="large" />, name: "DSTV", url: "/dashboard/m-pesa/paybill", description: "Pay DSTV" },
        { image: NetflixIcon, icon: <AccountBalanceWallet fontSize="large" />, name: "NETFLIX", url: "/dashboard/m-pesa/paybill", description: "Pay NETFLIX" },
        { image: AmazonPrimeIcon, icon: <AccountBalanceWallet fontSize="large" />, name: "AMAZON PRIME", url: "/dashboard/m-pesa/paybill", description: "AMAZON PRIME" },
        { image: AppleMusicIcon, icon: <AccountBalanceWallet fontSize="large" />, name: "APPLE MUSIC", url: "/dashboard/m-pesa/paybill", description: "APPLE MUSIC" },
    ];

    return (
        <Paper
            sx={{
                // textAlign: "center",
                color: 'primary.main',
                height: '100%',
            }}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} sx={{ backgroundColor: 'secondary.lighter' }}>
                    <Grid container spacing={3}>
                        {cardData.map((card, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <ClickableCard
                                    image={card.image}
                                    icon={card.icon}
                                    name={card.name}
                                    height="250"
                                    width="auto"
                                    onClick={() => handleCardClick(card)}
                                />
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