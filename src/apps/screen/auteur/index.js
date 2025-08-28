
import { useState } from 'react'
import './index.css'
import ModalAddEpreuve from '../addEpreuve/modalAddEpreuve'


export default function Epreuve({children}) {
    const [showModAddEpreuve, setShowModAddEpreuve] = useState(false)
    function closeModAddEpreuve(){
        setShowModAddEpreuve(false)
    }
    return <div className='epreuve-container'>
        <div
            className="btn-add-epreuve"
            type="button"
            onClick={() => setShowModAddEpreuve(true)}
        >Ajouter une epreuve ?</div>
        {children}
        <ModalAddEpreuve
            openModal={showModAddEpreuve}
            closeModal={closeModAddEpreuve}
        />
    </div>
}