import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Statistics = ({ good, neutral, bad }) => {
  if ((good + neutral + bad) > 0) {
    return (
      <>
        <Header text='statistics' />
        <div> good {good}</div>
        <div> neutral {neutral} </div>
        <div> bad {bad} </div>
        <div> all {good + neutral + bad}</div>
        <div> average {(good - bad) / (good + neutral + bad)}</div>
        <div> positive {((good) / (good + neutral + bad)) * 100} %</div>
      </>
    )
  } else {
    return (
      <>
        <Header text='statistics' />
        <div> No feedback given </div>
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text='give feedback' />
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
