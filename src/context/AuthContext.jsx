// hooks
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// database user service
import { createUser } from "../services/dbUserService";

// firebase
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setUserIsLoggedIn(true);
            } else {
                setUser(null);
                setUserIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const registerUser = async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const registeredUser = userCredential.user;

            const addUserResult = await createUser(name, email);
            if (!addUserResult.success) {
                console.log("Error de registro");
                return false;
            }

            setUser(registeredUser);
            setUserIsLoggedIn(true);
            navigate(`/tasks`);
            return true;
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                console.error("El email ya está registrado", error.message);
            } else {
                console.error("Error al registrar", error.message);
            }
            return false;
        }
    };

    const loginUser = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const loggedInUser = userCredential.user;
            setUser(loggedInUser);
            setUserIsLoggedIn(true);
            navigate(`/tasks`);
            return { success: true };
        } catch (error) {
            console.error("Error al iniciar sesión", error);
            if (error.code === "auth/invalid-email") {
                return {
                    success: false,
                    message: "El correo electrónico ingresado no es válido",
                };
            }
            return { success: false, message: "Error al iniciar sesión" };
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setUserIsLoggedIn(false);
            navigate(`/`);
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userIsLoggedIn,
                registerUser,
                loginUser,
                logOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
