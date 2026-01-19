import ContactList from "./assets/components/ContactList";
import Button from "./assets/components/Button";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleFullname = (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSetPersons = (e) => {
    e.preventDefault();

    const personObject = {
      id: crypto.randomUUID(),
      name: fullName,
      number: phoneNumber,
    };

    setPersons(persons.concat(personObject));

    setFullName("");
    setPhoneNumber("");
    setShowModal(!showModal);
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
        fullName={fullName}
        phoneNumber={phoneNumber}
        handleFullname={handleFullname}
        handlePhoneNumber={handlePhoneNumber}
        handleSetPersons={handleSetPersons}
      />
    </>
  );
};

const Modal = ({
  showModal,
  onClose,
  fullName,
  phoneNumber,
  handleFullname,
  handlePhoneNumber,
  handleSetPersons,
}) => {
  if (!showModal) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h1 className="title">Add Person</h1>

          <form id="personForm" onSubmit={handleSetPersons}>
            <div className="input-container-modal">
              <label htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={handleFullname}
              />
            </div>

            <div className="input-container-modal">
              <label htmlFor="phone-number">Phone Number</label>
              <input
                id="phone-number"
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumber}
              />
            </div>
          </form>

          <div className="modal-buttons">
            <button type="submit" form="personForm">
              Save
            </button>
            <Button onClick={onClose} title={"Close"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
