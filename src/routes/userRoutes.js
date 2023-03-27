
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.post('/createUsers', userController.createUsers)
router.post('/uploadExcel', userController.uploadExcelData)

module.exports = router;