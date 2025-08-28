import React, {useState} from 'react';
import ReactModal from 'react-modal';
import { FaPersonHalfDress } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Button3 from '../../components/buttons/button3';
import InputTextOutLineBasic from '../../components/inputs/inputOutLineNumber';
import InputTextOutLineNumber from '../../components/inputs/inputOutLineNumber';

export default function ModalAddEpreuve({
    openModal,
    closeModal
}) {
    const navigate = useNavigate();
    const [lignNumber, setLignNumber] = useState(1)
    function onChange(e) {
        setLignNumber(e.target.value)
    }
    function submit() {
        if((lignNumber >= 1) && (lignNumber < 50)){
            closeModal()
            navigate('/epreuve/add', {state: {number: lignNumber}})
        }
    }
    return !openModal ? null : <>
        <ReactModal
            isOpen={openModal}
            onRequestClose={closeModal}
            style={{
                overlay: {backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 3 },
                content: {
                    width: '17rem',
                    height: '7rem',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '10px',
                    border: '1px solid #187171',
                }
            }}
            ariaHideApp={false}
        >
            <div className='modalChoiceRol-container'
                style={{height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                Veuillez entrer le nombre de question
                <InputTextOutLineNumber
                    min={1}
                    max={100}
                    step={10}
                    value={lignNumber}
                    onChange={onChange}
                    required={true}
                />
                <Button3 onClick={submit}/>
            </div>
        </ReactModal>
        
    </>
};