import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    Box,
    Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import './Navbar.css';
import useT from '../../i18n/useT';
import LanguageSelector from '../LanguageSelector';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const t = useT();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'home', path: '/' },
        { text: 'analyze', path: '/analyze' },
        { text: 'about', path: '/about' },
        { text: 'contact', path: '/contact' },
    ];

    const drawer = (
        <Box 
            sx={{ width: 250 }} 
            role="presentation" 
            onClick={(e) => e.stopPropagation()}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" component="div">
                    {t('menu')}
                </Typography>
                <IconButton 
                    onClick={handleDrawerToggle}
                    aria-label={t('closeMenu')}
                    edge="end"
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={Link}
                        to={item.path}
                        onClick={handleDrawerToggle}
                    >
                        <ListItemText primary={t(item.text)} />
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                <ListItem>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LanguageIcon color="action" />
                        <LanguageSelector fullWidth />
                    </Box>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" elevation={1} color="default">
            <Toolbar>
                <img 
                    src="/APAicon.png" 
                    alt={t('appTitle')} 
                    width={40} 
                    height={40}
                    style={{ marginRight: '10px' }}
                />
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 700,
                        '&:hover': {
                            color: 'primary.main'
                        }
                    }}
                >
                    {t('appTitle')}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {!isMobile && (
                        <>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.text}
                                        color="inherit"
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            textTransform: 'none',
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                            }
                                        }}
                                    >
                                        {t(item.text)}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{ ml: 1 }}>
                                <LanguageSelector />
                            </Box>
                        </>
                    )}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
                            edge="end"
                            onClick={handleDrawerToggle}
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </IconButton>
                    )}
                </Box>
            </Toolbar>

            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;