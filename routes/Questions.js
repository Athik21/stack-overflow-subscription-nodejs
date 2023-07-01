import express from 'express'
import {AskQuestion, getAllQuestions, deleteQuestion, voteQuestion} from '../controller/Question.js'
import auth from '../middlewares/Auth.js';

const router = express.Router();

router.post("/Ask", auth, AskQuestion)
router.get("/get", getAllQuestions)
router.delete("/del/:id", auth, deleteQuestion)
router.patch("/vote/:id", auth, voteQuestion)

export default router