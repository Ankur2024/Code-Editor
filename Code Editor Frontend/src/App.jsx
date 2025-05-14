import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home.jsx";
import EventForm from "./components/Event/EventForm.jsx";
import AddProblem from "./components/problem/AddProblem.jsx";
import EventDetails from "./components/Event/EventDetiails.jsx";
import ProblemDisplay from "./components/problem/ProblemDisplay.jsx"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<EventForm />} />
                <Route path="/add-problem/:eventId/:numberOfProblems" element={<AddProblem />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/problem-display/:eventId" element={<ProblemDisplay />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;