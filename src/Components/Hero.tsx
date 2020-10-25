import React, { useState } from 'react';
import styles from './Hero.module.css';

const totalQuestions = 10
// props interface
type Props = {
    question: string
    setNumber: Function
    number: number
    answers: string[]
    questionNm: number
    correctAnswer: string
    startQuiz: Function
}

// Final result interface
type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
    questionNm: number
}

const Hero: React.FC<Props> = ({
    question,
    setNumber,
    number,
    answers,
    questionNm,
    correctAnswer,
    startQuiz,
}) => {

    // States
    const [score, setScore] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [userAnswer, setUserAnswer] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [correctNumber, setCorrectNumber] = useState(0)

    // Next button function
    const handleNextButton = () => {
        if (number !== totalQuestions - 1) {
            setNumber((prev: number) => prev + 1)
            setUserAnswer(false)
        }
        else {
            return null
        }
    }

    // check answer
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const answer = e.currentTarget.value
        const correct = correctAnswer === answer

        if (correct) {
            setScore(prev => prev + 10)
            setCorrectNumber(prev => prev + 1)
        }

        const answerObject = {
            question: question,
            answer,
            correct,
            correctAnswer: correctAnswer,
            questionNm: questionNm,
        }
        setUserAnswers((prev) => [...prev, answerObject])
        userAnswers ? setUserAnswer(true) : setUserAnswer(false)
    }

    const handleResult = () => {
        return (
            userAnswers.length === 10 ?
                setGameOver(true) : null
        )
    }

    return (
           <div className={styles.container}  style={gameOver ? { overflow: 'scroll' } : undefined} >

            {/* Progress Bar Container */}
            <div className={styles.progressBarContainer}   >
                <progress
                    // id="file"
                    value={number + 1}
                    max={totalQuestions}
                    className={styles.bar}
                    
                ></progress>
                {
                 userAnswers.length === 10
                        ?
                        // <img src={nextIcon} alt="check-icon" className={styles.checkIcon} />
                        <p>...</p>
                        :
                        <p className={styles.questionNum}>{questionNm}/{totalQuestions}</p>
                }
            </div>

            {/* Questions and Answers Card */}
            {
                !gameOver && userAnswers.length !== 10
                    ?
                    <div className={styles.gameContainer}>

                        <h6 className={styles.question} dangerouslySetInnerHTML={{ __html: question}} />

                        <div className={styles.answersContainer}>
                            {
                                answers.map(answer => (
                                    <button
                                        disabled={userAnswer}
                                        value={answer}
                                        onClick={checkAnswer}
                                    >
                                        {answer}
                                    </button>
                                ))
                            }
                        </div>

                        {/* continue button */}
                        {number !== totalQuestions - 1 && userAnswer ? <button onClick={handleNextButton} className={styles.continueBtn}>Continue </button> : <button className={styles.unfocusBtn}>Continue </button>}

                    </div>
                    : null}

            {/*  Result */}
            {
                userAnswers.length === 10 && !gameOver ?
                    number === totalQuestions - 1 
                    ? 
                    <div className={styles.resultsContainer}>
                        <h3 style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>Completed</h3> 
                        <h2 className={styles.score}>Your Score: <span style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>{score}</span></h2>
                        <h3 style={{color: 'purple'}} >Correct: <span style={correctNumber < 5 ? {color: '#c80e13'} : {color: 'green'}}>{correctNumber}</span></h3>
                        <p style={score < 50 ? {color: '#c80e13'} : {color: 'green'}}>
                            {correctNumber < 5 ? `You can do better than this.` : `Great Job!`}
                        </p>
                        <button className={styles.currentDetails} onClick={handleResult}>Complete Details</button> 

                    </div>
                    : null 
                    : null
            }

            {/* Result Details */}
            {
                gameOver && userAnswers.length === 10 ?
                    <div className={styles.resultDetails}>
                        {
                            userAnswers.map(item => (
                                <>
                                    <h2>Question {item.questionNm}</h2>
                                    <p 
                                        dangerouslySetInnerHTML={{ __html: item.question}} 
                                    />
                                    <p 
                                        dangerouslySetInnerHTML={{ __html: `Your answer: ${item.answer}`}}
                                        style={{ color: '#7d3cff' }}
                                    />
                                    <p
                                        dangerouslySetInnerHTML={{ __html: `Correct Answer: ${item.correctAnswer}`}}
                                        style={{ color: 'green' }}
                                    />
                                    <p
                                        style={ item.correct ? { color: 'green' } : { color: 'red' }}
                                    >
                                        {item.correct ? `Is your answer correct?: Yes` : `Is your answer correct?: No`}
                                    </p>
                                </>
                            ))}
                    </div> : null
            }

        </div>
    );
}

export default Hero;