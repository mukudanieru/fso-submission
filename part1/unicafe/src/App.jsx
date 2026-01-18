import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood(good + 1);
  };

  const incrementNeutral = () => {
    setNeutral(neutral + 1);
  };

  const incrementBad = () => {
    setBad(bad + 1);
  };

  const stats = {
    good,
    neutral,
    bad,
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={incrementGood} title={"good"} />
        <Button onClick={incrementNeutral} title={"neutral"} />
        <Button onClick={incrementBad} title={"bad"} />
      </div>
      <Statistics stats={stats} />
    </>
  );
};

const Button = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

const Statistics = ({ stats }) => {
  const total = Object.values(stats).reduce((acc, value) => acc + value, 0);

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    );
  }

  const average =
    total === 0
      ? 0
      : (stats.good * 1 + stats.neutral * 0 + stats.bad * -1) / total;

  const positive = total === 0 ? 0 : (stats.good / total) * 100;

  return (
    <>
      <div>
        <h1>statistics</h1>

        <table>
          <thead>
            {/* Header */}
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>

          <tbody>
            {/* Body */}
            <StatisticLine text="good" value={stats.good} />
            <StatisticLine text="neutral" value={stats.neutral} />
            <StatisticLine text="bad" value={stats.bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value}
        {text === "positive" ? "%" : null}
      </td>
    </tr>
  );
};

export default App;
