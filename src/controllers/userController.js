const XLSX = require('xlsx');;
const User = require('../models/userModel')

// function to get all users data
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Function to upload excel data
exports.uploadExcelData = async (req, res) => {
    try {
        const fileName = req.body.pathname;
        const workbook = XLSX.readFile(fileName);
        const sheet_name = workbook.SheetNames[0];
        const sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);

        const newData = sheet_data.map((row) => {
            return {
                userId: row['User ID'],
                userName: row['User Name'],
                date: new Date((row['Date'] - 25569) * 86400 * 1000),
                punchIn: new Date(new Date((row['Date'] - 25569) * 86400 * 1000).getTime() + row['Punch In'] * 86400 * 1000),
                punchOut: new Date(new Date((row['Date'] - 25569) * 86400 * 1000).getTime() + row['Punch Out'] * 86400 * 1000)
            };
        });

        res.status(200).json(newData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// function to create users
exports.createUsers = async (req, res) => {

    const userObjects = req.body
    try {
        for (let userObj of userObjects) {
            const newUser = new User({
                userId: userObj.userId,
                userName: userObj.userName,
                date: userObj.date,
                punchIn: userObj.punchIn,
                punchOut: userObj.punchOut
            });
            await newUser.save(); // save document in DB
        }
        res.status(200).json('Users created successfully!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// function to get one only user information
exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(user)

    } catch (err) {
        // conditional to check if is not a valid format Id in mongoDB
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: err.message });
    }
}

// Function to update a user registry
exports.updateUser = async (req, res) => {
    try {
        const objectId = req.params.userId
        const { userId, userName, date, punchIn, punchOut } = req.body

        // conditional to check required fields
        if (!userId || !userName || !date) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        // conditional to check type of fields
        if (typeof userId !== 'string' || typeof userName !== 'string') {
            return res.status(400).json({ message: 'Invalid field type' })
        }

        const update = {}
        if (userId) update.userId = userId
        if (userName) update.userName = userName
        if (date) update.date = date
        if (punchIn) update.punchIn = punchIn
        if (punchOut) update.punchOut = punchOut

        const userUpdated = await User.findByIdAndUpdate(objectId, update, { new: true })

        res.json(userUpdated);
    } catch (err) {
        // conditional to check if is not a valid format Id in mongoDB
        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: err.message });
    }
}

// Function to delete a user registry
exports.deleteUser = async (req, res) => {
    try {
        const objectId = req.params.userId
        const deletedUser = await User.deleteOne({ _id: objectId })

        if (deletedUser.deletedCount === 0) {
            res.status(404).json({ message: 'User not found' })
        }

        res.status(204).send()

    } catch (err) {

        if (err.name === 'CastError' && err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        res.status(500).json({ message: err.message });
    }
}