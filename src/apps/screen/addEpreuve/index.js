import { useEffect, useState } from 'react';
import InputTest from '../../components/inputs/inputTest';
import './index.css'
import { useLocation } from 'react-router-dom';
import ButtonHr1 from '../../components/buttons/buttonHr/buttonHr1';
import InputTextOutLineNumber from '../../components/inputs/inputOutLineNumber';
import Button2 from '../../components/buttons/button2/button2';
import axios from 'axios'


export default function AddEpreuve() {
    const location = useLocation()
    const {number} = location.state
    const [epreuve, setEpreuve] = useState({
        title: '',
        tTotal: '',
        tUnitaire: '',
        pUnitaire: '',
        questions: []
    })
    const [epreuveError, setEpreuveError] = useState({
        title: '',
        tTotal: '',
        tUnitaire: '',
        pUnitaire: '',
        questions: []
    })
    const [reload, setReload] = useState(0)
    useEffect(() => {
        if(reload === 0) {
            const quest = []
            const t = []
            for(let i = 0; i < number; i++){
                quest.push({
                    id: i,
                    value: '',
                    resTrue: [],
                    resFalse: []
                })
                quest[i].resTrue.push({id: 0, value: ''}) 
                quest[i].resFalse.push({id: 0, value: ''}) 
                t.push({
                    id: i,
                    value: '',
                    resTrue: [],
                    resFalse: []
                })
                t[i].resTrue.push({id: 0, value: ''}) 
                t[i].resFalse.push({id: 0, value: ''}) 
            }
            setEpreuve({
                ...epreuve, 
                questions: quest
            })
            setEpreuveError({
                ...epreuveError, 
                questions: t
            })
        }
    }, [number, epreuve, epreuveError, reload])
    function onChange(e){
        const q = e.target.id.split('-')
        switch(q[0]) {
            case 'title':
                setEpreuve({...epreuve, title: e.target.value})
                setEpreuveError({...epreuveError, title: ''})
            break
            case 'pUnitaire':
                setEpreuve({...epreuve, pUnitaire: e.target.value})
                setEpreuveError({...epreuveError, pUnitaire: ''})
            break
            case 'tTotal':
                // if(e.target.value.length > 0){
                //     document.getElementById('tUnitaire').disabled = true
                //     document.getElementById('tTotal').disabled = false
                // }else{
                //     document.getElementById('tUnitaire').disabled = false
                //     document.getElementById('tTotal').disabled = false
                // }
                setEpreuveError({...epreuveError, tTotal: '', tUnitaire: ''})
                setEpreuve({...epreuve, tTotal: e.target.value, tUnitaire: ''})
            break
            case 'tUnitaire':
                // if(e.target.value.length > 0){
                //     document.getElementById('tUnitaire').disabled = false
                //     document.getElementById('tTotal').disabled = true
                // }else{
                //     document.getElementById('tUnitaire').disabled = false
                //     document.getElementById('tTotal').disabled = false
                // }
                setEpreuveError({...epreuveError, tTotal: '', tUnitaire: ''})
                setEpreuve({...epreuve, tUnitaire: e.target.value, tTotal: ''})
            break
            case 'q':
                let w = epreuve.questions
                w[q[1]].value = e.target.value
                setEpreuve({...epreuve, questions: w})
                let y = epreuveError.questions
                if(y[q[1]].value === 'Ce champ est requis'){
                    y[q[1]].value = ''
                    setEpreuveError({...epreuveError, questions: y})
                }
            break
            case 'rj':
                let r = epreuve.questions
                r[q[1]].resTrue[q[2]].value = e.target.value
                setEpreuve({...epreuve, questions: r})
                let u = epreuveError.questions
                if(u[q[1]].value !== 'Ce champ est requis'){
                    u[q[1]].value = ''
                    setEpreuveError({...epreuveError, questions: u})
                }
            break
            default:
                let t = epreuve.questions
                t[q[1]].resFalse[q[2]].value = e.target.value
                setEpreuve({...epreuve, questions: t})
                let i = epreuveError.questions
                if(i[q[1]].value !== 'Ce champ est requis'){
                    i[q[1]].value = ''
                    setEpreuveError({...epreuveError, questions: i})
                }
            break
        }
        setReload(reload + 1)
    }
    function addRj(n) {
        let q = epreuve.questions.length
        const w = []
        for(let i = 0; i < q; i++){
            w.push(epreuve.questions[i])
        }
        q = w[n].resTrue.length
        w[n].resTrue.push({id: q, value: ''})
        setEpreuve({...epreuve, questions: w})
        setReload(reload + 1)
    }
    function addRf(n) {
        let q = epreuve.questions.length
        const w = []
        for(let i = 0; i < q; i++){
            w.push(epreuve.questions[i])
        }
        q = w[n].resFalse.length
        w[n].resFalse.push({id: q, value: ''})
        setEpreuve({...epreuve, questions: w})
        setReload(reload + 1)
    }
    async function submit() {
        const q = epreuve.questions.length
        let erreur = false, d = 0
        for(let i = 0; i < q; i++){
            if(epreuve.questions[i].value.trim().length === 0){
                let n = false
                let w = epreuve.questions[i].resTrue.length
                for(let j = 0; j < w; j++){
                    if(epreuve.questions[i].value){
                        d++
                    }else{
                        d--
                    }
                    if(epreuve.questions[i].resTrue[j].value){
                        n = true
                        break
                    }
                }
                if(!n){
                    let w = epreuve.questions[i].resFalse.length
                    for(let j = 0; j < w; j++){
                        if(epreuve.questions[i].resFalse[j].value){
                            n = true
                            break
                        }
                    }
                }
                if(n) {
                    erreur = true
                    epreuveError.questions[i].value = 'Ce champ est requis'
                }
            }else{
                let n = false, b = false
                let w = epreuve.questions[i].resTrue.length
                for(let j = 0; j < w; j++){
                    if(epreuve.questions[i].resTrue[j] && epreuve.questions[i].resTrue[j].value){
                        n = true
                    }
                    if(epreuve.questions[i].resFalse[j] && epreuve.questions[i].resFalse[j].value){
                        b = true
                    }
                }
                if(!n || !b) {
                    erreur = true
                    epreuveError.questions[i].value = 'Cette question doit avoir au moins deux réponses (une juste et une fausse)'
                }
            }
        }
        if(epreuve.title.trim().length === 0){
            erreur = true
            setEpreuveError({...epreuveError, title: 'Ce champ est requis'})
        }
        if(epreuve.pUnitaire.trim().length === 0){
            erreur = true
            setEpreuveError({...epreuveError, pUnitaire: 'Ce champ est requis'})
        }
        if(epreuve.tTotal.trim().length === 0){
            erreur = true
            setEpreuveError({...epreuveError, tTotal: 'Ce champ est requis'})
        }
        // if(!epreuve.tTotal && !epreuve.tUnitaire){
        //     erreur = true
        //     setEpreuveError({
        //         ...epreuveError,
        //         tTotal: 'fgh',
        //         tUnitaire: 'fghf',
        //     })
        // }
        if(erreur){
            setReload(reload + 1)
        }else{
                console.log(epreuve)
            if(d < 0) {
                alert('Erreur : Epreuve sans question')
            }else{
                const user = JSON.parse(sessionStorage.getItem('user'))
                await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}questionnaire/add`,
                    {auteur: user.id, epreuve: epreuve}
                ).then(res => {
                    if(res.data.status === 200){
                        alert("SUCCES : Opération réussie")
                    }
                    // else{
                    //     console.log(res.data)
                    // }
                }).catch(err => console.err(err))
            }
        }
    }
    return <div className='add-ep-container'>
        <InputTest
            label="Titre de l'epreuve"
            name="title"
            id="title"
            value={epreuve.title}
            onChange={onChange}
            errorText={epreuveError.title}
            error={epreuveError.title ? true : false}
            required={true}
        />
        <div className='times'>
            <div className='elt1'>
                <InputTextOutLineNumber
                    label="Temps total d'execution (en minute)"
                    id="tTotal"
                    value={epreuve.tTotal}
                    onChange={onChange}
                    errorText={epreuveError.tTotal}
                    error={epreuveError.tTotal ? true : false}
                    required={true}
                    width='20rem'
                    min={0}
                />
            </div>
            {/* <div className='elt2'>
                <InputTextOutLineNumber
                    label="Temps unitaire d'execution (en seconde) "
                    id="tUnitaire"
                    value={epreuve.tUnitaire}
                    onChange={onChange}
                    errorText={epreuveError.tUnitaire}
                    error={epreuveError.tUnitaire ? true : false}
                    required={true}
                    width='20rem'
                    min={0}
                />
            </div> */}
            <div className='elt2'>
                <InputTextOutLineNumber
                    label="Point unitaire "
                    id="pUnitaire"
                    value={epreuve.pUnitaire}
                    onChange={onChange}
                    errorText={epreuveError.pUnitaire}
                    error={epreuveError.pUnitaire ? true : false}
                    required={true}
                    width='10rem'
                    min={0}
                />
            </div>
        </div>
        <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: '20px'
        }} >
            {epreuve.questions.length > 0 ? epreuve.questions.map(elt => {
                return <div key={elt.id} style={{width: '90%'}} >
                    <InputTest

                        label={"Question " + (elt.id + 1)}
                        name={"q-" + elt.id}
                        id={"q-" + elt.id}
                        value={elt.value}
                        onChange={onChange}
                        errorText={epreuveError.questions[elt.id].value}
                        error={epreuveError.questions[elt.id].value ? true : false}
                        required={true}
                        width='90%'
                    />
                    <div className='response'>
                        <div className='res-elt'>
                            <h4 className='res-elt-title'>Reponses juste</h4>
                            <div className='res-elt-res'>
                                {elt.resTrue.map(res => {
                                    return <InputTest
                                        key={res.id}
                                        label={(res.id + 1) + ' ) '}
                                        id={"rj-" + elt.id + "-" + res.id}
                                        value={res.value}
                                        onChange={onChange}
                                        errorText={res.id === 0 ? 
                                            epreuveError.questions[elt.id].resTrue[0].value : ''
                                        }
                                        error={res.id === 0 ? 
                                            (epreuveError.questions[elt.id].resTrue[0].value ?
                                                true : false
                                            ) : false
                                        }
                                        required={res.id === 0 ? true : false}
                                        width='95%'
                                    />
                                })}
                                
                            </div>
                            <ButtonHr1 onClick={() => addRj(elt.id)}/>
                        </div>
                        <div className='res-elt'>
                            <h4 className='res-elt-title'>Reponses fausse</h4>
                            <div className='res-elt-res'>
                                {elt.resFalse.map(res => {
                                    return <InputTest
                                        key={res.id}
                                        label={(res.id + 1) + ' ) '}
                                        id={"rf-" + elt.id + "-" + res.id}
                                        value={res.value}
                                        onChange={onChange}
                                        errorText={res.id === 0 ? 
                                            epreuveError.questions[elt.id].resFalse[0].value : ''
                                        }
                                        error={res.id === 0 ? 
                                            (epreuveError.questions[elt.id].resFalse[0].value ?
                                                true : false
                                            ) : false
                                        }
                                        required={res.id === 0 ? true : false}
                                        width='95%'
                                    />
                                })}
                            </div>
                            <ButtonHr1 onClick={() => addRf(elt.id)}/>
                        </div>
                    </div>
                </div>
            }) : ''}
            <Button2 textContent="Enregistrer" onClick={submit}/>
        </div>
    </div>
};