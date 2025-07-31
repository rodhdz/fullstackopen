import { useState } from 'react'

const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Statistics = ({ good, neutral, bad }) => {
  if ((good + neutral + bad) > 0) {
    return (
      <>
        <Header text='statistics' />
        <Statisticline text='good' value={good} />
        <Statisticline text='neutral' value={neutral} />
        <Statisticline text='bad' value={bad} />
        <Statisticline text='all' value={good + neutral + bad} />
        <Statisticline text='average' value={(good - bad) / (good + neutral + bad)} />
        <Statisticline text='positive' value={((good) / (good + neutral + bad)) * 100} />
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

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}> {text} </button>
    </>
  )
}

const Statisticline = ({ text, value }) => {
  if (text == 'positive') {
    return (
      <>
        <div> {text} {value} %</div>
      </>
    )
  } else {
    return (
      <>
        <div> {text} {value} </div>
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
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
