import './button2.css';

function Button2({
    textContent,
    onSubmit,
    className,
    style,
    // style={marginTop: "30px"},
    onClick,
    type="submit",
    marginTop
}) {
    return (
        <button
            style={!marginTop ? {marginTop: "30px"} : style}
            className={"btn-submit "+className}
            type={type}
            onSubmit={onSubmit}
            onClick={onClick}
        >
            <b>{textContent}</b>
        </button>
    )
}

export default Button2;