

import { useNavigate } from 'react-router-dom'
import './login.css'
import LogoB from '../../components/logo/logoB';
import InputTest from '../../components/inputs/inputTest';
import CardLogin from '../../components/cards/cardLogin';
import { useState } from 'react';
import InputPassword from '../../components/inputs/inputPassword';
import Button2 from '../../components/buttons/button2/button2';
import axios from 'axios';



export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }) 
    const [formDataError, setFormDataError] = useState({
        email: '',
        password: ''
    }) 
    function onChange(e) {
        setFormDataError({...formDataError, email: '', password: ''})
        setFormData({...formData, [e.target.name]: e.target.value})
        setError(false)
    }
    const [error, setError] = useState(false)
    async function submit() {
        await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}user/login`,
            {user: formData}
        ).then(res => {
            if(res.data.status === 200){
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                navigate('/epreuve')
            }else{
                setFormDataError({...formDataError, email: ' ', password: ' '})
                setError(true)
            }
        }).catch()
    }
    return <div className="login-body">
        <LogoB/>
        <div className='login-card'>
            <CardLogin textHead="Connectez-vous">
                {error ? 
                    <span style={{color: 'red'}}>Information incorrect</span> : ''
                }
                <InputTest
                    label="Adresse mail"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required={true}
                    errorText={formDataError.email}
                    error={formDataError.email ? true : false}
                />
                <InputPassword
                    label="Mot de passe"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required={true}
                    errorText={formDataError.password}
                    error={formDataError.password ? true : false}
                />
                <Button2 textContent="Je me connecte" onClick={submit}/>
                <a
                    href='/inscription'
                    style={{marginTop: '10px'}}
                >Vous n'avez pas de compte ?</a>
            </CardLogin>
        </div>
    </div>
}