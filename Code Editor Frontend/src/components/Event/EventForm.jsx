import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        startDate: "",
        isLive: false,
        numberOfProblems: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.startDate) {
            alert("Please select a start date");
            return;
        }
        const duration = Number(formData.duration);
        if (isNaN(duration) || duration < 0) {
            alert("Please enter a valid duration (0 or greater)");
            return;
        }
        const numberOfProblems = Number(formData.numberOfProblems);
        if (isNaN(numberOfProblems) || numberOfProblems < 1) {
            alert("Please enter a valid number of problems (1 or greater)");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/api/event", {
                ...formData,
                duration,
                numberOfProblems,
            });
            alert("Event created successfully!");
            navigate(`/add-problem/${response.data.eventId}/${numberOfProblems}`);
        } catch (error) {
            console.error("Error creating event:", error);
            alert(`Failed to create event: ${error.response?.data?.error || "Unknown error"}`);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold text-white">Create New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium text-slate-200">
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            placeholder="Enter event title"
                            required
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
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            rows="4"
                            placeholder="Enter event description"
                            required
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="duration" className="block text-sm font-medium text-slate-200">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                required
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="numberOfProblems" className="block text-sm font-medium text-slate-200">
                                Number of Problems
                            </label>
                            <input
                                type="number"
                                name="numberOfProblems"
                                value={formData.numberOfProblems}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                required
                                min="1"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-200">
                            Start Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white shadow-sm transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isLive"
                            checked={formData.isLive}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-2 focus:ring-purple-500"
                        />
                        <label htmlFor="isLive" className="ml-2 block text-sm font-medium text-slate-200">
                            Is Live
                        </label>
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
                                Submit Event
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventForm;