const express = require('express');
const cors = require('cors');
const router = express.Router();
const userController = require('../controllers/userController');
const app = express();

router.use(cors());
app.use(express.json());

router.get('/', userController.getAllUsers);
router.get('/id/:id', userController.getUserById);
router.get('/pendingUsers', userController.pendingUsers);
router.get('/approvedUsers', userController.approvedUsers);
router.get('/rejectedUsers', userController.rejectedUsers);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser)

router.put('/approve/:id', userController.approveUserStatus);
router.put('/id/:id', userController.updateUserById);

router.delete('/id/:id', userController.deleteUser);



module.exports = router;