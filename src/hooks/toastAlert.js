// hooks
import { useState } from "react";

export const useToast = () => {
    const [toast, setToast] = useState({
        isOpen: false,
        message: "",
        duration: 2000,
    });

    const showToast = (message) => {
        setToast({ isOpen: true, message, duration: 2000 });
    };

    return { showToast, toast, setToast };
};
