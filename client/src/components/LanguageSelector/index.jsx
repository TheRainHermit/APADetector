import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
    Button, 
    Menu, 
    MenuItem, 
    Box, 
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

const LanguageSelector = ({ fullWidth = false }) => {
    const { language, changeLanguage } = useLanguage();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageSelect = (lang) => {
        changeLanguage(lang);
        handleClose();
    };

    const languages = [
        { code: 'es', name: 'Español' },
        { code: 'en', name: 'English' }
    ];

    const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

    return (
        <Box sx={{ 
            width: fullWidth ? '100%' : 'auto',
            display: 'flex', 
            alignItems: 'center' 
        }}>
            <Button
                id="language-button"
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<LanguageIcon />}
                endIcon={<ExpandMoreIcon />}
                color="inherit"
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                    textTransform: 'none',
                    width: fullWidth ? '100%' : 'auto',
                    justifyContent: fullWidth ? 'space-between' : 'flex-start',
                    px: fullWidth ? 2 : 1,
                }}
            >
                {currentLanguage.name}
            </Button>
            <Menu
                id="language-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'language-button',
                    sx: {
                        minWidth: 150,
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        selected={language === lang.code}
                        dense
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            {language === lang.code && <CheckIcon fontSize="small" />}
                        </ListItemIcon>
                        <ListItemText 
                            primary={lang.name} 
                            primaryTypographyProps={{
                                variant: 'body2',
                                color: language === lang.code ? 'primary' : 'textPrimary',
                                fontWeight: language === lang.code ? 600 : 'normal',
                            }}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default LanguageSelector;
