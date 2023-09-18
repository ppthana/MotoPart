const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Mydb', { useNewUrlParser: true })
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const Schema = mongoose.Schema;
let UserSchema = new Schema({
    id: {
        type: String,
    },
    username: {
        type: String
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String
    }
}, { collection: "users" });

const User = mongoose.model('User', UserSchema);

app.get('/', async(req, res) => {
    // res.send('Server starting')
    const users = await User.find({});
    res.json(users);
})

app.listen(5001, () => {
    console.log('Server starting at port:5001')
})


app.post('/login', async(req, res) => {
    console.log(req.body)
    const finduser = await User.find(req.body).exec()
    if (finduser.length != 0) {
        res.status(200).json(finduser)
    } else {
        res.status(404).json()
    }
})



module.exports = mongoose.model("users", UserSchema);