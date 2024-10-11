import Tag from "../models/tag.js"
import mongoose from "mongoose";
import Task from "../models/task.js"

const createTag = async (req, res) => {
    try {
        const tag = new Tag({
            name: req.body.name,
            color: req.body.color
        });
        await tag.save();
        return res.status(201).send(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tag = await Tag.find();
        return res.status(200).send(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const editTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.tagId, {
            name: req.body.name,
            color: req.body.color
        }, { new: true });
        return res.status(200).send(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const deleteTag = async (req, res) => {
    try {
        const thisTag = await Tag.findById(req.params.tagId);
        const tasks = await Task.find({"tags._id": new mongoose.Types.ObjectId(req.params.tagId) });
        if(Object.keys(tasks).length !== 0){
            for (let i = 0; i < tasks.length; i++) {
                const task = await Task.updateOne({ _id: tasks[i]._id },
                    { $pull: { tags: thisTag } },
                    { new: true }
                );
            };
        };
        const tag = await Tag.findByIdAndDelete(req.params.tagId);
        return res.status(204).send(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

export { createTag, getAllTags, editTag, deleteTag };