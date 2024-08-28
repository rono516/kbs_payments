import {Grid, Paper, Stack, Typography} from "@mui/material";
import {ClickableCard} from "../../../../shared/components/card/ClickableCard.tsx";
import {AccountBalance} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import GuarantorIcon from "../../../../assets/images/drawable-hdpi/guarantor.png"
import GuaranteeIcon from "../../../../assets/images/drawable-hdpi/guarantee statement.png"
import AccountStatementIcon from "../../../../assets/images/drawable-hdpi/Statements.png"
import LoanStatementIcon from "../../../../assets/images/drawable-hdpi/Group -32.png"
const CARD_HEIGHT = 180;
const CARD_WIDTH = 250;

export default function Statement() {
    const navigate = useNavigate();
    const handleCardClick = (url) => {
        navigate(`/dashboard/${url}`);
    }
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
            <Stack direction={'row'} sx={{mb:1}}>
                <Typography variant="h5" component="h2">Statements</Typography><br/>
            </Stack>

            <Typography variant="body1">I want to view my</Typography>
            <Stack direction={'row'} spacing={2}>
                <ClickableCard
                    image={GuarantorIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Guarantor Statement"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("statements/guarantors")}
                />
                <ClickableCard
                    image={GuaranteeIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Guarantee Statement"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("statements/guarantees")}
                />
                <ClickableCard
                    image={AccountStatementIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Account Statement"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("statements/account")}
                />
                <ClickableCard
                    image={LoanStatementIcon}
                    icon={<AccountBalance fontSize="large" />}
                    name="Loan Statement"
                    height={CARD_HEIGHT}
                    width={CARD_WIDTH}
                    onClick={()=>handleCardClick("statements/loans")}
                />
            </Stack>
        </Paper>
    )
}