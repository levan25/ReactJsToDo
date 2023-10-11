import "./AppOriginal.css";
import { useState } from "react";
import Another from "../Another";
function App() {
  const [count, setCount] = useState(0);
  function decrement() {
    setCount(count - 1);
  }
  function increment() {
    setCount(count + 1);
  }
  return (
    <div className="App">
      <header className="App-header">
        <Another name="levani" />
        <div>
          <span>{count}</span>
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {true && <p>{3 + 2}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
