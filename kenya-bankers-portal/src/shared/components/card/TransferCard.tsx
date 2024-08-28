import React from 'react';
import {Box, Button, Card, CardContent, Stack, Typography} from "@mui/material";
import {formatCurrency} from "../../utils/helper/helpers.tsx";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TransferCard = ({ subText, amount, currency,name, onClick,height, width,showButton, showDeposit, showRepay, buttonText,buttonIcon, onDeposit, onRepay }) => (
    <Card
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        sx={{ height, width,color:'primary.main'}}
    >
        <CardContent>
            <Stack>
                <Typography variant="h6">{name}</Typography>
            </Stack>
            <Stack>
                <Typography variant="body1" color="secondary.light">{subText}</Typography>
            </Stack>
            <Box>
                <Typography variant="h3" component="h3" sx={{
                    margin: 0,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'baseline',
                    color: 'warning.main',
                }}>
                    <Typography variant="body2" component="span" sx={{
                        marginRight: '4px',
                        fontSize: '14px',
                        lineHeight: '1',
                        position: 'relative',
                        top: {
                            xs: '0px',
                            sm: '-12px',
                        },
                    }}>
                        {currency}
                    </Typography>
                    {formatCurrency(amount)}
                </Typography>
            </Box>
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
                {showButton && (
                    <Box>
                        <Button
                            size="small"
                            color="primary"
                            aria-label="view"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRepay();
                            }}
                            variant="contained"
                        >
                            {buttonText!=null? buttonText:'Repay'} &nbsp; {buttonIcon!=null? buttonIcon:<RemoveRedEyeIcon/>}
                        </Button>
                    </Box>
                )}
                {showRepay && (
                    <Box>
                        <Button
                            size="small"
                            color="primary"
                            aria-label="view"
                            onClick={onClick}
                            variant="contained"
                        >
                            Details
                        </Button>
                    </Box>
                )}
                {showDeposit && (
                    <Box>
                        <Button
                            size="small"
                            color="primary"
                            aria-label="deposit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeposit();
                            }}
                            variant="contained"
                        >
                            {buttonText!=null? buttonText:'Deposit'} <AttachMoneyIcon sx={{ ml: 2 }} />
                        </Button>
                    </Box>
                )}
            </Stack>
        </CardContent>
    </Card>

);