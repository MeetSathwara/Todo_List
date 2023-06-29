const mongoose = require("mongoose");
const TodoModel = require("../model/TodoModel");

exports.createTodo = async (req, res) => {
    try {
        const { text } = req.body;
        const newText = new TodoModel({ text });
        await newText.save();
        res.status(200).send({
            success: true,
            message: "create list successfully",
            newText
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "error while create list",
            error
        })
    }
}

exports.GetTodo = async (req, res) => {
    try {
        const Lists = await TodoModel.find({});
        if (Lists.length > 0) {
            return res.status(200).send({
                success: true,
                lenght: Lists.length,
                message: "get list successfully",
                Lists
            })
        }
        else {
            return res.status(200).send({
                message: "please create list..."
            })
        }

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "error while create list",
            error
        })
    }
}
exports.UpdateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        // const { text } = req.body;
        const UpdateList = await TodoModel.findByIdAndUpdate(id, { $set: req.body });

        res.status(200).send({
            success: true,
            message: "update list successfully",
            UpdateList
        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "error while update list",
            error
        })
    }
}
exports.DeleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        // const { text } = req.body;
        const UpdateList = await TodoModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "delete list successfully",

        })
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: "error while delete list",
            error
        })
    }
}