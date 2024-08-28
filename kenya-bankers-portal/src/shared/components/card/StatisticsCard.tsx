import { Box, Card, CardContent, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/helper/helpers.tsx";

export default function StatisticsCard({ image, subText, value, currency, bgColor, color, icon, name, height, width, onClick }) {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: 10,
            borderRadius: 2,
            margin: '10px',
            flexWrap: 'wrap',
        }}>
            <Card
                sx={{
                    height: {
                        xs: 'auto',
                        sm: height,
                    },
                    width: {
                        xs: '100%',
                        sm: width,
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "left",
                    backgroundColor: bgColor,
                    color: color || "primary.main",
                    cursor: "pointer",
                    '&:hover': {
                        backgroundColor: bgColor
                    },
                    padding: {
                        xs: '4px',
                        sm: '5px',
                    },
                    boxShadow: 5,
                    borderRadius: 2,
                }}
                onClick={onClick}
            >
                <CardContent>
                    <Box sx={{
                        color: "primary.main",
                        display: 'flex',
                    }}>
                        <Typography variant="subtitle2" component="h2" sx={{ margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '14px' }}>{name}</Typography>
                        <Typography variant="caption" component="h2" sx={{ marginTop: 1, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{subText}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h3" component="h3" sx={{
                            margin: 0,
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            fontSize: '16px',
                            display: 'flex',
                            alignItems: 'baseline',
                        }}>
                            <Typography variant="body2" component="span" sx={{
                                color: 'primary.main',
                                marginRight: '4px',
                                fontSize: '14px',
                                lineHeight: '1',
                                position: 'relative',
                                top: {
                                    xs: '0px', // for extra small screens
                                    sm: '-12px', // for small and larger screens
                                },
                            }}>
                                {currency}
                            </Typography>
                            {formatCurrency(value)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
