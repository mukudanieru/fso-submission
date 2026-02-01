import ContactList from "./assets/components/ContactList";
import Modal from "./assets/components/Modal";
import Button from "./assets/components/Button";
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("useEffect ran");

    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setError(`Server error (${error.response.status})`);
        } else if (error.request) {
          setError("Cannot connect to server. Is the backend running?");
        } else {
          setError("Something went wrong");
        }
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleAddPerson = (personObject) => {
    setPersons(persons.concat(personObject));
  };

  console.log(persons);

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

        <ContactList persons={filtered} error={error} />
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
