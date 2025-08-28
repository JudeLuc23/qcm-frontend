import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Menu1 from '../menu/menu1/menu1';
import Select1 from '../select/select1';
import axios from 'axios';

export default function InputSearch1({changeData}) {
    const [anchorEl, setAnchorEl] = React.useState('epreuve');
    function handleClick(e) {
        setAnchorEl(e.target.value);
    };
    const [valSearch, setValSearch] = React.useState('')
    async function changeSearchVal(e) {
        setValSearch(e.currentTarget.value)
        switch(anchorEl){
            case 'auteur':
                await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}questionnaire/getAll/${anchorEl}`
                ).then(res => {
                    if(!(res.data.status === 200)){
                        alert("ERREUR : Une erreur est survenue")
                    }
                }).catch()
            break;
            case 'epreuve':
                if(e.currentTarget.value){
                    await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL}questionnaire/getAll/${e.currentTarget.value}`
                    ).then(res => {
                        if(res.data.status === 200){
                            changeData(res.data.epreuves)
                        }else{
                            alert("ERREUR : Une erreur est survenue")
                        }
                    }).catch()
                }
            break;
            default:
            break;
        }
    }
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '20rem',
                marginBottom: '5rem'
            }}
        >
            {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
                
            </IconButton> */}
            <Select1 onChange={handleClick} value={anchorEl} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Rechercher..."
                inputProps={{ 'aria-label': 'rechercher' }}
                onChange={changeSearchVal}
                value={valSearch}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
        </Paper>
    );
}
