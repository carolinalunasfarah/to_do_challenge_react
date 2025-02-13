// hooks
import { useContext, useState } from "react";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import { IonInput, IonButton, IonRow, IonCol } from "@ionic/react";

const TaskForm = () => {
    const { addNewTask } = useContext(TasksContext);
    const [taskTitle, setTaskTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            console.log("Adding new task:", taskTitle);
            addNewTask(taskTitle);
            setTaskTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <IonRow className="ion-justify-content-center ion-padding">
                <h3>Agregar tarea</h3>
            </IonRow>
            <IonRow className="ion-justify-content-center">
                <IonCol size="4">
                    <IonInput
                        type="text"
                        id="title"
                        name="taskTitle"
                        label="Tarea"
                        placeholder="Nueva Tarea"
                        className="ion-text-center"
                        value={taskTitle}
                        onIonInput={(e) =>
                            setTaskTitle(e.target.value)
                        }></IonInput>
                </IonCol>
                <article>
                    <IonButton type="submit" shape="round">
                        Agregar
                    </IonButton>
                </article>
            </IonRow>
        </form>
    );
};

export default TaskForm;
