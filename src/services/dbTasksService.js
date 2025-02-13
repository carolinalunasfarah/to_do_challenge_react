// firebase
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    getDoc,
} from "firebase/firestore";

// firebase config
import { db } from "../firebaseConfig";

export const addTask = async (title, userEmail) => {
    console.log("Adding task with title:", title, "and userEmail:", userEmail);
    if (!title || !userEmail) {
        return {
            success: false,
            error: "El título y el correo son obligatorios.",
        };
    }

    try {
        const newTaskRef = await addDoc(collection(db, "tasks"), {
            title,
            completed: false,
            userEmail,
        });

        console.log("Tarea agregada con ID:", newTaskRef.id);
        return { success: true, id: newTaskRef.id };
    } catch (error) {
        console.error("Error al agregar tarea:", error);
        return { success: false, error: error.message };
    }
};

export const getUserTasks = async (userEmail) => {
    if (!userEmail) return [];

    try {
        const q = query(
            collection(db, "tasks"),
            where("userEmail", "==", userEmail)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`No se encontraron tareas para ${userEmail}`);
            return [];
        }

        const tasks = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return tasks;
    } catch (error) {
        console.error("Error al obtener tareas:", error);
        return [];
    }
};

export const updateTaskStatus = async (taskId, completed) => {
    if (!taskId) {
        return {
            success: false,
            error: "ID de tarea requerida.",
        };
    }

    try {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);

        if (!taskSnap.exists()) {
            return { success: false, error: "La tarea no existe." };
        }

        await updateDoc(taskRef, { completed });
        console.log("Estado tarea actualizada:", taskId);
        return { success: true };
    } catch (error) {
        console.error("Error al actualizar estado de tarea:", error);
        return { success: false, error: error.message };
    }
};

export const updateTaskTitle = async (taskId, title) => {
    if (!taskId || !title) {
        return {
            success: false,
            erorr: "Id de taea y título son requeridos",
        };
    }

    try {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);

        if (!taskSnap.exists()) {
            return { success: false, error: "La tarea no existe" };
        }

        await updateDoc(taskRef, { title });
        console.log("Título de tarea actualizada:", taskId);
        return { success: true };
    } catch (error) {
        console.error("Error al actualizar título de tarea:", taskId);
        return { success: false, erorr: error.message };
    }
};

export const deleteTask = async (taskId) => {
    if (!taskId) {
        return { success: false, error: "ID de tarea es obligatorio." };
    }

    try {
        const taskRef = doc(db, "tasks", taskId);
        const taskSnap = await getDoc(taskRef);

        if (!taskSnap.exists()) {
            return {
                success: false,
                error: "La tarea no existe o ya fue eliminada.",
            };
        }

        await deleteDoc(taskRef);
        console.log("Tarea eliminada:", taskId);
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        return { success: false, error: error.message };
    }
};
