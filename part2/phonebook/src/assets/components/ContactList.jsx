import Contact from "./Contact";

const ContactList = ({ persons, error, handleDeletePerson }) => {
  if (error) {
    return (
      <ol>
        <div>{error}</div>
      </ol>
    );
  }

  if (persons.length === 0)
    return (
      <ol>
        <div>Empty, add some!</div>
      </ol>
    );

  return (
    <ol>
      {persons.map((person) => (
        <Contact
          key={person.id}
          person={person}
          handleDeletePerson={handleDeletePerson}
        />
      ))}
    </ol>
  );
};

export default ContactList;
