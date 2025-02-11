import {
    IonInput,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonButton,
} from "@ionic/react";

const Register = () => {
    return (
        <IonRow>
            <IonCol>
                <h1>Crear cuenta</h1>
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
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    placeholder="Ingresa una contraseña"></IonInput>
                            </IonItem>
                        </IonList>

                        <article>
                            <IonButton>Registrarse</IonButton>
                        </article>
                    </form>
                </section>
            </IonCol>
        </IonRow>
    );
};

export default Register;
