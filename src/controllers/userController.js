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
        res.json(sheet_data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}