const XLSX = require('xlsx');
const User = require('../models/userModel')

// function to get all users data
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
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

        res.json(newData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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
        res.json('Users created successfully!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}