export default function Button3({onClick}) {
    return <button
        style={{
            backgroundColor: '#E6E6FA',
            borderRadius: '30px',
            width: '5rem',
            height: '2rem'
        }}
        onClick={onClick}
    >
        Ok
    </button>
}