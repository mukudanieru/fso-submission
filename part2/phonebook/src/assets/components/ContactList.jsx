import Contact from "./Contact";

const ContactList = ({ persons }) => {
  if (persons.length === 0)
    return (
      <ol>
        <div>Empty, add some!</div>
      </ol>
    );

  return (
    <ol>
      {persons.map((person) => (
        <Contact key={person.id} person={person} />
      ))}
    </ol>
  );
};

export default ContactList;
