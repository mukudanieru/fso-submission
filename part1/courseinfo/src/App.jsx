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
          return accumulator + item.exercises;
        }, 0)}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Footer parts={course.parts} />
      </div>
    </>
  );
};

export default App;
