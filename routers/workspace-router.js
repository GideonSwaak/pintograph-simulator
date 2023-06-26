import express from "express";
import Workspace from "../models/workspace.js";

const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
    Workspace.find({owner: req.session.userId}).sort([['updatedAt', 1]]).then(workspaces => {
        res.status(200).json(workspaces);
    });
})

router.post("/", (req, res) => {
    const workspace = new Workspace({
        title: req.body.title,
        data: req.body.data,
        owner: req.session.userId,
    });
    workspace.save().then(workspace => {
        res.status(200).json(workspace);
    });
});

router.put("/:id", (req, res) => {
    Workspace.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        data: req.body.data,
    }, {new: true}).then(workspace => {
        res.status(200).json(workspace);
    });
});

router.delete("/:id", (req, res) => {
    Workspace.findByIdAndDelete(req.params.id).then(workspace => {
        res.status(200).json(workspace);
    });
});

export default router;