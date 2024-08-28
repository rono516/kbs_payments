import React, { useState } from 'react';
import DashboardSidebar from './dashboardSidebar';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../../assets/new-logo.webp';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    color: '#000',
});

const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    padding: "20px 20px 0 0",
    marginTop: APP_BAR_DESKTOP - 30,
    [theme.breakpoints.down('sm')]: {
        marginTop: APP_BAR_MOBILE,
    },
    backgroundColor: '#fff',
}));

const AppBarStyle = styled(AppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#fff',
    boxShadow: 'none',
}));

export default function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isDesktop = useResponsive('up', 'lg', 'lg', 'xl');

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <RootStyle>
            <AppBarStyle position="fixed">
                <Toolbar>
                    {isDesktop ? null : (
                        <IconButton
                            color="inherit"
                            aria-label="open sidebar"
                            edge="start"
                            onClick={handleSidebarToggle}
                            sx={{ mr: 1 }}
                        >
                            <MenuIcon sx={{color:'primary.main'}}/>
                        </IconButton>
                    )}
                    <img src={Logo} alt="logo" style={{ width: 'auto', maxHeight: APP_BAR_DESKTOP }} />
                </Toolbar>
            </AppBarStyle>
            <DashboardSidebar isOpenSidebar={isSidebarOpen} onCloseSidebar={() => setIsSidebarOpen(false)} />
            <MainStyle>
                <Outlet />
            </MainStyle>
        </RootStyle>
    );
}
