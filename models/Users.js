
const mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel;