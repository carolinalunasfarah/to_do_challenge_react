// ionic
import { IonRow, IonContent, IonPage } from "@ionic/react";

// components
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <TaskForm />
                <IonRow className="ion-justify-content-center ion-padding">
                    <h3>Listado de tareas</h3>
                </IonRow>
                <IonRow className="ion-justify-content-center">
                    <TaskList classname="ion-justify-content-center" />
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default TasksPage;
