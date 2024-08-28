import React, { useState } from 'react';
import { Menu, MenuItem, Button, Divider, ListItemIcon, ListItemText } from '@mui/material';
import InternalTransfer from "./InternalTransfer.tsx";
import BankTransfer from "./BankTranfer.tsx";

interface TransferDropdownProps {
    anchorEl: null | HTMLElement;
    onClose: () => void;
}

const TransferDropdown: React.FC<TransferDropdownProps> = ({ anchorEl, onClose }) => {
    const open = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => { /* Add your logic for InternalTransfer */ onClose(); }}>
                <ListItemIcon>
                    <InternalTransfer />
                </ListItemIcon>
                <ListItemText primary="Internal Transfer" />
            </MenuItem>
            <MenuItem onClick={() => { /* Add your logic for BankTransfer */ onClose(); }}>
                <ListItemIcon>
                    <BankTransfer />
                </ListItemIcon>
                <ListItemText primary="Bank Transfer" />
            </MenuItem>
        </Menu>
    );
};

export default TransferDropdown;

