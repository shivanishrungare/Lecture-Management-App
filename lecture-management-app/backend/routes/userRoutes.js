const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/id/:id', userController.getUserById);
router.post('/signup', userController.addUser);
router.delete('/id/:id', userController.deleteUser);
router.put('/id/:id', userController.updateUserById);


module.exports = router;