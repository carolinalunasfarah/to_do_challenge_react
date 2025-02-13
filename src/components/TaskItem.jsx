// hooks
import { useContext, useRef, useState } from "react";

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

const TaskItem = ({ task }) => {
    const { updateStatus, updateTitle, removeTask } = useContext(TasksContext);

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
            updateTitle(task.id, newTitle);
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
                onIonChange={(e) => updateStatus(task.id, e.detail.checked)}
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

            <IonButton
                size="large"
                fill="clear"
                onClick={() => setIsEditing(true)}>
                <IonIcon icon={createOutline} />
            </IonButton>

            <IonButton
                size="large"
                fill="clear"
                color="danger"
                onClick={() => removeTask(task.id)}>
                <IonIcon icon={trashOutline} />
            </IonButton>
        </IonItem>
    );
};

export default TaskItem;
