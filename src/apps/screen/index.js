
import { useNavigate } from 'react-router-dom'
import Button1 from '../components/buttons/button1'
import './index.css'
import LogoB from '../components/logo/logoB';


export default function Accueil() {
    const navigate = useNavigate();
    function passer() {
        navigate('/all')
    }
    function definir() {
        if(sessionStorage.getItem('user')){
            navigate('/epreuve')
        }else{
            navigate('/login')
        }
    }
    return <div className="accueil-body">
        <LogoB/>
        <h2>
            <b>
                Bienvenue dans votre programme d'évaluation au moyen de QCM
            </b>
        </h2>
        <div className='accueil-btns'>
            <Button1
                textContent="Passer une évaluation"
                onClick={passer}
            />
            <Button1
                textContent="Définir une évaluation"
                onClick={definir}
            />
        </div>
    </div>
}