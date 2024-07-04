import mongoose from "mongoose";

const pagesSchema = mongoose.Schema({
    pageName: { type: String },
    data: { type: Object },
    userID: { type: String },
    visibility: { type: String },
    isPasswordProtected: { type: Boolean },
    password: { type: String },
    collaborators: { type: Array },
})

const PagesModel = mongoose.model("page", pagesSchema);

export default PagesModel;
