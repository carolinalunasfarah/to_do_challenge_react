// routes
import { Route, Routes } from "react-router-dom";

// views
import Home from "./views/Home";
import TasksPage from "./views/TasksPage";
import NotFound from "./views/NotFound";

// components
import PrivateRoute from "./components/PrivateRoute";
import Navigation from "./components/Navigation";

// style
import "./App.css";

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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
