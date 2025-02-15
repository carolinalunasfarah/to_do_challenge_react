# Aplicación To-Do List 📝

Esta es una aplicación para gestionar tareas, desarrollada con React, Ionic y Firebase.

## 🏗️ Arquitectura utilizada 

La aplicación sigue una arquitectura basada en **Componentes Funcionales** con **React** y el manejo del estado global a través de **Context API**.  
La lógica de autenticación y tareas se maneja a través de dos contextos:  `AuthContext` para autenticación de usuarios y `TasksContext` para gestión de tareas.  

## 🔥 Configuración de Firebase

1. **Autenticación:** Firebase Authentication para autenticación de usuarios a través de email y contraseña. Aquí también se agrega el campo del nombre para hacer más amigable la UX.

2. **Base de datos:** Firestore para almacenamiento de tareas. Cada tarea tiene los campos de *id*, *title*, *completed* y *userEmail*, este último campo para asegurar el almacenamiento adecuado de las tareas según usuario.

Para configurar Firebase, se creó `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

Que luego se aplican en el archivo `firebaseConfig.js` para asegurar la conexión del front con el backend

```plaintext
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Finalmente se utilizan en `dbTasksService.js` y `dbUserService.js` para realizar las peticiones correspondientes a cada colección. Funciones que luego se aplican a su contexto correspondiente.

## 📂 Estructura de carpetas y componentes

/src

- /components: Contiene los componentes reutilizables como `ToastComponent` para alertas, `TaskForm`, `TaskList`, `Navigation`, entre otros.
- /context: Los contextos de la aplicación, `AuthContext` y `TasksContext`, que gestionan el estado global de usuarios y de tareas, respectivamente.  
- /hooks: Funciones reutilizables como `useToast` para manejar la visualización de mensajes.  
- /services: Contiene funciones y utilidades que interactúan con Firebase, como `dbUserService` para manejar el registro e inicio de sesión de usuarios y `dbTasksService` para agregar, ver, modificar y eliminar tareas.  
- /styles: Archivo CSS Ionic para su utilización efectiva dentro de la aplicación.  
- /views: Vistas principales de la aplicación como la página principal `Home` que contiene registro e inicio de sesión y la página de listado de tareas `TasksPage` o la página de "Página no encontrada" `NotFound`.  


**Ejemplo de componente:**
`Register.jsx` gestiona el formulario de registro de nuevos usuarios, con validaciones para evitar campos vacíos o de formato inválido y un sistema de notificaciones con Alerts y Toast para una UX que informe al usuario.

## 🕵🏽‍♀️ Decisiones tomadas

1. *Context API:* Para manejar el estado global de la autenticación y las tareas, facilitando la gestión de los estados entre diferentes vistas y componentes sin la necesidad de prop drilling.

2. *Firebase:* Por su fácil integración con React, su escalabilidad y el soporte integrado para autenticación y visualización de base de datos en tiempo real, lo cual es adecuado para esta aplicación con funciones de autenticación, almacenamiento y persistencia de datos de las tareas de cada usuario.

3. *Ionic:* Se utilizó Ionic para la UI debido a sus componentes preconstruidos que permiten una rápida implementación de interfaces. Además, su capacidad para crear aplicaciones híbridas facilita la extensión a plataformas móviles.

## 🛠️ Desarrollada con

![Javascript](https://img.shields.io/badge/Javascript-grey?style=for-the-badge&logo=javascript)
![ReactJS](https://img.shields.io/badge/ReactJS-grey?style=for-the-badge&logo=react)
![Ionic](https://img.shields.io/badge/Ionic-grey?style=for-the-badge&logo=ionic)
