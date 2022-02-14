import useHttp from "../../hooks/use-http";
import Section from "../ui/Section";
import TaskForm from "./TaskForm";

const NewTask = props => {
  const { isLoading, error, sendRequest: postTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const createdTask = { id: taskData.name, text: taskText }; // firebase-specific => "name" contains generated id
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async taskText => {
    postTaskRequest(
      {
        url: "https://http-requests-ebdd0-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
