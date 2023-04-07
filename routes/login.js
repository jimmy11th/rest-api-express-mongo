const SECRET = 'haiancs1993'
const jwt = require('jsonwebtoken')
// const assert = require('http-assert')
const express = require("express")
const router = express.Router()
const Account = require('../model/account')
// assert(user, 422, 'Username is not existed!')

router.route('/login').post(async (req, res) => {
    const user = await Account.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: "Username is not existed!"
        })
    }

    const isPasswordValid = require('bcryptjs').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: "Password wrong!"
        })
    }

    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)

    res.send({
        user, token
    })
})

module.exports = router
