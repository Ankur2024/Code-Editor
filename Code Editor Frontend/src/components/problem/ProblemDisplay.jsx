import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SunIcon, MoonIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Landing from "../code_editor/Landing";

const ProblemDisplay = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [code, setCode] = useState("// Write your code here\n");
    const [darkMode, setDarkMode] = useState(true);
    const [leftPanelWidth, setLeftPanelWidth] = useState(30);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/event/${eventId}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event:", error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleResize = (direction) => {
        if (direction === "increase") {
            setLeftPanelWidth(Math.min(leftPanelWidth + 5, 50));
        } else {
            setLeftPanelWidth(Math.max(leftPanelWidth - 5, 20));
        }
    };

    const handlePrevious = () => {
        if (currentProblemIndex > 0) {
            setCurrentProblemIndex(currentProblemIndex - 1);
            setCode("// Write your code here\n");
        }
    };

    const handleNext = () => {
        if (currentProblemIndex < event.problem.length - 1) {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setCode("// Write your code here\n");
        }
    };

    const handleSubmit = () => {
        alert("Event submitted successfully!");
        navigate("/");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
    }

    if (!event || event.problem.length === 0) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-100">No problems found for this event</div>;
    }

    const currentProblem = event.problem[currentProblemIndex].problemId;

    return (
        <div
            className={`flex min-h-screen w-full flex-col md:flex-row ${
                darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            {/* Left Panel - Problem Details */}
            <div
                className={`p-6 overflow-auto ${
                    darkMode ? "bg-gray-800 text-white shadow-lg" : "bg-white text-gray-900 shadow-md"
                } md:border-r md:border-gray-300 transition-colors duration-300 w-full md:w-auto`}
                style={{ maxWidth: "70%", width: `${leftPanelWidth}%` }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">{currentProblem.name}</h2>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-full ${
                            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                        } transition-colors duration-200`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-300 md:text-gray-400">{currentProblem.description}</p>
                <h3 className="mt-6 text-lg font-semibold text-indigo-400">Category</h3>
                <p className="text-sm text-gray-300 md:text-gray-400">{currentProblem.category}</p>
                <h3 className="mt-6 text-lg font-semibold text-indigo-400">Difficulty</h3>
                <p className="text-sm text-gray-300 md:text-gray-400">{currentProblem.difficulty}</p>
                <h3 className="mt-6 text-lg font-semibold text-indigo-400">Examples</h3>
                {currentProblem.example.map((ex, index) => (
                    <pre
                        key={index}
                        className={`p-4 rounded-lg text-sm mt-2 ${
                            darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                        } overflow-x-auto`}
                    >
                        Input: {ex.input}
                        {"\n"}
                        Output: {ex.output}
                    </pre>
                ))}
            </div>

            {/* Resize Controls (Hidden on Mobile) */}
            <div
                className={`hidden md:flex flex-col justify-center items-center w-12 ${
                    darkMode ? "bg-gray-800" : "bg-gray-200"
                } transition-colors duration-200`}
            >
                <button
                    onClick={() => handleResize("decrease")}
                    className={`p-2 rounded-full ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"
                    } transition-colors duration-200`}
                    aria-label="Decrease left panel width"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                    onClick={() => handleResize("increase")}
                    className={`p-2 rounded-full mt-2 ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400"
                    } transition-colors duration-200`}
                    aria-label="Increase left panel width"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Right Panel - Code Editor */}
            <div className="flex-1 flex flex-col p-4 w-full md:w-auto">
                <Landing code={code} setCode={setCode} darkMode={darkMode} />
                <div className="mt-4 flex justify-end space-x-4">
                    {currentProblemIndex > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Previous
                        </button>
                    )}
                    {currentProblemIndex < event.problem.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProblemDisplay;