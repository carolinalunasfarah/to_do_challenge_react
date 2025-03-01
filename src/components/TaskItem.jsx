// hooks
import { useContext, useRef, useState } from "react";
// custom hook
import { useToast } from "../hooks/useToast";

// context
import { TasksContext } from "../context/TasksContext";

// ionic
import {
    IonItem,
    IonLabel,
    IonCheckbox,
    IonIcon,
    IonButton,
    IonInput,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";

// components
import { ToastComponent } from "./ToastComponent";

const TaskItem = ({ task }) => {
    const { updateStatus, updateTitle, removeTask } = useContext(TasksContext);

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    
    // alerts
    const { showToast, toast, setToast } = useToast();

    // create reference for input element
    const inputRef = useRef(null);

    // get and update input value
    const handleInputChange = () => {
        const inputElement = inputRef.current;
        if (inputElement) {
            setNewTitle(inputElement.value);
        }
    };

    const handleEdit = () => {
        if (newTitle.trim() !== "" && newTitle !== task.title) {
            updateTitle(task.id, newTitle);
            showToast("Tarea actualizada");
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEdit();
        }
    };

    const handleDelete = () => {
        removeTask(task.id);
        showToast("Tarea eliminada correctamente");
    };

    return (
        <>
            <IonItem>
                <article className="task_title_container">
                    <IonCheckbox
                        checked={task.completed}
                        onIonChange={(e) =>
                            updateStatus(task.id, e.detail.checked)
                        }
                    />

                    {isEditing ? (
                        <IonInput
                            ref={inputRef}
                            value={newTitle}
                            onIonInput={handleInputChange}
                            onBlur={handleEdit}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <IonLabel
                            onClick={() => setIsEditing(true)}
                            className={`task_title ${
                                task.completed ? "completed" : ""
                            }`}>
                            {task.title}
                        </IonLabel>
                    )}

                    {isEditing && (
                        <p className="edit_helper">
                            Presiona Enter para guardar
                        </p>
                    )}
                </article>

                <IonButton
                    slot="end"
                    size="large"
                    fill="clear"
                    onClick={() => setIsEditing(true)}>
                    <IonIcon className="icon_edit" icon={createOutline} />
                </IonButton>

                <IonButton
                    slot="end"
                    size="large"
                    fill="clear"
                    onClick={handleDelete}>
                    <IonIcon className="icon_delete" icon={trashOutline} />
                </IonButton>
            </IonItem>

            <ToastComponent toast={toast} setToast={setToast} />
        </>
    );
};

export default TaskItem;
