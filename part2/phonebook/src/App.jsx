import ContactList from "./assets/components/ContactList";
import Modal from "./assets/components/Modal";
import Button from "./assets/components/Button";
import phonebookService from "./services/phonebook";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("useEffect ran");

    phonebookService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        phonebookService.errorMessage(error, setError);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleAddPerson = (personObject) => {
    const existingPerson = persons.find((p) => p.name === personObject.name);

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        phonebookService
          .updatePerson(existingPerson.id, personObject)
          .then((data) => {
            setPersons(
              persons.map((p) => {
                return p.id === existingPerson.id ? data : p;
              }),
            );
          });
      }

      return;
    }

    phonebookService
      .createPerson(personObject)
      .then((data) => {
        setPersons(persons.concat(data));
      })
      .catch((error) => {
        phonebookService.errorMessage(error, setError);
      });
  };

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService
        .deletePerson(id)
        .then((data) => {
          const updatedPersons = persons.filter((p) => p.id !== data.id);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          phonebookService.errorMessage(error, setError);
        });
    }

    return;
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

        <ContactList
          persons={filtered}
          error={error}
          handleDeletePerson={handleDeletePerson}
        />
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
