import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../Event/Card"; // Adjust the import path based on your project structure

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [refreshEvents, setRefreshEvents] = useState(false);

    // useEffect for deleting past events
    useEffect(() => {
        const deletePastEvents = async () => {
            try {
                const allEventsResponse = await axios.get("http://localhost:8000/api/event");
                const allEvents = allEventsResponse.data;
                const currentDate = new Date().setHours(0, 0, 0, 0); // Normalize to midnight

                for (const event of allEvents) {
                    const eventDate = new Date(event.startDate).setHours(0, 0, 0, 0); // Normalize to midnight
                    if (eventDate < currentDate) {
                        try {
                            await axios.delete(`http://localhost:8000/api/event/${event._id}`);
                            console.log(`Deleted past event: ${event.title}`);
                        } catch (deleteError) {
                            console.error(`Error deleting event ${event._id}:`, deleteError);
                        }
                    }
                }
            } catch (error) {
                console.error("Error deleting past events:", error);
            }
        };

        deletePastEvents();
    }, [refreshEvents, location]);

    // useEffect for fetching ongoing events
    useEffect(() => {
        const fetchOngoingEvents = async () => {
            try {
                const ongoingEventsResponse = await axios.get("http://localhost:8000/api/event/ongoing");
                setEvents(ongoingEventsResponse.data);
            } catch (error) {
                console.error("Error fetching ongoing events:", error);
            }
        };

        fetchOngoingEvents();
    }, [refreshEvents, location]);

    // Listen for state from navigation to trigger refresh
    useEffect(() => {
        if (location.state?.refresh) {
            setRefreshEvents((prev) => !prev);
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 text-white relative">
            <div className="max-w-6xl mx-auto w-full">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold tracking-tight">Ongoing Events</h1>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length === 0 ? (
                        <p className="text-purple-100/80 col-span-full">No ongoing events found.</p>
                    ) : (
                        events.map((event) => (
                            <Card
                                key={event._id}
                                title={event.title}
                                description={event.description.substring(0, 100) + "..."}
                                tags={["Event", event.isLive ? "Live" : "Not Live"]}
                                footer={
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-purple-200/70">
                                            Starts: {new Date(event.startDate).toLocaleDateString()}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/event/${event._id}`)}
                                            className="rounded-lg bg-purple-600/80 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-600"
                                        >
                                            View
                                        </button>
                                    </div>
                                }
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-purple-100/80">Problems: {event.numberOfProblems}</p>
                                    <div
                                        className={`h-3 w-3 rounded-full ${event.isLive ? "bg-green-500" : "bg-red-500"}`}
                                        title={event.isLive ? "Live" : "Not Live"}
                                    ></div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            <button
                onClick={() => navigate("/create")}
                className="fixed bottom-6 right-6 group inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-800"
                title="Create Event"
            >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 text-2xl font-medium transition-all duration-300 ease-in-out group-hover:bg-opacity-0">
                    +
                </span>
            </button>
        </div>
    );
};

export default Home;