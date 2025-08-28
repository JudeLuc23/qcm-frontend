

import { useNavigate } from 'react-router-dom'
import '../login/login.css'
import { useState } from 'react';
import LogoB from '../../components/logo/logoB';
import CardLogin from '../../components/cards/cardLogin';
import InputTest from '../../components/inputs/inputTest';
import InputPassword from '../../components/inputs/inputPassword';
import Button2 from '../../components/buttons/button2/button2';
import { regexEMAIL } from '../../regex/regex';
import axios from 'axios'



export default function Inscription() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nom: ''
    }) 
    const [formDataError, setFormDataError] = useState({
        email: '',
        password: '',
        nom: ''
    }) 
    function onChange(e) {
        switch(e.target.name){
            case'nom':
                setFormDataError({...formDataError, nom: ''})
            break
            case 'email':
                setFormDataError({...formDataError, email: ''})
            break
            default:
                setFormDataError({...formDataError, password: ''})
            break
        }
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    async function handleSubmit() {
        let e = false, n = false, p = false
        if(formData.nom.trim().length <= 1){
            n = true;
        }
        if(!regexEMAIL.test(formData.email.trim())){
            e = true;
        }
        if((formData.password.trim().length < 8) || (formData.password.trim().length > 12)){
            p = true;
        }
        if(n || e || p){
            setFormDataError({
                ...formDataError,
                nom: n ? 'Ce champ doit contenir 2 à 20 cractères.' : '',
                email: e ? 'Ce champ doit contenir une adresse mail valide.' : '',
                password: p ? 'Ce champ doit contenir 8 à 12 cractères.' : ''
            })
        }else{
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}auteur/inscription`,
                {data: formData}
            ).then(res => {
                if(res.data.status === 200){
                    sessionStorage.setItem('user', JSON.stringify(res.data.user))
                    navigate('/epreuve')
                }else{
                    
                    alert('Verifier les champs')
                }
            }).catch(err => console.error(err))
        }
    }
    return <div className="login-body">
        <LogoB/>
        <div className='login-card'>
            <CardLogin textHead="Créer un compte">
                <InputTest
                    label="Nom"
                    name="nom"
                    value={formData.nom}
                    onChange={onChange}
                    errorText={formDataError.nom}
                    error={formDataError.nom ? true : false}
                    required={true}
                />
                <InputTest
                    label="Adresse mail"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    errorText={formDataError.email}
                    error={formDataError.email ? true : false}
                    required={true}
                />
                <InputPassword
                    label="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    errorText={formDataError.password}
                    error={formDataError.password ? true : false}
                    required={true}
                />
                <Button2
                    textContent="Créer mon compte"
                    onClick={handleSubmit}
                />
                <a
                    href='/login'
                    style={{marginTop: '10px'}}
                >Vous avez un compte ?</a>
            </CardLogin>
        </div>
    </div>
}