import { useState } from "react";
import Section from "../ui/Section";
import TaskForm from "./TaskForm";

const NewTask = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const enterTaskHandler = async taskText => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://http-requests-ebdd0-default-rtdb.firebaseio.com/tasks.json", {
        method: "POST",
        body: JSON.stringify({ text: taskText }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Request failed!");
      const data = await response.json();

      const createdTask = { id: data.name, text: taskText }; // firebase-specific => "name" contains generated id
      props.onAddTask(createdTask);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
