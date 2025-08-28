
import './index.css';

export default function ButtonScore({
    onSubmit,
    className,
    style,
    onClick,
    timeCount,
    score,
    type="submit"
}) {
    return (
        <button
            style={style}
            className={"btn-submit " + className}
            type={type}
            onSubmit={onSubmit}
            onClick={onClick}
        >
            <b>{score}</b>
            
        </button>
    )
}