import { InputBase, createTheme, styled } from "@mui/material";

export const COLOR = {
    head: '#2F4F4F'
}
export const themeGrey = createTheme({
    palette: {
        primary: {
        main: '#e8e8e8', // Couleur principale
        light: '#acacac', // Couleur claire pour le survol
        contrastText: '#fff', // Couleur du texte en contraste
        },
    },
});
export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 50,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #ced4da',
        //   fontSize: 16,
        padding: '1px 1px 1px 5px',
        boxShadow: '0px 0px 5px #ced4da',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        height: '5px',
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 50,
            // outline: 'none',
            // borderColor: '#80bdff',
            // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
        // '&:hover': {
        //     backgroundColor: '#e8e8e8'
        // }
    },
}));