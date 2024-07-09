import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import PagesModel from "../Models/PagesModel.js";

let PagesRouter = new Router();

let instance = new CrudApi("/pages", PagesModel, PagesRouter);


PagesRouter.post("/addNewPage", async (req, res) => {
    try {
        let defaultData = [
            {
                "items": []
            },
            {
                "items": []
            },
            {
                "items": []
            },
            {
                "items": []
            },
            {
                "items": []
            }
        ]

        let postData = {
            pageName: req.body.pageName || "New Page",
            description: req.body.description || "",
            data: defaultData,
            userID: req.body.userID,
            visibility: req.body.visibility,
            isPasswordProtected: req.body.isPasswordProtected,
            password: req.body.password,
            collaborators: req.body.collaborators,
        }
        let createdData = await PagesModel.create(postData);

        return res.send(createdData)
    } catch (error) {
        return res.send({ error: error.message })
    }
})

export default PagesRouter;