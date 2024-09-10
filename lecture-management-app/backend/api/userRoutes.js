const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/id/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/id/:id', userController.getUserById);

/**
 * @swagger
 * /api/users/professors:
 *   get:
 *     summary: Get all professors
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of professors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/professors', userController.getProfessors);

/**
 * @swagger
 * /api/users/pendingUsers:
 *   get:
 *     summary: Get all pending users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of pending users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/pendingUsers', userController.pendingUsers);

/**
 * @swagger
 * /api/users/approvedUsers:
 *   get:
 *     summary: Get all approved users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of approved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/approvedUsers', userController.approvedUsers);

/**
 * @swagger
 * /api/users/rejectedUsers:
 *   get:
 *     summary: Get all rejected users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of rejected users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/rejectedUsers', userController.rejectedUsers);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing required fields or invalid data
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing username or password
 *       401:
 *         description: Incorrect username or password
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users/approve/{id}:
 *   put:
 *     summary: Approve user status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to approve
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Status to update (approved, rejected)
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/approve/:id', userController.approveUserStatus);

/**
 * @swagger
 * /api/users/id/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put('/id/:id', userController.updateUserById);

/**
 * @swagger
 * /api/users/id/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/id/:id', userController.deleteUser);

/**
 * @swagger
 * /api/users/reject/{id}:
 *   put:
 *     summary: Reject user status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to reject
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User rejected successfully
 *       404:
 *         description: User not found
 */
router.put('/reject/:id', userController.rejectUser);

/**
 * @swagger
 * /api/users/revert/{id}:
 *   put:
 *     summary: Revert user status to pending
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to revert
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User status reverted to pending
 *       404:
 *         description: User not found
 */
router.put('/revert/:id', userController.revertUser);

module.exports = router;
