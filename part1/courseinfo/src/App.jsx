const Header = ({ course }) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = ({ key, part, exercise }) => {
  return (
    <>
      <p key={key}>
        {part} {exercise}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, idx) => (
        <Part key={idx} part={part.name} exercise={part.exercise} />
      ))}
    </>
  );
};

const Footer = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((accumulator, item) => {
          return accumulator + item.exercise;
        }, 0)}
      </p>
    </>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [
    { name: part1, exercise: exercises1 },
    { name: part2, exercise: exercises2 },
    { name: part3, exercise: exercises3 },
  ];

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Footer parts={parts} />
      </div>
    </>
  );
};

export default App;
