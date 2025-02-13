// hooks
import { useContext } from "react";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import { IonRow } from "@ionic/react";

// components
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage = () => {
    const { tasks } = useContext(TasksContext);

    return (
        <>
            <TaskForm />
            <IonRow className="ion-justify-content-center ion-padding">
                <h3>Listado de tareas</h3>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <TaskList
                    tasks={tasks}
                    classname="ion-justify-content-center"
                />
            </IonRow>
        </>
    );
};

export default TasksPage;
