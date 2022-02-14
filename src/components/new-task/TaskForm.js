import { useRef } from "react";
import classes from "./TaskForm.module.css";

const TaskForm = props => {
  const taskInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();
    const enteredTask = taskInputRef.current.value;
    if (enteredTask.trim().length > 0) {
      props.onEnterTask(enteredTask);
    }
    taskInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input ref={taskInputRef} type="text" />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
