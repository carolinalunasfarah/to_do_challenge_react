import {
    IonInput,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonButton,
    IonInputPasswordToggle,
} from "@ionic/react";

const Register = () => {
    return (
        <IonRow className="form_container">
            <IonCol>
                <article className="ion-text-center">
                    <h1>Crear cuenta</h1>
                </article>
                <section>
                    <form action="">
                        <IonList>
                            <IonItem>
                                <IonInput
                                    type="text"
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    placeholder="Ingresa tu nombre"></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    type="text"
                                    id="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Ingresa tu email"></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonInput
                                    type="password"
                                    label="Contraseña"
                                    placeholder="Ingresa una contraseña">
                                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                </IonInput>
                            </IonItem>
                        </IonList>

                        <article className="ion-text-center">
                            <IonButton shape="round">Registrarse</IonButton>
                        </article>
                    </form>
                </section>
            </IonCol>
        </IonRow>
    );
};

export default Register;
