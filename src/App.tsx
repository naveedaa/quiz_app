import React, { useState } from 'react';
import styles from './App.module.css';
import Hero from './Components/Hero';
import loader from './Images/Loading.gif';
import { GitHubIcon} from './Icon/index';
import { FetchData } from './API';

type Question = {
  category: string
  correct_answer: string
  incorrect_answers: string[]
  difficulty: string
  question: string
  type: string 
}

const App = () => {

  const [start, setStart] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Question[]>([])
  const [number, setNumber] = useState(0)

  // Start Quiz
  const handleClick = async () => {
    setStart(true)
    setLoading(true)

    const data = await FetchData()
    setData(data)
    setLoading(false)

  }

  // shuffle answers
  const answers = (array: any[]) => [...array].sort(() => Math.random() - 0.5)


  return (
    <div className={styles.container}>
      <div className={styles.gitHub}>
        <a  className={styles.githubRepo} href="https://github.com/naveedaa">    
        <GitHubIcon width={"38px"}/>
        </a>
      </div>

      {/* Start Button  */}
        { !start 
        ? 
        <div className={styles.welcome}>
          
          <p className={styles.quote}>start your quiz with your intriguing question that engages the visitor</p>
          <button onClick={handleClick} className={styles.continueBtn}>Start The Quiz </button>
        </div>
        : null }
      
      {/* Loading */}
      {
        loading
        ?
        <div className={styles.loading}>
          <img src={loader} alt="loader" />
          <p>Please wait a moment...</p>
        </div>
        :
        null
      }

      { 
        start && !loading
        ? 
        <Hero
          question={data[number].question}
          setNumber={setNumber}
          number={number}
          answers={answers([...data[number].incorrect_answers, data[number].correct_answer])}
          questionNm={number + 1}
          correctAnswer={data[number].correct_answer}
          startQuiz={handleClick}
        /> 
          : null 
        }

    </div>
  );
}

export default App;
