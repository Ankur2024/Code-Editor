import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/event/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event:", error);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
    }

    if (!event) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Event not found</div>;
    }

    const formattedDate = new Date(event.startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
            <div className="w-full max-w-lg rounded-xl bg-zinc-900 p-8 shadow-lg">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
                    >
                        ← Back to Home
                    </button>
                    <div
                        className={`rounded-full px-3 py-1 text-xs font-medium ${event.isLive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                    >
                        {event.isLive ? "Live" : "Not Live"}
                    </div>
                </div>
                <h2 className="mb-4 text-3xl font-semibold text-white">{event.title}</h2>
                <div className="mb-6 space-y-4">
                    <div className="rounded-lg bg-zinc-800 p-4">
                        <h3 className="mb-2 text-sm font-medium text-slate-300">Description</h3>
                        <p className="text-slate-400">{event.description}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <h3 className="mb-1 text-sm font-medium text-slate-300">Start Date</h3>
                            <p className="text-slate-400">{formattedDate}</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <h3 className="mb-1 text-sm font-medium text-slate-300">Duration</h3>
                            <p className="text-slate-400">{event.duration} hours</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <h3 className="mb-1 text-sm font-medium text-slate-300">Number of Problems</h3>
                            <p className="text-slate-400">{event.numberOfProblems}</p>
                        </div>
                        <div className="rounded-lg bg-zinc-800 p-4">
                            <h3 className="mb-1 text-sm font-medium text-slate-300">Status</h3>
                            <p className="text-slate-400">{event.isLive ? "Live" : "Not Live"}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => navigate(`/problem-display/${event._id}`)}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
                    >
                        <span className="relative rounded-md bg-zinc-900 px-8 py-3.5 transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                            <span className="flex items-center text-lg font-medium">Join Event</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;