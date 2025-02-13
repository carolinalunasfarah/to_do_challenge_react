import {
    IonInput,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonButton,
    IonInputPasswordToggle,
} from "@ionic/react";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import { useToast } from "../hooks/toastAlert";
import { ToastComponent } from "./ToastComponent";

// validations
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRegex = /^[A-Za-z\s]+$/i;

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { showToast, toast, setToast } = useToast();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleUser = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, name, password } = user;

        if (!email || !name || !password) {
            showToast("Debes rellenar todos los campos");
            return;
        }

        if (!nameRegex.test(name)) {
            showToast("El nombre no puede contener caracteres especiales");
            return;
        }

        if (!emailRegex.test(email)) {
            showToast("El email no es válido");
            return;
        }

        try {
            const success = await registerUser(name, email, password);
            if (success) {
                if (success) {
                    showToast("Registro exitoso");
                    navigate(`/tasks`);
                } else {
                    showToast("Error al registrar usuario");
                }
            }
        } catch (error) {
            showToast("Hubo un error en el registro");
        }
    };

    return (
        <>
            <IonRow>
                <IonCol>
                    <article className="ion-text-center">
                        <h1>Crear cuenta</h1>
                    </article>
                    <section>
                        <form onSubmit={handleSubmit}>
                            <IonList>
                                <IonItem>
                                    <IonInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={user.name}
                                        onChange={handleUser}
                                        label="Nombre"
                                        placeholder="Ingresa tu nombre"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleUser}
                                        label="Email"
                                        placeholder="Ingresa tu email"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleUser}
                                        label="Contraseña"
                                        placeholder="Ingresa una contraseña">
                                        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonItem>
                            </IonList>

                            <article className="ion-text-center">
                                <IonButton shape="round" type="submit">
                                    Registrarse
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

export default Register;
