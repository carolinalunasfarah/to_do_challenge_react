// hooks
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// custom hooks
import useDelayEffect from "../hooks/useDelayEffect";

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

const Navigation = () => {
    const { logOut, userIsLoggedIn, userName, loadingName } =
        useContext(AuthContext);

    const [displayName, setDisplayName] = useState("Cargando...");

    const navigate = useNavigate();

    // delay user name display
    useDelayEffect(
        () => {
            setDisplayName(userName || "Usuario");
        },
        1500,
        [loadingName, userName]
    );

    const handleLogOut = () => {
        logOut();
        navigate("/");
    };

    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle className="cursor_default text_white">
                    {userIsLoggedIn
                        ? loadingName
                            ? "Cargando..."
                            : `¡Hola, ${displayName} este es tu listado de tareas!`
                        : "Listado de tareas"}
                </IonTitle>
                {userIsLoggedIn ? (
                    <IonButtons slot="end">
                        <IonButton
                            className="btn_logout"
                            shape="round"
                            onClick={handleLogOut}>
                            Cerrar Sesión
                        </IonButton>
                    </IonButtons>
                ) : null}
            </IonToolbar>
        </IonHeader>
    );
};

export default Navigation;
