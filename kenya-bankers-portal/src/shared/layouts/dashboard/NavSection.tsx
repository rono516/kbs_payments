import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import Iconify from "../../components/Iconify.tsx";
//

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: "#1C355E",
    borderRadius: theme.shape.borderRadius,
    fontWeight: 600,
    '&:hover': {
        textDecoration: 'none',
        backgroundColor: 'background.neutral',
        color:'background.paper'
    },
}));

const ListItemIconStyle = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
    item: PropTypes.object,
    active: PropTypes.func,
};

function NavItem({ item, active }) {
    const theme = useTheme();

    const isActiveRoot = active(item.path);

    const { title, path, icon, info, children,image } = item;

    const [open, setOpen] = useState(isActiveRoot);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const activeRootStyle = {
        color: 'primary.main',
        fontWeight: 'fontWeightMedium',
        bgcolor: 'background.neutral',
    };

    const activeSubStyle = {
        color: 'action.warning.main',
        fontWeight: 'fontWeightMedium',
    };

    if (children) {
        return (
            <>
                <ListItemStyle
                    onClick={handleOpen}
                    sx={{
                        ...(isActiveRoot && activeRootStyle),
                    }}
                >
                    <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                    {info && info}
                    <Iconify
                        icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
                        sx={{ width: 16, height: 16, ml: 1 }}
                    />
                </ListItemStyle>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {children.map((item) => {
                            const { title, path } = item;
                            const isActiveSub = active(path);

                            return (
                                <ListItemStyle
                                    key={title}
                                    component={RouterLink}
                                    to={path}
                                    sx={{
                                        ...(isActiveSub && activeSubStyle),
                                    }}
                                >
                                    <ListItemIconStyle>
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 4,
                                                height: 4,
                                                display: 'flex',
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: 'error.main',
                                                transition: (theme) => theme.transitions.create('transform'),
                                                ...(isActiveSub && {
                                                    transform: 'scale(2)',
                                                    bgcolor: 'error.main',
                                                }),
                                            }}
                                        />
                                    </ListItemIconStyle>
                                    <ListItemText disableTypography primary={title} />
                                </ListItemStyle>
                            );
                        })}
                    </List>
                </Collapse>
            </>
        );
    }

    return (
        <ListItemStyle
            component={RouterLink}
            to={path}
            sx={{
                ...(isActiveRoot && activeRootStyle),
            }}
        >
            <ListItemIconStyle>
                <img src={image} alt={title} style={{ width: 'auto', height: 22 }} />
            </ListItemIconStyle>
            <ListItemText disableTypography primary={title} />
            {info && info}
        </ListItemStyle>
    );
}

NavSection.propTypes = {
    navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, ...other }) {
    const { pathname } = useLocation();

    const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

    return (
        <Box {...other}>
            <List disablePadding sx={{ p: 1 }}>
                {navConfig.map((item) => (
                    <NavItem sx={{color: '#fff'}} key={item.title} item={item} active={match} />
                ))}
            </List>
        </Box>
    );
}
