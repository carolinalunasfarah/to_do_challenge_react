// hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";

// ionic
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
} from "@ionic/react";

function Navigation() {
    const { logOut, userIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
        navigate("/");
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle className="cursor_default">Listado de tareas</IonTitle>
                {userIsLoggedIn ? (
                    <IonButtons slot="primary">
                        <IonButton
                            fill="solid"
                            slot="end"
                            onClick={handleLogOut}>
                            Cerrar Sesión
                        </IonButton>
                    </IonButtons>
                ) : null}
            </IonToolbar>
        </IonHeader>
    );
}

export default Navigation;
