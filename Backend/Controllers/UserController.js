import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import UsersModel from "../Models/UsersModel.js";
import { sendEmails, userApproveEmail } from "../Features/SendMail.js";

let UsersRouter = new Router();

let instance = new CrudApi("/users", UsersModel, UsersRouter);

UsersRouter.get("/getUsersAdmin", async (req, res) => {
    if (req.user.isAdmin == false) throw new Error(`You dont have access !`)
    try {
        const users = await UsersModel.find({}, { refreshToken: 0, password: 0 }); // Fetch all users from the database
        res.status(200).json(users); // Respond with JSON array of users
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});


UsersRouter.patch("/updateUsersAdmin/:id", async (req, res) => {
    if (req.user.isAdmin == false) throw new Error(`You dont have access !`)
    const { id } = req.params; // Extract user ID from URL parameter
    const updateFields = req.body; // Assuming request body contains fields to update
    if (updateFields.isApproved == true) {
        let html = userApproveEmail(updateFields.userName, updateFields.email);
        sendEmails(html, [updateFields.email], `CBXSTART | Account Approved | ${updateFields.userName}`)
    }
    delete updateFields.email
    delete updateFields.userName
    try {
        const updatedUser = await UsersModel.findByIdAndUpdate(id, updateFields, {
            new: true, // Return the updated document
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Respond with the updated user object
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});


UsersRouter.delete("/deleteUsersAdmin/:id", async (req, res) => {
    if (req.user.isAdmin == false) throw new Error(`You dont have access !`)
    const { id } = req.params; // Extract user ID from URL parameter

    try {
        const deletedUser = await UsersModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle any errors
    }
});


export default UsersRouter;