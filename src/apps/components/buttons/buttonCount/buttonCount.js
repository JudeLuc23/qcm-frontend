
import './buttonCount.css';

export default function ButtonCount({
    onSubmit,
    className,
    style,
    onClick,
    timeCount,
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
            <b>{timeCount ? timeCount : ''}</b>
            
        </button>
    )
}