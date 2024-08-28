import {Grid, Paper, Stack, Typography} from "@mui/material";
import {ClickableCard} from "../../../../shared/components/card/ClickableCard.tsx";
import SendMoneyIcon from "../../../../assets/images/drawable-hdpi/Send Money.png";
import PayBillIcon from "../../../../assets/images/drawable-hdpi/Paybill.png";
import TillIcon from "../../../../assets/images/drawable-hdpi/Till.png";
import {AccountBalance} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
const CARD_HEIGHT = 180;
const CARD_WIDTH = 250;

export default function Mpesa() {
    const navigate = useNavigate();
    const handleCardClick = (url) => {
        navigate(`/dashboard/${url}`);
    }
    return (
        <Paper
            sx={{
                p:2,
                m:2,
                textAlign: "center",
                color: 'primary.main',
                height: '100%',
                backgroundColor: 'secondary.lighter'
            }}
        >
            <Stack direction={'row'} sx={{mb:1}}>
                <Typography variant="h5" component="h2">M-PESA</Typography>
            </Stack>
            <Stack direction={'row'} spacing={2}>
                <ClickableCard
                    image={SendMoneyIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Send Money"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("m-pesa/send-money")}
                />
                <ClickableCard
                    image={PayBillIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Pay Bill"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("m-pesa/paybill")}
                />
                <ClickableCard
                    image={TillIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Till"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("m-pesa/till")}
                />
            </Stack>
        </Paper>
    )
}