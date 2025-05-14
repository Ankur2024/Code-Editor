import express from "express";
import { createProblem, getProblems, getProblemById, updateProblem, deleteProblem } from "../controller/problemController.js";


const router = express.Router();

router.post('/', createProblem);
router.get('/', getProblems);
router.get('/:id', getProblemById);
router.put('/:id', updateProblem);
router.delete('/:id', deleteProblem);

export default router;