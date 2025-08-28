import './index.css'
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function ButtonHr1({onClick}) {
    return <button
        className='btn-add-res'
        type="button"
        onClick={onClick}
    >
        <hr className="btn-hr"/>
        Ajouter
        <hr className="btn-hr"/>
        <AiOutlinePlusCircle/>
    </button>
}