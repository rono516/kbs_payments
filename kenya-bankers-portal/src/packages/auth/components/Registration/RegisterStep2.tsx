import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Step2Props {
    onNext: (data: any) => void;
    onBack: (data: any) => void;
    formData: any;
}

const RegisterStep2: React.FC<Step2Props> = ({ onNext, onBack, formData: initialFormData }) => {
    const [formData, setFormData] = useState({
        ...initialFormData,
        kin: initialFormData.kin || ['']
    });

    const handleKinChange = (index: number, value: string) => {
        const newKin = [...formData.kin];
        newKin[index] = value;
        setFormData({ ...formData, kin: newKin });
    };

    const addKin = () => {
        setFormData({ ...formData, kin: [...formData.kin, ''] });
    };

    const removeKin = (index: number) => {
        const newKin = formData.kin.filter((_: string, i: number) => i !== index);
        setFormData({ ...formData, kin: newKin });
    };

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields = ['postal_address', 'physical_address', 'secondary_phone_number', 'marital_status', 'gender', 'kin', 'profession'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                setError(`${field.replace(/_/g, ' ')} is required`);
                setTimeout(() => setError(''), 5000);
                return;
            }
        }
        onNext(formData);
    };
    useEffect(()=>{
        document.title = "Registration Step2";
    });

    return (
        <Stack
            sx={{
                backgroundColor: "secondary.lighter",
                height: "100vh",
                justifyContent: "center",
            }}
        >
            <Paper
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleNext}
                sx={{
                    margin: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    width: "500px",
                    backgroundColor: 'secondary.lighter',
                    overflow: "auto",
                }}
            >
                <Box sx={{ marginBottom: '20px' }} justifyContent="center">
                    <Typography variant="h4" sx={{ color: 'primary.main' }}>Step 2: Additional Details</Typography>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Typography>
                )}
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        id="postal_address"
                        label="Postal Address"
                        type="text"
                        variant="outlined"
                        value={formData.postal_address}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="physical_address"
                        label="Physical Address"
                        type="text"
                        variant="outlined"
                        value={formData.physical_address}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="secondary_phone_number"
                        label="Secondary Phone Number"
                        type="text"
                        variant="outlined"
                        value={formData.secondary_phone_number}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="marital_status"
                        label="Marital Status"
                        type="text"
                        variant="outlined"
                        value={formData.marital_status}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="marital_status_other"
                        label="Marital Status (Other)"
                        type="text"
                        variant="outlined"
                        value={formData.marital_status_other}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="gender"
                        label="Gender"
                        type="text"
                        variant="outlined"
                        value={formData.gender}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="gender_other"
                        label="Gender (Other)"
                        type="text"
                        variant="outlined"
                        value={formData.gender_other}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <Typography variant="h6" sx={{ color:'black' }}>Next of Kin</Typography>
                    {formData.kin.map((kin: string, index: number) => (
                        <Box key={index} display="flex" alignItems="center">
                            <TextField
                                fullWidth
                                label={`Kin ${index + 1}`}
                                type="text"
                                variant="outlined"
                                value={kin}
                                onChange={(e) => handleKinChange(index, e.target.value)}
                                sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                            />
                            <IconButton onClick={() => removeKin(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={addKin} startIcon={<AddIcon />} variant="contained">
                        Add Kin
                    </Button>
                    <TextField
                        fullWidth
                        id="notes"
                        label="Notes"
                        type="text"
                        variant="outlined"
                        value={formData.notes}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="historical_member_id"
                        label="Historical Member ID"
                        type="text"
                        variant="outlined"
                        value={formData.historical_member_id}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                    <TextField
                        fullWidth
                        id="profession"
                        label="Profession"
                        type="text"
                        variant="outlined"
                        value={formData.profession}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white', '& input': { color: 'black' } }}
                    />
                </Stack>
                <Box display="flex" justifyContent="space-between" marginTop="20px">
                    <Button onClick={onBack} size="large" sx={{ backgroundColor: 'grey.500', color: 'white' }}>
                        Back
                    </Button>
                    <Button type="submit" size="large" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
                        Next
                    </Button>
                </Box>
            </Paper>
        </Stack>
    );
};

export default RegisterStep2;
