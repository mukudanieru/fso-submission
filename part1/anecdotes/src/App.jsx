import { useState } from "react";
import { getRandomInt } from "./assets/helper/helper";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  console.log(votes);
  console.log(selected);

  const getAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length - 1));
  };

  const addVote = (idx) => {
    const copy = [...votes];
    copy[idx]++;
    setVotes(copy);
  };

  const mostVotes = votes.reduce((mostVotes, current, index, arr) => {
    return current > arr[mostVotes] ? index : mostVotes;
  }, 0);

  console.log(mostVotes);

  return (
    <>
      <AnecdoteDisplay
        title={"Anecdote of the day"}
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button
        onClick={() => {
          addVote(selected);
        }}
        title={"Vote"}
      />
      <Button onClick={getAnecdote} title={"Next Anecdote"} />
      <AnecdoteDisplay
        title={"Anecdote with most votes"}
        anecdotes={anecdotes}
        votes={votes}
        selected={mostVotes}
      />
    </>
  );
};

const AnecdoteDisplay = ({ title, anecdotes, votes, selected }) => {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <div>{anecdotes[selected]}</div>
        <div>has {votes[selected]} votes</div>
      </div>
    </>
  );
};

const Button = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

export default App;
