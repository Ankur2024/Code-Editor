import express from "express";
import { createEvent, getAllEvent, getOngoingEvents, getEventById, deleteEvent } from "../controller/eventController.js";

const router = new express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);
router.get("/ongoing", getOngoingEvents);
router.get("/:id", getEventById);
router.delete("/:id", deleteEvent);

export default router;