const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true
    },
    userName: { 
        type: String,
        required: true 
    },
    date: { 
        type: Date,
    },
    punchIn: { 
        type: Date
    },
    punchOut: { 
        type: Date
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;