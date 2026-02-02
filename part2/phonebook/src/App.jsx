import ContactList from "./assets/components/ContactList";
import Modal from "./assets/components/Modal";
import Button from "./assets/components/Button";
import Notification from "./assets/components/Notification";

import phonebookService from "./services/phonebook";
import { createNotification } from "./utils/notification";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(null); // type, title, description

  useEffect(() => {
    console.log("useEffect ran");

    phonebookService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        const message = error.request
          ? "Cannot connect to server. Is the backend running?"
          : "Something went wrong!";

        setNotificationMessage(
          createNotification("Request Error", message, "error"),
        );
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

        setNotificationMessage(
          createNotification(
            "Contact Added",
            `${personObject.name} has been added`,
          ),
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        const message = error.request
          ? "Cannot connect to server. Is the backend running?"
          : "Something went wrong!";

        setNotificationMessage(
          createNotification("Request Error", message, "error"),
        );
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
        .catch(() => {
          setNotificationMessage(
            createNotification(
              "Request Error",
              `Information of ${personToDelete.name} has already been removed from server.`,
              "error",
            ),
          );
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
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

        <Notification message={notificationMessage} />

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
