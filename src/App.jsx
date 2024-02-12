import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TaskManager from "./components/taskmanager";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="mx-5 antialiased underline">Niraj</h1>
      <TaskManager></TaskManager>
    </>
  );
}

export default App;
