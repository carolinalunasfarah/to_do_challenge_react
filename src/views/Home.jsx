import { IonCol, IonGrid, IonRow } from "@ionic/react";
import Register from "../components/Register";
import Login from "../components/Login";

const Home = () => {
    return (
        <main>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <Register />
                    </IonCol>
                    <IonCol>
                        <Login />
                    </IonCol>
                </IonRow>
            </IonGrid>
        </main>
    );
};

export default Home;
