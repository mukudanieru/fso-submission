const express = require("express");
var morgan = require("morgan");

const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/info", (req, res) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date = new Date();

  res.send(`${info}<br><br>${date}`);
});

const API_BASE_URL = "/api/persons/";

app.get(API_BASE_URL, (req, res) => {
  res.json(persons);
});

app.get(`${API_BASE_URL}:id`, (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === id);

  console.log(person);

  if (!person) {
    return res.status(404).json({ error: "missing person" });
  }

  res.json(person);
});

app.delete(`${API_BASE_URL}:id`, (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
  return String(maxId + 1);
};

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :response-time[0] - :total-time ms :body"),
);

app.post(API_BASE_URL, (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "name and number are required",
    });
  }

  if (persons.some((p) => p.name === name)) {
    return res.status(409).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name,
    number,
  };

  console.log(person);

  persons = persons.concat(person);

  res.status(201).json(person);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
