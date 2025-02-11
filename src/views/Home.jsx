import { IonCol, IonGrid, IonRow } from "@ionic/react";
import Register from "../components/Register";
import Login from "../components/Login";

const Home = () => {
    return (
        <main>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h1 className="ion-text-center">
                            ¡Te damos la bienvenida!
                        </h1>
                        <article>
                            <p className="ion-text-center">
                                Esta es una plataforma para que puedas gestionar
                                tareas
                            </p>
                        </article>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-evenly forms_height">
                    <IonCol size="4" className="same-height">
                        <Register />
                    </IonCol>
                    <IonCol size="4" className="same-height">
                        <Login />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </main>
    );
};

export default Home;
