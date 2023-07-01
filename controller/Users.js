import mongoose from "mongoose";
import user from '../models/auth.js'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.find();
        const allUserDetails = [];
        allUsers.forEach(users => {
            allUserDetails.push({ _id: users._id, name: users.name, email: users.email, about: users.about, tags: users.tags, joinedOn: users.joinedOn, noOfQuestions: users.noOfQuestions, plan: users.plan, silverFirstAsked: users.silverFirstAsked, subcribedOn: users.subcribedOn })
        })
        return res.status(200).json(allUserDetails)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...")
    }
    try {
        const updatedProfile = await user.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true });
        return res.status(200).json(updatedProfile)
    } catch (error) {
        console.log(error)
        return res.status(405).json({ message: error.message })
    }
}
export const updatePlan = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfQuestions, plan } = req.body;

    const currentDate = Date.now();
    const dateObject = new Date(currentDate);
    const isoDate = dateObject.toISOString();
    console.log(plan);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...")
    }
    try {
        const updatedPlan = await user.findByIdAndUpdate(_id, { $set: { 'noOfQuestions': noOfQuestions, 'plan': plan, 'subcribedOn': isoDate } }, { new: true });
        return res.status(200).json(updatedPlan)
    } catch (error) {
        console.log(error)
        return res.status(405).json({ message: error.message })
    }
}
export const updateSilverQuestions = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfQuestions } = req.body;
    const currentDate = Date.now();
    const dateObject = new Date(currentDate);
    const isoDate = dateObject.toISOString();
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...")
    }
    try {
        const updatedSilverQuestion = await user.findByIdAndUpdate(_id, { $set: { 'noOfQuestions': noOfQuestions, 'silverFirstAsked': isoDate } }, { new: true });
        console.log({ updateSilverQuestions })
        return res.status(200).json(updatedSilverQuestion)
    } catch (error) {
        console.log(error)
        return res.status(405).json({ message: error.message })
    }
}
export const updateNoOfQuestions = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfQuestions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...")
    }
    try {
        const updatedPlan = await user.findByIdAndUpdate(_id, { $set: { 'noOfQuestions': noOfQuestions } }, { new: true });
        return res.status(200).json(updatedPlan)
    } catch (error) {
        console.log(error)
        return res.status(405).json({ message: error.message })
    }
}

