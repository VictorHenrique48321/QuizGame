import "../../assets/css/reset.css"
import "../../assets/css/main/main.css" 
import "../../assets/css/main/main-quizCompleto.css" 

import { useParams, Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const Quiz = () => {

  let params = useParams()

  const [questionStatement, setQuestionStatement] = useState()
  const [questionWrongAnswers, setQuestionWrongAnswers] = useState([])
  const [questionRightAnswers, setQuestionRightAnswers] = useState([])
  const [render, setRender] = useState(false)

  const answers = useRef()
  const questionScore = useRef(0)
  const questionId = useRef(0)
  const nextQuiz = useRef()
  const guardarResposta = useRef([])
  const guardarCor = useRef([])

  function lerJson(){
    const data = require(`../../assets/questions/${params.difficult}.json`)
    setQuestionWrongAnswers(data[questionId.current].wrongAnswers)
    setQuestionRightAnswers(data[questionId.current].correctAnswer)
    setQuestionStatement(data[questionId.current].questionStatement)
    rightAnswer()
  }

  function rightAnswer() {
    let numerosRespostas = [0,1,2,3]
    const numeroGerado = Math.floor(Math.random() * 4)
    const elementoRespostaCorreta = answers.current.children[numeroGerado]
    elementoRespostaCorreta.innerHTML = questionRightAnswers

    const index = numerosRespostas.indexOf(numeroGerado);
    if (index > -1) {
      numerosRespostas.splice(index, 1)
    }

    for(let i =0; i<numerosRespostas.length; i++){
      answers.current.children[numerosRespostas[i]].innerHTML = questionWrongAnswers[i]
    }
  }

  function validateAnswer(e){
    if(e.target.innerHTML === questionRightAnswers){
      questionId.current++
      questionScore.current++
      guardarCor.current = [...guardarCor.current, "green"]
      if(questionId.current < 12 ){
        lerJson()
      }
      setRender(!render)
    } else {
      questionId.current++
      guardarCor.current = [...guardarCor.current, "red"]
      if(questionId.current < 12 ){
        lerJson()
      }
      setRender(!render)
    }
    guardarResposta.current = [...guardarResposta.current, questionRightAnswers]
  }

  function restartTest(){
    questionId.current = 0
    questionScore.current = 0
    guardarResposta.current = []
    guardarCor.current = []
    setRender(!render)
  }

  function nextTest(){
    switch(params.difficult){
      case "beginner":
        nextQuiz.current = "advanced"
        break
      case "advanced":
        nextQuiz.current = "intermediate"
        break
      case "intermediate":
        nextQuiz.current = "home"
        break
    }
  }
  useEffect(() => {
    if(questionId.current < 12){
      lerJson()
    }
  })
  
  if(questionId.current === 12){
    return (
      <main>
        <div className="main-quizCompleto">
          <div className="main-scoreLayout">
            <div className="main-questionAnswers">
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[0]}`}}><p>1</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[0]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[1]}`}}><p>2</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[1]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[2]}`}}><p>3</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[2]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[3]}`}}><p>4</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[3]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[4]}`}}><p>5</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[4]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[5]}`}}><p>6</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[5]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[6]}`}}><p>7</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[6]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[7]}`}}><p>8</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[7]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[8]}`}}><p>9</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[8]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[9]}`}}><p>10</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[9]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[10]}`}}><p>11</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[10]}</p>
              <p className="main-answered" style={{ backgroundColor: `${guardarCor.current[11]}`}}><p>12</p></p>
              <p className="main-answerQuestion">{guardarResposta.current[11]}</p>
            </div>
            <div className="main-options">
              <h1 className="main-nextOrRetry" onClick={restartTest}><p>Reiniciar</p></h1>
              <Link to={`/${nextQuiz.current}`}>
                <h1 
                  className="main-nextOrRetry" 
                  onClick={restartTest}>
                  {nextQuiz.current}
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div className="main-container">
          <div className="main-questionLayout">
            <div className="main-question">
              <h1 className="main-questionNumber">Question {questionId.current + 1}/12</h1>
              <p className="main-questionStatement">{questionStatement}</p>
            </div>
            <p className="main-answers" ref={answers}>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
            </p>
          </div>
        </div>
        {nextTest()}
      </main>
    )
  }
}

export default Quiz