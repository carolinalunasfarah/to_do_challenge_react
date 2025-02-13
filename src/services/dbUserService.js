import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const createUser = async (name, email) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }

    try {
        const userDocRef = doc(db, "users", email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            console.error("El email ya está registrado:", email);
            return { success: false, error: "El email ya está registrado" };
        }

        await setDoc(userDocRef, {
            name: name,
            email: email,
        });

        return { success: true };
    } catch (error) {
        console.error("Error al crear usuario: " + error.message);
        return { success: false, error: error.message };
    }
};

export const getUser = async (email) => {
    if (!email || typeof email !== "string") {
        console.error("Email inválido:", email);
        return { success: false, error: "Email inválido" };
    }
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { ...docSnap.data(), id: docSnap.id };
        } else {
            console.error("No existe el usuario con email:", email);
            return { success: false, error: "No existe el usuario" };
        }
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        return { success: false, error: error.message };
    }
};
