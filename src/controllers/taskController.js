import Task from "../models/task.js"
import Tag from "../models/tag.js"
import mongoose from "mongoose";

const createTask = async (req, res) => {
    try {
        const title = req.body.title;
        const OldTask = await Task.find({title: title});
        if(OldTask != null){
            return res.status(200).send({ msg: "titulo já existe!" });
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
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find();
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const editTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, {
            title: req.body.title,
            status: req.body.status,
            priority: req.body.priority,
            description: req.body.description
        }, { new: true });
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        return res.status(204).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
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
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getTasksByTags = async (req, res) => {
    try {
        const task = await Task.find({"tags._id": new mongoose.Types.ObjectId(req.body.tags)});
        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
}; 

export { createTask, getAllTasks, editTask, deleteTask, addTagToTask, getTasksByTags };