// hooks
import { createContext, useContext, useEffect, useState } from "react";

// context
import { AuthContext } from "./AuthContext";

// database tasks service
import {
    addTask,
    getUserTasks,
    updateTaskStatus,
    updateTaskTitle,
    deleteTask,
} from "../services/dbTasksService";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        if (!user) return;
        const tasksData = await getUserTasks(user.email);
        if (tasksData.lenght === 0) {
            console.log("Usuario sin tareas:", user.email);
        }
        setTasks(tasksData);
    };

    const addNewTask = async (title) => {
        if (!user) return;
        const result = await addTask(title, user.email);
        if (result.success) {
            setTasks([
                ...tasks,
                {
                    id: result.id,
                    title,
                    completed: false,
                    userEmail: user.email,
                },
            ]);
        }
    };

    const updateStatus = async (taskId, completed) => {
        const result = await updateTaskStatus(taskId, completed);
        if (result.success) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, completed } : task
                )
            );
        } else {
            console.error(
                "Error al actualizar el estado de la tarea:",
                result.error
            );
        }
    };

    const updateTitle = async (taskId, title) => {
        const result = await updateTaskTitle(taskId, title);
        if (result.success) {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, title } : task
                )
            );
        } else {
            console.error(
                "Error al actualizar el título de la tarea:",
                result.error
            );
        }
    };

    const removeTask = async (taskId) => {
        const result = await deleteTask(taskId);
        if (result.success) {
            setTasks(tasks.filter((task) => task.id !== taskId));
        }
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                addNewTask,
                updateStatus,
                updateTitle,
                removeTask,
            }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
