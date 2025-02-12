import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";

import "./App.css";
import TasksPage from "./views/TasksPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
        </>
    );
}

export default App;
