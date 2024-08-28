import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import poster from "../../../../assets/images/drawable-hdpi/posters-05.png";
import poster2 from "../../../../assets/images/drawable-hdpi/posters-08.png";

export default function DepositForm() {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="body1">Deposit from my M-Pesa</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Amount (KES)"
                            variant="outlined"
                        />
                        <Button size="large" variant="contained" color="primary">
                            Transfer
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2}>
                        <img src={poster} alt="poster" style={{ width: '100%' }} />
                        <img src={poster2} alt="poster" style={{ width: '100%' }} />
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}
