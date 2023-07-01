import express from 'express'
import {signup, login} from '../controller/Auth.js'
import {getAllUsers,updateProfile, updatePlan, updateNoOfQuestions, updateSilverQuestions} from '../controller/Users.js'
import auth from '../middlewares/Auth.js'
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)

router.get("/getAllUsers", getAllUsers)
router.patch("/update/:id", auth, updateProfile)
router.patch("/updatePlan/:id", auth, updatePlan)
router.patch("/updateques/:id",auth, updateNoOfQuestions)
router.patch("/updateSilverQues/:id", auth, updateSilverQuestions)
export default router