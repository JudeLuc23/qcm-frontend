import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './menu1.css';
import { FormGroup, ThemeProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { COLOR, themeGrey } from '../../../tools/style';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu1({
    anchorEl,
    handleClick,
    handleClose
}) {
    const open = Boolean(anchorEl);
    const location = useLocation();
    return (
        <ThemeProvider theme={themeGrey}>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'primary.main', // Modifier la couleur de fond du bouton au survol
                            color: 'primary.contrastText', // Modifier la couleur du texte du bouton au survol
                        }
                    }}
                >
                    <MenuIcon sx={{color: "#000000"}} />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        sx: {
                            '& .MuiMenuItem-root': {
                                '&:hover': {
                                    backgroundColor: 'primary.main', // Modifier la couleur de fond ici
                                },
                            },
                        },
                    }}
                >
                    
                    <MenuItem onClick={handleClose} id='auteur'>Employé</MenuItem>
                    <FormGroup>
                        <MenuItem onClick={handleClose} id='addDem'>Solliciteur de service</MenuItem>
                        <MenuItem onClick={handleClose} id='addTut'>Tuteur</MenuItem>
                    </FormGroup>
                </Menu>
            </div>
        </ThemeProvider>
    );
};
