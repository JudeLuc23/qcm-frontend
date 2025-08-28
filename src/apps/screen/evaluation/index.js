import { useLocation } from 'react-router-dom'
import './index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button2 from '../../components/buttons/button2/button2'
import ButtonCount from '../../components/buttons/buttonCount/buttonCount'
import Radio1 from '../../components/radio/radio1'
import ButtonScore from '../../components/buttons/buttonScore'


export function Questionnaire({
    questionnaire,
    changeIsSubmitted,
    isSubmitted,
    score,
    changeScore,
    changeTimeRemaining,
    dataCount
}) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [intervalId, setIntervalId] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(dataCount);
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining((prevTime) => prevTime - 1)
            } else {
                handleSubmit();
            }
            changeTimeRemaining(timeRemaining)
        }, 1000);
        setIntervalId(interval);
        return () => clearInterval(interval);
    }, [timeRemaining]);
    const handleAnswerSelect = (questionId, answerId) => {
        if (!isSubmitted) {
            setSelectedAnswers((prevAnswers) => ({
                ...prevAnswers,
                [questionId]: answerId,
            }));
        }
    };
    const handleSubmit = () => {
        changeIsSubmitted(true);
        calculateScore();
        clearInterval(intervalId);
    };

    const calculateScore = () => {
        let score = 0;
        questionnaire.questions.forEach((question) => {
            const selectedAnswer = selectedAnswers[question.id];
            const correctAnswers = question.reponses.filter((reponse) => reponse.justes.length > 0);
            if (correctAnswers.some((reponse) => reponse.id === selectedAnswer)) {
                score += questionnaire.pointUnitaire;
            }
        });
        changeScore(score);
    };

    return (
        <div >
            {questionnaire.questions.map((question, index) => (
                <div key={question.id}>
                    <h3>
                        <span style={{paddingRight: '10px'}}>
                            {index + 1} )
                        </span>
                        {question.libelle}
                    </h3>
                    <div className='eva-res'>
                        {question.reponses.map((reponse) => (
                            <div key={reponse.id} className='div-radio'>
                                <Radio1
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={selectedAnswers[question.id] === reponse.id}
                                    onChange={() => handleAnswerSelect(question.id, reponse.id)}
                                    disabled={isSubmitted}
                                    textContent={reponse.fausses.length > 0 ? reponse.fausses[0].valeur : reponse.justes[0].valeur}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {!isSubmitted &&
                <Button2 onClick={handleSubmit} textContent="Soumettre"/>
            }
            
        </div>
    );
}



export default function Evaluation() {
    const location = useLocation()
    const {epreuve} = location.state
    const [data, setData] = useState({})
    const [time, setTime] = useState({
        heure: '',
        minutes: '',
        seconde: ''
    })
    const [reload, setReload] = useState(0)
    const [dataCount, setDataCount] = useState('')
    const [i, setI] = useState(-1)
    const [showBtnBegin, setShowBtnBegin] = useState(true)
    const [showQuest, setShowQuest] = useState(false)
    function calculTUnitaire(tempsUnitaire) {
        let e = 0, r = 0, y = 0
        if(tempsUnitaire >= 3600){
            while(tempsUnitaire >= 3600){
                y = tempsUnitaire / 60
                e += tempsUnitaire / 60
                r = tempsUnitaire % 60
                tempsUnitaire = y
            }
        }else if(tempsUnitaire >= 60){
            while(tempsUnitaire >= 60){
                y = tempsUnitaire / 60
                e += tempsUnitaire / 60
                r = tempsUnitaire % 60
                tempsUnitaire = y
            }
        }
        if(tempsUnitaire >= 3600){
            setTime({...time, heure: e, minutes: r, seconde: '00'})
        }else if(tempsUnitaire >= 60){
            setTime({...time, heure: '00', minutes: e, seconde: r})
        }else{
            setTime({...time, heure: '00', minutes: '00', seconde: tempsUnitaire})
        }
    }
    function calculTTotal(tempsTotal) {
        let e = 0, r = 0, y = 0
        if(tempsTotal >= 60){
            while(tempsTotal >= 60){
                y = tempsTotal / 60
                e += tempsTotal / 60
                r = tempsTotal % 60
                tempsTotal = y
            }
        }
        if(tempsTotal >= 60){
            setTime({...time, heure: e, minutes: r, seconde: '00'})
        }else if((tempsTotal < 60) && (tempsTotal >= 1)) {
            setTime({...time, heure: '00', minutes: tempsTotal, seconde: '00'})
        }else{
            setTime({...time, heure: '00', minutes: '00', seconde: tempsTotal * 10})
        }
    }
    function calculDataCount() {
        return (parseInt(time.heure) * 3600) +
        (parseInt(time.minutes) * 60) + parseInt(time.seconde)
    }
    const [timeCount, setTimeCount] = useState(data ? 
        (data.tempsTotal >=60 ? 
            data.tempsTotal * 3600
        :   (((data.tempsTotal < 60) && (data.tempsTotal > 1)) ? 
            data.tempsTotal * 60 : data.tempsTotal * 10
        ))
    : data);
    // const [timeCount, setTimeCount] = useState(data ? data.tempsUnitaire : data);
    
    function changeTimeRemaining(value) {
        setTimeCount(value)
    }
    useEffect(() => {
        if(reload === 0) {
            async function getData() {
                await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}questionnaire/show/${epreuve}`
                ).then(res => {
                    if(res.data.status === 200){
                        // console.log(res.data.epreuve)
                        setReload(reload + 1)
                        if(res.data.epreuve.tempsTotal){
                            calculTTotal(res.data.epreuve.tempsTotal)
                        }else{
                            calculTUnitaire(res.data.epreuve.tempsUnitaire)
                        }
                        setData(res.data.epreuve)
                    }
                }).catch()
            }
            getData()
        }
        setDataCount(calculDataCount())
    }, [epreuve, time, reload, calculDataCount])
    function handleShowQuestion() {
        setI(i + 1)
        if(data.tempsTotal){
            setShowQuest(true)
        }else{
            setShowQuest(true)
        }
    }
    function closeShowBtnBeg() {
        handleShowQuestion()
        setShowBtnBegin(!showBtnBegin)
    }
    const [isSubmitted, setIsSubmitted] = useState(false);
    function changeIsSubmitted(value) {
        setIsSubmitted(value)
    }
    const [score, setScore] = useState();
    function changeScore(value) {
        
        // alert(value)
        setScore(value)
    }
    return <div className='eva-container'>
        {epreuve
            ?   (data &&   <div className='eva-container'>
                    <h2>{data.titre}</h2>
                    <div className='eva-sous-tit'>
                        <div className='eva-sous-time'>
                            <span style={{paddingRight: '10px'}}>
                                Temps {data.tempsTotal ? "totat" : "unitaire"} d'execution :
                            </span>
                            <span>{time.heure} : {time.minutes} : {time.seconde}</span>
                        </div>
                        <div>-&gt;</div>
                        {showBtnBegin ?
                            <Button2
                                textContent="Commencer"
                                marginTop={true}
                                onClick={closeShowBtnBeg}
                            />
                        :   
                            <p>
                                <span style={{paddingRight: '10px'}}>
                                    Temps restant : 
                                </span>
                                <ButtonCount
                                    timeCount={timeCount}
                                />
                                <span style={{paddingLeft: '10px'}}>
                                    secondes
                                </span>
                            </p>
                        }
                        <div>Point unitaire : {data.pointUnitaire}</div>
                        <p>
                            <span style={{paddingRight: '10px'}}>
                                Score final :
                            </span>
                            <ButtonScore
                                score={score}
                            />
                        </p>
                    </div>
                    {showQuest  && <Questionnaire
                        questionnaire={data}
                        isSubmitted={isSubmitted}
                        changeIsSubmitted={changeIsSubmitted}
                        score={score}
                        changeScore={changeScore}
                        changeTimeRemaining={changeTimeRemaining}
                        dataCount={dataCount}
                    />}
                </div> ) 
            : <span>Erreur</span>
        }
    </div>
}
