import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import navLinks from './NavLinks';
import NavSection from './NavSection';
import Scrollbar from '../../components/Scrollbar';

const DRAWER_WIDTH = 200;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
    },
}));

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg', 'lg', 'xl');

    useEffect(() => {

    }, [pathname, isOpenSidebar, onCloseSidebar]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <NavSection navConfig={navLinks} />
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <RootStyle>
            {isDesktop ? (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            bgcolor: 'background.paper',
                            borderRightStyle: 'none',
                            position: 'fixed',
                            top: APP_BAR_DESKTOP,
                            height: `calc(100% - ${APP_BAR_DESKTOP}px)`,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            ) : (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: {
                            width: DRAWER_WIDTH,
                            borderRightStyle: 'none',
                            position: 'fixed',
                            top: APP_BAR_MOBILE+30,
                            height: `calc(100% - ${APP_BAR_MOBILE}px)`,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
}
