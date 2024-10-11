import Task from "../models/task.js"
import mongoose from "mongoose";
import Tag from "../models/tag.js"

const createTask = async (req, res) => {
    try {
        const dbTask = await Task.find({title: req.body.title});
        if(Object.keys(dbTask).length !== 0){
            return res.status(200).send({ msg: "titulo já existe!" });
        };
        if(req.body.priority < 1 || req.body.priority > 10){
            return res.status(200).send({ msg: "prioridade só pode ser de 1 a 10!" });
        };
        const task = new Task({
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description
        });
        await task.save();
        return res.status(201).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find();
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const editTask = async (req, res) => {
    try {
        const dbTask = await Task.find({title: req.body.title});
        if(Object.keys(dbTask).length !== 0){
            return res.status(200).send({ msg: "titulo já existe!" });
        };
        if(req.body.priority < 1 || req.body.priority > 10){
            return res.status(200).send({ msg: "prioridade só pode ser de 1 a 10!" });
        };
        const task = await Task.findByIdAndUpdate(req.params.taskId, {
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description
        }, { new: true });
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        return res.status(204).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const addTagToTask = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.tagId);
        const task = await Task.updateOne({ _id: req.params.taskId },
            { $push: { tags: tag } },
            { new: true }
        );
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getTasksByTags = async (req, res) => {
    try {
        const tagsIds = [];
        for (let i = 0; i < req.body.tags.length; i++) {
            tagsIds[i] = new mongoose.Types.ObjectId(req.body.tags[i]);
        };
        const task = await Task.find({"tags._id": {$in: tagsIds} });
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
}; 

export { createTask, getAllTasks, editTask, deleteTask, addTagToTask, getTasksByTags };