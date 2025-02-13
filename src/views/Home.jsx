// ionic
import { IonCol, IonGrid, IonRow } from "@ionic/react";

// components
import Register from "../components/Register";
import Login from "../components/Login";

const Home = () => {
    return (
        <main>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h1 className="ion-text-center cursor_default">
                            ¡Te damos la bienvenida!
                        </h1>
                        <article>
                            <p className="ion-text-center cursor_default">
                                Esta es una plataforma para que puedas gestionar
                                tareas
                            </p>
                        </article>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-justify-content-evenly">
                    <IonCol size="4" className="form_container">
                        <Register />
                    </IonCol>
                    <IonCol size="4" className="form_container">
                        <Login />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </main>
    );
};

export default Home;
