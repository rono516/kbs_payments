import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {ArrowBack} from "@mui/icons-material";

export default function LoanStatement() {
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
            <Stack spacing={3} direction="row" sx={{mb:2}}>
                <Typography variant="h5" component="h2">Loan Statement</Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBack />}
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>
            </Stack>
            <Card>
                <CardHeader
                    subheader="Please select the period for which you would like the statement"
                />
                <CardContent>
                    <Stack spacing={2} direction="column">
                        <TextField
                            id="start-date"
                            label="Start Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                        <TextField
                            id="end-date"
                            label="End Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                backgroundColor:'white',
                                '& input': {
                                    color: 'black',
                                } 
                            }}
                        />
                    </Stack>
                    <Box sx={{mt:5}}>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Send To Email
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Paper>
    );
}