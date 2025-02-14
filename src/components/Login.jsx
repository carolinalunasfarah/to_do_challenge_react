// hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// custom hook
import { useToast } from "../hooks/useToast";

// context
import { AuthContext } from "../context/AuthContext";

// components
import { ToastComponent } from "./ToastComponent";

// ionic
import {
    IonInput,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonButton,
    IonInputPasswordToggle,
} from "@ionic/react";

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, userIsLoggedIn } = useContext(AuthContext);

    const [user, setUser] = useState({});

    const { showToast, toast, setToast } = useToast();

    useEffect(() => {
        if (userIsLoggedIn) {
            navigate("/tasks");
        }
    }, [userIsLoggedIn, navigate]);

    const handleUser = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user.email || !user.password) {
            showToast("Campos obligatorios");
            return;
        }

        try {
            const { success, message } = await loginUser(user);

            if (success) {
                showToast("Inicio sesión exitoso");
                navigate(`/tasks`);
            } else {
                showToast(message || "Error al iniciar sesión");
            }
        } catch (error) {
            showToast("Error al iniciar sesión");
        }
    };

    return (
        <>
            <IonRow>
                <IonCol>
                    <article className="ion-text-center cursor_default">
                        <h1>Iniciar sesión</h1>
                    </article>
                    <section>
                        <form onSubmit={handleSubmit}>
                            <IonList>
                                <IonItem>
                                    <IonInput
                                        className="custom-helper-text"
                                        type="text"
                                        id="loginEmail"
                                        name="email"
                                        label="Email"
                                        value={user.email}
                                        onChange={handleUser}
                                        placeholder="Ingresa tu email"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput
                                        className="custom-helper-text"
                                        type="password"
                                        id="loginPassword"
                                        name="password"
                                        value={user.password}
                                        onChange={handleUser}
                                        label="Contraseña"
                                        placeholder="Ingresa tu contraseña">
                                        <IonInputPasswordToggle
                                            color="dark"
                                            slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonItem>
                            </IonList>

                            <article className="ion-text-center">
                                <IonButton
                                    className="btn_login"
                                    type="submit"
                                    shape="round">
                                    Iniciar Sesión
                                </IonButton>
                            </article>
                        </form>
                    </section>
                </IonCol>
            </IonRow>

            <ToastComponent toast={toast} setToast={setToast} />
        </>
    );
};

export default Login;
