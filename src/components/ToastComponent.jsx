// ionic
import { IonToast } from "@ionic/react";

export const ToastComponent = ({ toast, setToast }) => (
    <IonToast
        isOpen={toast.isOpen}
        message={toast.message}
        duration={toast.duration}
        onDidDismiss={() => setToast({ ...toast, isOpen: false })}></IonToast>
);
