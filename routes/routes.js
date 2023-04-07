const express = require('express');
const router = express.Router()
const userRouter = require('./user')
const registerRouter = require('./register')
const loginRouter = require('./login')

// middleware to use for all requests
router.use(function (req, res, next) {
    console.log('Something is happening.');
    next(); //make sure we go to the next routes and don`t stop here
})

router.use('/api', userRouter, registerRouter, loginRouter);
module.exports = router;