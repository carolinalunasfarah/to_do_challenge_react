// hooks
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// database user service
import { createUser, getUser } from "../services/dbUserService";

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
    const [userName, setUserName] = useState("");
    const [loadingName, setLoadingName] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setUserIsLoggedIn(true);
                setLoadingName(true);

                const userData = await getUser(user.email);
                setTimeout(() => {
                    setUserName(userData?.name || "Usuario");
                    setLoadingName(false);
                }, 1000);
            } else {
                setUser(null);
                setUserIsLoggedIn(false);
                setUserName(null);
                setLoadingName(false);
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
                return { success: false, message: addUserResult.error };
            }

            setUser(registeredUser);
            setUserIsLoggedIn(true);
            setUserName(name);
            navigate(`/tasks`);
            return { success: true };
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                return {
                    success: false,
                    message: "El email ya está registrado",
                };
            }
            return { success: false, message: "Error al registrar usuario" };
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

            const userData = await getUser(email);
            if (userData && userData.name) {
                setUserName(userData.name);
            }

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
                userName,
                loadingName,
                registerUser,
                loginUser,
                logOut,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
