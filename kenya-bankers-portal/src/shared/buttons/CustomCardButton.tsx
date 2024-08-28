import { Button, styled } from "@mui/material";

const CustomCardButton = styled(Button)(({ theme }) => ({
    // a 4 by 4 card button
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
    ...theme.typography.body2,
    borderRadius: 20,
    '&:hover': {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.primary.main,
    },
    //active
    '&:active': {
        backgroundColor: "#fff",
        color: theme.palette.primary.main,
    },
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',
}));

export default CustomCardButton;
