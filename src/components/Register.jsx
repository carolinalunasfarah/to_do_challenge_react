// hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
// custom hooks
import { useToast } from "../hooks/useToast";
import useFormValidation from "../hooks/useFormValidation";

// context
import { AuthContext } from "../context/AuthContext";

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

// components
import { ToastComponent } from "./ToastComponent";

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { showToast, toast, setToast } = useToast();

    const {
        values,
        errors,
        helperText,
        handleUser,
        handleBlur,
        validateField,
    } = useFormValidation({ name: "", email: "", password: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();

        validateField("name", values.name);
        validateField("email", values.email);
        validateField("password", values.password);

        if (errors.name || errors.email || errors.password) return;

        try {
            const result = await registerUser(
                values.name,
                values.email,
                values.password
            );

            if (result.success) {
                showToast("Registro exitoso");
                navigate(`/tasks`);
            } else if (!values.name || !values.email || !values.password) {
                showToast("Todos los campos son obligatorios");
            } else {
                showToast(result.message);
            }
        } catch (error) {
            showToast("Hubo un error en el registro");
        }
    };

    return (
        <>
            <IonRow>
                <IonCol>
                    <article className="ion-text-center cursor_default">
                        <h1>Crear cuenta</h1>
                    </article>
                    <section>
                        <form onSubmit={handleSubmit}>
                            <IonList>
                                <IonItem lines="none" className="form_item">
                                    <IonInput
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onIonInput={handleUser}
                                        onIonBlur={handleBlur}
                                        label="Nombre"
                                        placeholder="Ingresa tu nombre"
                                        helperText={helperText.name}
                                        errorText={errors.name}
                                        className={`custom_helper_text ${
                                            errors.name ? "ion-invalid" : ""
                                        }`}></IonInput>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonInput
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onIonInput={handleUser}
                                        onIonBlur={handleBlur}
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        helperText={helperText.email}
                                        errorText={errors.email}
                                        className={`custom_helper_text ${
                                            errors.email ? "ion-invalid" : ""
                                        }`}></IonInput>
                                </IonItem>
                                <IonItem lines="none">
                                    <IonInput
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onIonInput={handleUser}
                                        onIonBlur={handleBlur}
                                        label="Contraseña"
                                        placeholder="Ingresa una contraseña"
                                        helperText={helperText.password}
                                        errorText={errors.password}
                                        className={`custom_helper_text ${
                                            errors.password ? "ion-invalid" : ""
                                        }`}>
                                        <IonInputPasswordToggle
                                            color="dark"
                                            slot="end"></IonInputPasswordToggle>
                                    </IonInput>
                                </IonItem>
                            </IonList>

                            <article className="ion-text-center">
                                <IonButton
                                    className="btn_register"
                                    shape="round"
                                    type="submit">
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
