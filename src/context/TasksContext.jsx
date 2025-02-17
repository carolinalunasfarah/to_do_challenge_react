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

    // fetch and clean tasks
    useEffect(() => {
        if (user) {
            fetchTasks();
        } else {
            setTasks([]);
        }
    }, [user]);

    const addNewTask = async (title) => {
        if (!user) return;

        try {
            const result = await addTask(title, user.email);

            if (result.success) {
                fetchTasks();
            } else {
                console.error("Error al añadir tarea", result.error);
            }
        } catch (error) {
            console.error("Error al añadir tarea", error);
        }
    };

    const fetchTasks = async () => {
        if (!user) return;

        try {
            const tasksData = await getUserTasks(user.email);

            if (!tasksData) {
                console.error("Error al obtener tareas");
            }

            setTasks((prevTasks) => [
                ...prevTasks,
                ...tasksData.filter(
                    (newTask) =>
                        !prevTasks.some((task) => task.id === newTask.id)
                ),
            ]);
        } catch (error) {
            console.error("Error al obtener tareas", error);
        }
    };

    const updateStatus = async (taskId, completed) => {
        try {
            const result = await updateTaskStatus(taskId, completed);

            if (result.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, completed } : task
                    )
                );
            } else {
                console.error(
                    "Error al actualizar estado de tarea",
                    result.error
                );
            }
        } catch (error) {
            console.error("Error al actualizar estado de tarea", error);
        }
    };

    const updateTitle = async (taskId, title) => {
        try {
            const result = await updateTaskTitle(taskId, title);
            if (result.success) {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, title } : task
                    )
                );
            } else {
                console.error(
                    "Error al actualizar el título de tarea",
                    result.error
                );
            }
        } catch (error) {
            console.error("Error al actualizar titulo de tarea", error);
        }
    };

    const removeTask = async (taskId) => {
        try {
            const result = await deleteTask(taskId);
            if (result.success) {
                setTasks(tasks.filter((task) => task.id !== taskId));
            } else {
                console.error("Error al eliminar tarea", result.error);
            }
        } catch (error) {
            console.error("Error al eliminar tarea", error);
        }
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                fetchTasks,
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
