//hooks
import { useState } from "react";

// validations
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRegex = /^[A-Za-z\s]+$/i;
const passwordMinLength = 6;

const useFormValidation = (initialState) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [helperText, setHelperText] = useState({
        name: "Solo letras y espacios",
        email: "Debe ser un email válido",
        password: "Mínimo 6 caracteres",
    });

    const validateField = (name, value) => {
        let error = "";
        let helper = "";

        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "El nombre es obligatorio";
                    helper = "Solo letras y espacios";
                } else if (!nameRegex.test(value)) {
                    error = "No se permiten caracteres especiales";
                    helper = "Evita caracteres especiales";
                } else {
                    helper = "✅ Formato válido";
                }
                break;
            case "email":
                if (!value.trim()) {
                    error = "El email es obligatorio";
                    helper = "Debe ser un email válido";
                } else if (!emailRegex.test(value)) {
                    error = "Email no válido";
                    helper = "Formato incorrecto";
                } else {
                    helper = "✅ Formato válido";
                }
                break;
            case "password":
                if (!value.trim()) {
                    error = "La contraseña es obligatoria";
                    helper = "Mínimo 6 caracteres";
                } else if (value.length < passwordMinLength) {
                    error = "Debe tener al menos 6 caracteres";
                    helper = "Debe ser más larga";
                } else {
                    helper = "✅ Formato válido";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        setHelperText((prevHelper) => ({ ...prevHelper, [name]: helper }));
    };

    const handleUser = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        validateField(name, value);
    };

    return {
        values,
        errors,
        helperText,
        handleUser,
        handleBlur,
        validateField,
    };
};

export default useFormValidation;
