import { IonList } from "@ionic/react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleComplete, editTask, deleteTask }) => {
    return (
        <IonList>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    toggleComplete={toggleComplete}
                    editTask={editTask}
                    deleteTask={deleteTask}
                />
            ))}
        </IonList>
    );
};

export default TaskList;
