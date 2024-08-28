import * as React from 'react';
import Grid from '@mui/material/Grid';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";

export default function RepayLoanForm(){
    return (
        <Box sx={{ minWidth: '100%'}}>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body1">Deposit from my M-Pesa</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Amount (KES)"
                            variant="outlined"
                        />
                    </Stack>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button size="large" variant="contained" color="primary">Transfer</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction={"row"}>
                        <img src={poster} alt="poster" style={{width: '100%'}}/>
                        <img src={poster2} alt="poster" style={{width: '100%'}}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}
