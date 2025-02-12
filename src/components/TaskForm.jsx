import { IonInput, IonButton, IonRow, IonCol } from "@ionic/react";
import { useState } from "react";

const TaskForm = ({ addTask }) => {
    const [taskTitle, setTaskTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskTitle.trim() === "") return;

        addTask(taskTitle);
        setTaskTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <IonRow>
                <IonCol>
                    <IonInput
                        type="text"
                        id="title"
                        name="taskTitle"
                        label="Tarea"
                        placeholder="Nueva Tarea"
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
