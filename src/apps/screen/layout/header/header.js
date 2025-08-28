import { useLocation, useNavigate } from 'react-router-dom'
import './header.css'
import LogoA from '../../../components/logo/logoA';


export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = sessionStorage.getItem('user')
    return <header className='header'>
        {
            (location.pathname !== '/') &&
            (location.pathname !== '/login') &&
            (location.pathname !== '/inscription') ? <>
            <div>
                <LogoA/>
            </div>
            <div className='head-menu'>
                <div
                    type="button"
                    className='head-menu-btn'
                    onClick={() => navigate('/')}
                >Accueil</div>
                <div
                    type="button"
                    className='head-menu-btn'
                    onClick={() => navigate('/all')}
                >Rechercher</div>
                {user ?
                    <div
                        type="button"
                        className='head-menu-btn'
                        onClick={() => navigate('/epreuve')}
                    >Epreuve</div>
                : ''}
                {/* <div type="button" className='head-menu-btn'>Accueil</div> */}
            </div>
        </> : '' }
        
    </header>
}