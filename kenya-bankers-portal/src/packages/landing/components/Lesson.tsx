import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import * as React from "react";
import { VideoCard } from "../../../shared/components/card/VideoCard.tsx";

const CARD_HEIGHT = 200;
const CARD_WIDTH = 300;

export default function Lesson() {
    return (
        <Paper
            sx={{
                padding: 2,
                margin: 2,
                color: 'primary.main',
                height: 'auto',
                backgroundColor: 'secondary.lighter',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <Box sx={{ width: '80%' }}>
                <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="h5" component="h2">My Lessons</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ArrowBack />}
                        onClick={() => window.history.back()}
                    >
                        Back
                    </Button>
                </Stack>
                <Grid container spacing={3} >
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to borrow loans</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to access overdrafts</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to pay utilities</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to buy airtime</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to be a guarantor</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to ask for a guarantor</Typography>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h2">I have watched</Typography>
                <Grid container spacing={3} sx={{ mt: 1, }}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <VideoCard height={CARD_HEIGHT} width={CARD_WIDTH} image={undefined} name={undefined} onClick={undefined} />
                        <Typography variant="body1" align="center">How to borrow loans</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
