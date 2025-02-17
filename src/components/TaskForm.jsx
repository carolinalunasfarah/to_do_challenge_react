// hooks
import { useContext, useState } from "react";
// custom hook
import { useToast } from "../hooks/useToast";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import { IonInput, IonButton, IonRow, IonCol } from "@ionic/react";

// components
import { ToastComponent } from "./ToastComponent";

const TaskForm = () => {
    const { addNewTask } = useContext(TasksContext);

    const [taskTitle, setTaskTitle] = useState("");

    // alerts
    const { showToast, toast, setToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskTitle) {
            showToast("Nombre de tarea necesario");
            return;
        }

        await addNewTask(taskTitle);
        setTaskTitle("");
        showToast("Tarea agregada correctamente");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <IonRow className="ion-justify-content-center ion-padding form_title">
                    <h3>Agregar tarea</h3>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="4">
                        <IonInput
                            color="light"
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
                        <IonButton
                            className="btn_add"
                            type="submit"
                            shape="round">
                            Agregar
                        </IonButton>
                    </article>
                </IonRow>
            </form>

            <ToastComponent toast={toast} setToast={setToast} />
        </>
    );
};

export default TaskForm;
