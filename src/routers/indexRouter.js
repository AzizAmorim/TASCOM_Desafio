import Router from "express";
import * as taskController from "../controllers/taskController.js";
import * as tagController from "../controllers/tagController.js";

const routers = Router();

routers.post("/task", (req,res) => { taskController.createTask(req,res) });
routers.get("/task", (req,res) => { taskController.getAllTasks(req,res) });
routers.put("/task/:taskid", (req,res) => { taskController.editTask(req,res) });
routers.delete("/task/:taskid", (req,res) => { taskController.deleteTask(req,res) });

routers.post("/tag", (req,res) => { tagController.createTag(req,res) });
routers.get("/tag", (req,res) => { tagController.getALLTags(req,res) });
routers.put("/tag/:tagId", (req,res) => { tagController.editTag(req,res) });
routers.delete("/tag/:tagId", (req,res) => { tagController.deleteTag(req,res) });

routers.put("/addTagToTask/:taskId/:tagId", (req,res) => { taskController.addTagToTask(req,res) });
routers.get("/getTasksByTags", (req,res) => { taskController.getTasksByTags(req,res) });

export {routers};