
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/', userController.getUsers)
router.post('/createUsers', userController.createUsers)
router.put('/:userId', userController.updateUser)
router.get('/:userId', userController.getUser)
router.delete('/:userId', userController.deleteUser)
router.post('/uploadExcel', userController.uploadExcelData)

module.exports = router;