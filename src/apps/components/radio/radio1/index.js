import './index.css';

export default function Radio1({
    checked,
    onChange,
    textContent,
    id,
    name,
    className,
    required
}) {
    return <>
        <label className=''>
            <input
                {...{
                    type: "radio",
                    checked: checked,
                    onChange: onChange,
                    id: id,
                    name: name,
                    className: className,
                    required: required
                }}
            />
            {textContent}
        </label>
    </>
};