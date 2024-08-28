import { useEffect, useState } from 'react';
import { Badge, Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api';

export default function AccountProfile() {
    const navigate = useNavigate();
    const member_id = localStorage.getItem("sacco_user_id");
    const first_name = localStorage.getItem("first_name");
    const middle_name = localStorage.getItem("middle_name");
    const last_name = localStorage.getItem("last_name");
    const acc_number = localStorage.getItem('fosa_account_number');
    const state = localStorage.getItem("state");

    // State to store the FOSA balance
    const [fosaBalance, setFosaBalance] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the latest FOSA balance using the account number
        const fetchFosaBalance = async () => {
            try {
                const response = await axios.get(`${baseUrl}/show_savings/${acc_number}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Assuming the balance is returned in the response data
                const savingsData = response.data?.data?.attributes;
                const balance = savingsData?.available_balance;

                // Set the fetched balance in the state
                if (balance !== undefined) {
                    setFosaBalance(balance);
                } else {
                    console.error("Error: Balance not found in response");
                }
            } catch (error) {
                console.error("Error fetching FOSA balance", error);
            }
        };

        fetchFosaBalance();
    }, [acc_number]); // Dependency array ensures this runs when acc_number changes

    // Placeholder for profile image
    const ProfileImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    return (
        <Card
            sx={{
                padding: '2px 2px 0 2px',
                margin: '2px 2px 0 2px',
                borderRadius: 3,
                color: 'primary.main',
                boxShadow: 'none',
            }}
        >
            <CardContent sx={{ padding: 2 }}>
                <Stack direction="column" spacing={2} alignItems="left">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <img src={ProfileImage} alt="Profile" style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <Typography variant="h6">
                            {first_name && middle_name && last_name ? `${first_name} ${middle_name} ${last_name}` : "Loading..."}
                        </Typography>
                    </Stack>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body2">
                            F.O.S.A Bal: KES {fosaBalance !== null ? Number(fosaBalance).toLocaleString() : "Loading..."}
                        </Typography>
                        <Typography variant="body2">
                            Member ID: {member_id}
                        </Typography>
                        <Typography variant="body2">
                            Status: <Chip color='primary' size="small" label={state ? state : "Loading..."} />
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}
