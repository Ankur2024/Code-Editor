import Problem from "../model/Problem.js";
import Event from "../model/event.js";

export const createProblem = async (req, res) => {
    try {
        const { name, description, category, difficulty, example, eventId } = req.body;
        const problem = new Problem({ name, description, category, difficulty, example, eventId });
        await problem.save();

        // Update the event's problem array
        await Event.findByIdAndUpdate(eventId, {
            $push: { problem: { problemId: problem._id } },
        });

        res.status(201).json({ message: "Problem created successfully", problem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProblem = async (req, res) => {
    try {
        const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json(updatedProblem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
        if (!deletedProblem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json({ message: "Problem deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};