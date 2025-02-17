// hooks
import { useContext, useState } from "react";
// custom hooks
import useDelayEffect from "../hooks/useDelayEffect";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import { IonList, IonSpinner, IonText } from "@ionic/react";

// components
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useContext(TasksContext);

    const [loading, setLoading] = useState(true);

    // delay tasks list display
    useDelayEffect(
        () => {
            setLoading(false);
        },
        1500,
        [tasks]
    );

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
