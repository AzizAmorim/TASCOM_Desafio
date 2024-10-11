import Tag from "../models/tag.js"
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
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const getAllTags = async (req, res) => {
    try {
        const tag = await Tag.find();
        return res.status(200).send(tag);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
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
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.tagId);
        return res.status(204).send(tag);
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Algo deu Errado!" });
    }
};

export { createTag, getAllTags, editTag, deleteTag };