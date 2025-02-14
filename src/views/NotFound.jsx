// hooks
import { useNavigate } from "react-router-dom";

// ionic
import { IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";

const NotFound = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    return (
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol>
                    <h1 className="ion-text-center cursor_default">
                        ¡Ups, página no encontrada!
                    </h1>
                    <article>
                        <p className="ion-text-center cursor_default">
                            Te invitamos a volver a la página principal
                        </p>
                    </article>
                    <IonRow className="ion-justify-content-center">
                        <IonCol className="ion-text-center">
                            <IonButton
                                className="btn_logout"
                                shape="round"
                                onClick={handleClick}>
                                Volver al home
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default NotFound;
