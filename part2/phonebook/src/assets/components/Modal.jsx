import { useState } from "react";
import Button from "./Button";

const Modal = ({ showModal, onClose, onAddPerson }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!showModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const personObject = {
      name: fullName,
      number: phoneNumber,
      id: crypto.randomUUID(),
    };

    onAddPerson(personObject);

    setFullName("");
    setPhoneNumber("");

    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h1 className="title">Add Person</h1>

          <form id="personForm" onSubmit={handleSubmit}>
            <div className="input-container-modal">
              <label htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
              />
            </div>

            <div className="input-container-modal">
              <label htmlFor="phone-number">Phone Number</label>
              <input
                id="phone-number"
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                required
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

export default Modal;
