import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import UsersModel from "../Models/UsersModel.js";

let UsersRouter = new Router();

let instance = new CrudApi("/users", UsersModel, UsersRouter)

export default UsersRouter;