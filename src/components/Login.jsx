import {
    IonInput,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonButton,
} from "@ionic/react";

const Login = () => {
    return (
        <IonRow>
            <IonCol>
                <h1>Ingresar</h1>
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
                                    id="password"
                                    name="password"
                                    label="Contraseña"
                                    placeholder="Ingresa una contraseña"></IonInput>
                            </IonItem>
                        </IonList>

                        <article>
                            <IonButton>Iniciar Sesión</IonButton>
                        </article>
                    </form>
                </section>
            </IonCol>
        </IonRow>
    );
};

export default Login;
