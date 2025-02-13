// ionic
import { IonList } from "@ionic/react";

// components
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
    return (
        <>
            <IonList className="task_list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </IonList>
        </>
    );
};

export default TaskList;
