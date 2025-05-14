import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddProblem = () => {
    const { eventId, numberOfProblems } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        difficulty: "Easy",
        example: [{ input: "", output: "" }],
    });
    const [addedProblems, setAddedProblems] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleExampleChange = (index, e) => {
        const newExamples = [...formData.example];
        newExamples[index][e.target.name] = e.target.value;
        setFormData({ ...formData, example: newExamples });
    };

    const addExample = () => {
        setFormData({
            ...formData,
            example: [...formData.example, { input: "", output: "" }],
        });
    };

    const removeExample = (index) => {
        const newExamples = formData.example.filter((_, i) => i !== index);
        setFormData({ ...formData, example: newExamples });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/problems", {
                ...formData,
                eventId,
            });
            const newAddedProblems = addedProblems + 1;
            setAddedProblems(newAddedProblems);
            alert("Problem added successfully!");
            setFormData({
                name: "",
                description: "",
                category: "",
                difficulty: "Easy",
                example: [{ input: "", output: "" }],
            });
            if (newAddedProblems >= Number(numberOfProblems)) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error adding problem:", error);
            alert("Failed to add problem");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-slate-800 p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-white">
                    Add Problem {addedProblems + 1} of {numberOfProblems}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="Enter problem name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-slate-200">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            rows="4"
                            placeholder="Enter problem description"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-sm font-medium text-slate-200">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="Enter problem category"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="difficulty" className="block text-sm font-medium text-slate-200">
                            Difficulty
                        </label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-200">Examples</label>
                        {formData.example.map((ex, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                                <input
                                    type="text"
                                    name="input"
                                    placeholder="Input"
                                    value={ex.input}
                                    onChange={(e) => handleExampleChange(index, e)}
                                    required
                                    className="w-1/2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                                <input
                                    type="text"
                                    name="output"
                                    placeholder="Output"
                                    value={ex.output}
                                    onChange={(e) => handleExampleChange(index, e)}
                                    required
                                    className="w-1/2 rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExample(index)}
                                    className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addExample}
                            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                            + Add Example
                        </button>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
                        >
                            <span className="relative rounded-md bg-slate-800 px-5 py-2.5 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                                Submit Problem
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProblem;