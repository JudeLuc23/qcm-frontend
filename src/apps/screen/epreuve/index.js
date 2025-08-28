import { useState } from 'react'
import InputSearch1 from '../../components/inputs/inputSearch1'
import './index.css'
import { useNavigate } from 'react-router-dom'


export default function ShowAllEpreuve() {
    const [datas, setDatas] = useState([])
    function changeData(data) {
        setDatas(data)
    }
    const navigate = useNavigate()
    return <div className='eva-container'>
        <InputSearch1 changeData={changeData}/>
        {datas.length > 0 ? datas.map(epreuve => {
            return <div key={epreuve.id} className='epreuve-containe'>
                <div
                    type="button"
                    className='epreuve-tit'
                    onClick={() => navigate('/evaluation', {state: {epreuve: epreuve.id}})}
                >
                    <b>{epreuve.titre}</b>
                </div>
                <div className='epreuve-auteur'>
                    Auteur : <span>{epreuve.user.nom}</span>
                </div>
            </div>
        }) : ''}
    </div>
}