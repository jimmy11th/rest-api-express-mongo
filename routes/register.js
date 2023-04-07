const express = require("express")
const router = express.Router()
const Account = require("../model/account")


router.route('/account').post(async (req, res) => {
    const account = new Account({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const accountToSave = await account.save();
        res.status(200).json(accountToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router