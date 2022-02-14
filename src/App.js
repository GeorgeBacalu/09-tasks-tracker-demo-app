import { useEffect, useState } from "react";
import Tasks from "./components/tasks/Tasks";
import NewTask from "./components/new-task/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async taskText => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/tasks.json");
      if (!response.ok) throw new Error("Request failed!");
      const data = await response.json();

      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  useEffect(() => fetchTasks(), []);

  const taskAddHandler = task => setTasks(prevTasks => prevTasks.concat(task));

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks tasks={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
    </>
  );
}

export default App;
