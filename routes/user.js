const express = require("express")
const router = express.Router()
const User = require("../model/user")


router.route('/user')
    .post(async (req, res) => {
        console.log('haiancs', req.body);
        const user = new User({
            name: req.body.name,
            age: req.body.age
        })
        user.save().then((result) => {
            res.status(201).send({
                message: "User Created Successfully",
                result,
            });
        }).catch((err) => {
            res.status(500).json({
                message: "User Created failed",
                err,
            })
        });
    })
    .get(async (req, res) => {
        try {
            const data = await User.find();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
    .get(async (req, res) => {
        try {
            const data = await User.findById(req.params.id);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
    .patch(async (req, res) => {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };

            const result = await User.findByIdAndUpdate(
                id, updatedData, options
            )

            res.send(result)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const id = req.params.id;
            const data = await User.findByIdAndDelete(id)
            res.send(`Document with ${data.name} has been deleted..`)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

module.exports = router