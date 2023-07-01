import mongoose from "mongoose";

const userSchena = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    noOfQuestions: {type: Number, default: 0},
    plan: {type: String, default: null},
    subcribedOn: {type: Date},
    silverFirstAsked: {type: Date, default: null},
});

export default mongoose.model("User", userSchena);