
import './index.css'

export default function Button1({textContent, onClick}) {
    return <button type='button' className="btn1-btn" onClick={onClick}>
        <span>{textContent}</span>
        <span>....</span>
    </button>
}