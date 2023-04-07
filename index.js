require('dotenv').config();
const SECRET = 'haiancs1993'
const Account = require('../model/account')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
const auth = async (req, res) => {
    const raw = String(req.headers.authorization).split(' ').pop();

    const { id } = jwt.verify(raw, SECRET);
    req.user = await Account.findById(id)
}
app.use(express.json());
app.use('/', routes);

app.use(parseJwt({
    secret: SECRET,
    algorithms: ['HS256'], // 使用何种加密算法解析
}).unless({ path: ['/api/login'] }))




app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})