const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name={props.name1.name} exercises={props.name1.exercises} />
      <Part name={props.name2.name} exercises={props.name2.exercises} />
      <Part name={props.name3.name} exercises={props.name3.exercises} />
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content name1={part1}
        name2={part2}
        name3={part3} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App