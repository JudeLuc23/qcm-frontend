import { COLOR } from "../../../tools/style";

export default function CardLogin({textHead, children}) {
    return <div style={{
        boxShadow: '0px 0px 5px ' + COLOR.head,
        display: "flex",
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <div style={{
            paddingTop: '1rem',
            paddingBottom: '1rem'
        }}>{textHead}</div>
        <div  style={{
            boxShadow: '0px 0px 5px ' + COLOR.head,
            display: "flex",
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            {children}
        </div>
    </div>
}