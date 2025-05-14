import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
    example: [{ input: String, output: String }],
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
}, { timestamps: true });

export default mongoose.model("Problem", problemSchema);