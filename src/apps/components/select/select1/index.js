import React from 'react';
import './index.css';
import MenuItem from '@mui/material/MenuItem';
import { Select, ThemeProvider } from '@mui/material';
import { BootstrapInput, themeGrey } from '../../../tools/style';

export default function Select1({onChange, value}) {
    return <ThemeProvider theme={themeGrey}>
        <Select
            defaultValue='epreuve'
            inputProps={{
                name: 'pageExport',
                id: 'uncontrolled-native',
            }}
            onChange={onChange}
            input={<BootstrapInput />}
            value={value}
            MenuProps={{
                sx: {
                    '& .MuiMenuItem-root': {
                        '&:hover': {
                            backgroundColor: 'primary.main', // Modifier la couleur de fond au survol des options
                        },
                    },
                    '& .MuiMenuItem-root.Mui-selected': {
                        fontSize: '14px', // Réduire la taille du texte de l'élément sélectionné dans les options
                        backgroundColor: 'primary.main',
                    },
                },
            }}
            sx={{
                '& .MuiMenuItem-root': {
                    fontSize: '16px', // Taille de texte normale pour les options
                },
                '& .MuiMenuItem-root.Mui-selected': {
                    fontSize: '14px', // Réduire la taille du texte de l'élément sélectionné dans les options
                },
                '& .MuiSelect-select:not(.Mui-selected)': {
                    fontSize: '14px', // Réduire la taille du texte du Select lorsqu'il n'est pas sélectionné
                },
            }}
        >
            {/* <MenuItem value="auteur">Auteur</MenuItem> */}
            <MenuItem value="epreuve">Epreuve</MenuItem>
        </Select>
    </ThemeProvider>
};