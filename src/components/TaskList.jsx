// hooks
import { useContext, useEffect, useState } from "react";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import { IonList, IonSpinner, IonText } from "@ionic/react";

// components
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useContext(TasksContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [tasks]);

    return (
        <IonList className="task_list">
            {loading ? (
                <article className="ion-text-center">
                    <IonSpinner name="crescent" slot="center" />
                </article>
            ) : tasks.length > 0 ? (
                tasks.map((task) => <TaskItem key={task.id} task={task} />)
            ) : (
                <IonText>
                    <p>No tienes tareas pendientes 📝</p>
                </IonText>
            )}
        </IonList>
    );
};

export default TaskList;
