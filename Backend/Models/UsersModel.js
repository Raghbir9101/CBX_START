import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    userName: { type: String },
    photo: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean },
    password: { type: String },
    googleRefreshToken: { type: String },
})

const UsersModel = mongoose.model("user", usersSchema);

export default UsersModel 
