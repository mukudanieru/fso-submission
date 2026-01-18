const Footer = ({ parts }) => {
  const total = parts.reduce((accumulator, item) => {
    return accumulator + item.exercises;
  }, 0);

  return (
    <>
      <b>
        <p>Total of {total} exercises</p>
      </b>
    </>
  );
};

export default Footer;
