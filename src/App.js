import { useEffect, useState } from "react";
import Tasks from "./components/tasks/Tasks";
import NewTask from "./components/new-task/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const { isLoading, error, sendRequest: fetchTasksRequest } = useHttp();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const transformTasks = tasksObj => {
      const loadedTasks = [];
      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };
    fetchTasksRequest({ url: "https://http-requests-ebdd0-default-rtdb.firebaseio.com/tasks.json" }, transformTasks);
  }, [fetchTasksRequest]);

  const taskAddHandler = task => setTasks(prevTasks => prevTasks.concat(task));

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks tasks={tasks} loading={isLoading} error={error} onFetch={fetchTasksRequest} />
    </>
  );
}

export default App;
