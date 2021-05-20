import './App.css'
import { useState } from 'react'
import Rating from '@material-ui/lab/Rating'
import LinearProgress from '@material-ui/core/LinearProgress'

import Progressbar from './Progressbar.js'
import { questions } from './questions'

function App () {
  const topProgressPercent = 80
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)
  const [rate, setrate] = useState(3)
  const [bar, setbar] = useState(0)
  const [rem, setrem] = useState(20)
  const [notcorr, setnotcor] = useState(0)
  const cans = questions[currentQuestion].correct_answer
  const icans = questions[currentQuestion].incorrect_answers
  const newans = [...icans, cans]
  const [cor, setcor] = useState('')
  const [diss, setdiss] = useState(false)

  const [question, setquestion] = useState(questions[0].question)
  const bttn = document.getElementsByClassName('ans')
  console.log(bttn)

  const showcorrans = () => {
    for (let i = 0; i < bttn.length; i++) {
      if (bttn[i].innerText === questions[currentQuestion].correct_answer) {
        bttn[i].classList.add('green')
        break
      }
    }
  }
  const remcorrans = () => {
    for (let i = 0; i < bttn.length; i++) {
      {
        bttn[i].classList.remove('green')
      }
    }
  }

  function shuffle (array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const rater = () => {
    if (questions[currentQuestion].difficulty === 'easy') {
      setrate(1)
    } else if (questions[currentQuestion].difficulty === 'medium') {
      setrate(2)
    } else setrate(3)
    return rate
  }

  const maxim = () => {
    let y = ((score + rem) * 100) / 20
    return y
  }
  const minm = () => {
    let z = (score * 100) / 20
    return z
  }

  const handleAnswerOptionClick = isCorrect => {
    showcorrans()
    if (isCorrect) {
      setScore(score + 1)
      setcor('correct!')
    } else {
      setnotcor(notcorr + 1)
      setcor('incorrect!')
    }
  }
  const next = () => {
    setcor('')
    setdiss(false)
    setrem(rem - currentQuestion)
    const nextQuestion = currentQuestion + 1
    setrem(rem - 1)

    rater()
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    }
    remcorrans()
  }

  const chans = textt => {
    setdiss(true)
    if (textt === questions[currentQuestion].correct_answer) {
      handleAnswerOptionClick(true)
    } else {
      handleAnswerOptionClick(false)
    }
  }
  //rating star value
  const rateValue = () => {
    if (question[currentQuestion + 1].difficulty === 'medium') {
      setrate(2)
    } else setrate(3)
    return rate
  }

  return (
    <div className='container'>
      <div
          className='top-progress-bar'
          style={{ width: `${(5 * 100) / 20}%` }}
        ></div>
      <div className='second-container'>
        <div className='header'>
          <h1>
            Questions {currentQuestion + 1} /{questions.length}
          </h1>
          <p>{questions[currentQuestion].category}</p>
          {/*rateing*/}
          <div className='rate'>
            <Rating value={rate}></Rating>
          </div>

          <p className='question-paragraph'>{questions[currentQuestion].question}</p>

         
        </div>


        <div className='next-question-container'>
          <div className='answer-section'>
            {shuffle(newans).map(answerOption => (
              <button
                className='ans'
                disabled={diss}
                onClick={() => chans(answerOption)}
              >
                {answerOption}
              </button>
            ))}
          </div>  
          <div className='nextque'>
            <h4 style={{ alignSelf: 'center' }}>{cor}</h4>
            <button className='bt' onClick={next}>
              Next question
            </button>
          </div>
        </div>
        
        <div className='score-progress'>
          <div className='lastdiv'>
            <h1>Score {(score * 100) / 20}%</h1>
            <h1> max {maxim()}</h1>
          </div>

          <Progressbar score={(score * 100) / 20} max={maxim()} min={minm()} />
        </div>
        
      </div>
    </div>
  )
}

export default App
