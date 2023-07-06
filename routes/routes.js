const express = require('express');
const router = express.Router()
const userRouter = require('./user')
const registerRouter = require('./register')
const loginRouter = require('./login')
const jwt = require("jsonwebtoken");

// router.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
// });
router.use((request, response, next) => {
    console.log('haiancs');
    next()
});
// middleware to use for all requests
router.use(async (request, response, next) => {
    console.log(request.url);
    if (request.url !== "/api/login" && request.url !== "/api/register") {
        try {
            //   get the token from the authorization header
            const token = await request.headers.authorization.split(" ")[1];
            console.log("authorization", request.headers.authorization);
            console.log('token', token);
            //check if the token matches the supposed origin
            const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
            console.log('decodedToken', decodedToken);
            // retrieve the user details of the logged in user
            const user = await decodedToken;

            // pass the user down to the endpoints here
            request.user = user;

            // pass down functionality to the endpoint
            next();

        } catch (error) {
            response.status(401).json({
                error: new Error("Invalid request!"),
            });
        }
    } else {
        next();
    }

})

router.use('/api', userRouter, registerRouter, loginRouter);
module.exports = router;