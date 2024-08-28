import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';

const baseUrl = 'http://127.0.0.1:8000/api';

const CreateMember: React.FC = () => {
    const [formData, setFormData] = useState({
        picture: null as File | null
    });

    const handlefileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setFormData({
                picture: files[0] || null
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        
        if (formData.picture) {
            data.append('picture', formData.picture);
        }

        try {
            await axios.post(`${baseUrl}/create-member/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Member created successfully!');
        } catch (error) {
            console.error('Error creating member:', error);
            alert('Failed to create member.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6">Create Member</Typography>
            <input type="file" name="picture" onChange={handlefileChange} />
            <Button type="submit" variant="contained" color="primary">Create Member</Button>
        </form>
    );
};

export default CreateMember;
