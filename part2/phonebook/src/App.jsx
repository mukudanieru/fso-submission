import ContactList from "./assets/components/ContactList";
import Modal from "./assets/components/Modal";
import Button from "./assets/components/Button";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleAddPerson = (personObject) => {
    setPersons(persons.concat(personObject));
  };

  let filtered = persons.filter((person) => {
    return person.name.toLowerCase().startsWith(search.toLowerCase());
  });

  return (
    <>
      <div>
        <h1>Phonebook</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <Button onClick={handleShowModal} title={"Add"} />
        </div>

        <ContactList persons={filtered} />
      </div>

      <Modal
        showModal={showModal}
        onClose={handleShowModal}
        onAddPerson={handleAddPerson}
      />
    </>
  );
};

export default App;
