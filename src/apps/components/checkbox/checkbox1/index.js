import './index.css';

export default function Checkbox1({
    checked,
    onChange,
    textContent,
    id,
    name,
    className,
    required
}) {
    return <>
        <label className='checkbox-hide-or-show-all-column'>
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