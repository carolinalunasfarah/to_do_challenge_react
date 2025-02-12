import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import { useState } from "react";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (title) => {
        const newTask = {
            id: tasks.length + 1,
            title: title,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };

    const toggleComplete = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };

    const editTask = (taskId, newTitle) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, title: newTitle } : task
        )
      );
    };

    const deleteTask = (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    return (
        <>
            <TaskForm addTask={addTask} />
            <TaskList
                tasks={tasks}
                toggleComplete={toggleComplete}
                editTask={editTask}
                deleteTask={deleteTask}
            />
        </>
    );
};

export default TasksPage;
