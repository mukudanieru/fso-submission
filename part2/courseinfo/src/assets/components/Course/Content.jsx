import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, idx) => (
        <Part key={idx} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

export default Content;
