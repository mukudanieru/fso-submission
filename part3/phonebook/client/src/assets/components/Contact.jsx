import Button from "./Button";

const Contact = ({ person, handleDeletePerson }) => {
  const handleDeleteBtn = () => {
    handleDeletePerson(person.id);
  };

  return (
    <li>
      {person.name} - {person.number}
      <Button onClick={handleDeleteBtn} title={"delete"} />
    </li>
  );
};

export default Contact;
