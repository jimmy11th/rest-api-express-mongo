const express = require("express")
const router = express.Router()
const Account = require("../model/account")
const bcrypt = require('bcryptjs')


router.route('/register').post(async (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(async (hashedPassword) => {
            const account = new Account({
                username: req.body.username,
                password: hashedPassword
            })
            account.save().then((result) => {
                res.status(201).send({
                    message: "User Created Successfully",
                    result,
                });
            }).catch();
        }).catch((e) => {
            res.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        })
})

module.exports = router