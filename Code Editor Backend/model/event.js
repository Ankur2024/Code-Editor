import mongoose from "mongoose";
import Problem from "./Problem.js";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 0,
    },
    isLive: {
        type: Boolean,
        default: false,
    },
    problem: [
        {
            problemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Problem",
                required: true,
            },
        },
    ],
    startDate: {
        type: Date,
        required: true,
    },
    numberOfProblems: {
        type: Number,
        required: true,
        min: 1,
    },
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);