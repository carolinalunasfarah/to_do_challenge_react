// ionic
import { IonList } from "@ionic/react";

// components
import TaskItem from "./TaskItem";
import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

const TaskList = () => {
  
  const { tasks } = useContext(TasksContext);
    return (
            <IonList className="task_list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </IonList>
    );
};

export default TaskList;
