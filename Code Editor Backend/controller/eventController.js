import Event from "../model/event.js";

export const createEvent = async (req, res) => {
    try {
        const { title, description, duration, isLive, problem, startDate, numberOfProblems } = req.body;
        const event = new Event({
            title,
            description,
            duration,
            isLive,
            problem: problem || [],
            startDate,
            numberOfProblems,
        });
        await event.save();
        res.status(201).json({ message: "Event created successfully", eventId: event._id });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(400).json({ message: "Failed to create event", error: error.message });
    }
};

export const getAllEvent = async (req, res) => {
    try {
        const events = await Event.find().populate("problem.problemId");
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
};

export const getOngoingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const events = await Event.find({
            isLive: true,
            startDate: { $lte: currentDate },
        }).populate("problem.problemId");
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching ongoing events:", error);
        res.status(500).json({ message: "Failed to fetch ongoing events", error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("problem.problemId");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ message: "Failed to fetch event", error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        const currentDate = new Date();
        const eventDate = new Date(event.startDate);
        if (eventDate >= currentDate) {
            return res.status(400).json({ message: "Cannot delete ongoing or upcoming event" });
        }
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event", error: error.message });
    }
};