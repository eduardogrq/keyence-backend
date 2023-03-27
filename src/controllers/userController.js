
const User = require('../models/userModel')

exports.getUsers = async(req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}