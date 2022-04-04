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
      console.log(questionId.current)
      if(questionId.current < 10 ){
        lerJson()
      }
      setRender(!render)
    } else {
      questionId.current++
      console.log(questionId.current)
      if(questionId.current < 11 ){
        lerJson()
      }
      setRender(!render)
    }
  }

  function restartTest(){
    questionId.current = 0
    questionScore.current = 0
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
    if(questionId.current < 11){
      lerJson()
    }
  })
  
  if(questionId.current === 11){
    return (
      <main>
        <div className="main-quizCompleto">
          <div className="main-scoreLayout">
            <h1 className="main-congratulations">Você completou o teste</h1>
            <h2 className="main-score">você acertou {questionScore.current} perguntas</h2>
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
              <h1 className="main-questionNumber">Question {questionId.current + 1}/11</h1>
              <p className="main-questionStatement">{questionStatement}</p>
            </div>
            <ol className="main-answers" ref={answers}>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
              <li className="main-answer" onClick={validateAnswer}></li>
            </ol>
          </div>
        </div>
        {nextTest()}
      </main>
    )
  }
}

export default Quiz