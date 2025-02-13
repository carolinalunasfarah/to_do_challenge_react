import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";

import "./App.css";
import TasksPage from "./views/TasksPage";
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";

function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/tasks"
                    element={
                        <PrivateRoute>
                            <TasksPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
