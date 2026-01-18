import Course from "./assets/components/Course/Course";
import courses from "./data/course";

const App = () => {
  return (
    <>
      {courses.map((course, idx) => {
        return <Course key={idx} course={course} />;
      })}
    </>
  );
};

export default App;
