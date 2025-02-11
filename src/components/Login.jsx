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
    return (
        <IonRow>
            <IonCol>
                <article className="ion-text-center">
                    <h1>Iniciar sesión</h1>
                </article>
                <section>
                    <form action="">
                        <IonList>
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
                                    placeholder="Ingresa tu contraseña">
                                    <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                                </IonInput>
                            </IonItem>
                        </IonList>

                        <article className="ion-text-center">
                            <IonButton shape="round">Iniciar Sesión</IonButton>
                        </article>
                    </form>
                </section>
            </IonCol>
        </IonRow>
    );
};

export default Login;
