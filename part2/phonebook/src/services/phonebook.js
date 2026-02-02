import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const response = axios.get(baseURL);
  return response.then((response) => {
    return response.data;
  });
};

const createPerson = (personObject) => {
  const response = axios.post(baseURL, personObject);
  return response.then((response) => {
    return response.data;
  });
};

const updatePerson = (id, personObject) => {
  const response = axios.put(`${baseURL}/${id}`, personObject);
  return response.then((response) => {
    return response.data;
  });
};

const deletePerson = (id) => {
  const response = axios.delete(`${baseURL}/${id}`);
  return response.then((response) => {
    return response.data;
  });
};

const errorMessage = (error, setError) => {
  if (error.response) {
    setError(`Server error (${error.response.status})`);
  } else if (error.request) {
    setError("Cannot connect to server. Is the backend running?");
  } else {
    setError("Something went wrong");
  }
};

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
  errorMessage,
};
