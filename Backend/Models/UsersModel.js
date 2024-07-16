import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: { type: String },
    photo: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    password: { type: String },
    googleRefreshToken: { type: String },
});

const UsersModel = mongoose.model("user", usersSchema);

export default UsersModel 
