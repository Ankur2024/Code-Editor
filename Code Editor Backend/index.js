import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import problemRoutes from './routes/problemRoutes.js';
import eventRoutes from './routes/eventRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));
connectDB();

app.use('/api/problems', problemRoutes);
app.use('/api/event', eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));