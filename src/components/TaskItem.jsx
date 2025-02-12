import {
    IonItem,
    IonLabel,
    IonCheckbox,
    IonIcon,
    IonButton,
    IonInput,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import { useState, useRef } from "react";

const TaskItem = ({ task, toggleComplete, editTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const inputRef = useRef(null);

    const handleInputChange = () => {
        const inputElement = inputRef.current;
        if (inputElement) {
            setNewTitle(inputElement.value);
        }
    };

    const handleEdit = () => {
        if (newTitle.trim() !== "" && newTitle !== task.title) {
            editTask(task.id, newTitle);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleEdit();
        }
    };

    return (
        <IonItem>
            <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleComplete(task.id)}
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
                <IonLabel onClick={() => setIsEditing(true)}>
                    {task.title}
                </IonLabel>
            )}

            <IonButton fill="clear" onClick={() => setIsEditing(true)}>
                <IonIcon icon={createOutline} />
            </IonButton>

            <IonButton
                fill="clear"
                color="danger"
                onClick={() => deleteTask(task.id)}>
                <IonIcon icon={trashOutline} />
            </IonButton>
        </IonItem>
    );
};

export default TaskItem;
