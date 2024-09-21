const express = require('express');
const cors = require('cors');
const planController = require('../controllers/planController');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /api/plan/approvedPlan/{id}:
 *   get:
 *     summary: Get approved module plan by user ID
 *     tags: [ModulePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve approved plan for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of approved module plan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModulePlan'
 */
router.get('/approvedPlan/:id', planController.ModulePlanApproved);

/**
 * @swagger
 * /api/plan/completedPlan/{id}:
 *   get:
 *     summary: Get completed module plan by user ID
 *     tags: [ModulePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve completed plan for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of completed module plan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModulePlan'
 */
router.get('/completedPlan/:id', planController.ModulePlanCompleted);

/**
 * @swagger
 * /api/plan/progressPlan/{id}:
 *   get:
 *     summary: Get module plan in progress by user ID
 *     tags: [ModulePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve in-progress plan for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of module plan in progress
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ModulePlan'
 */
router.get('/progressPlan/:id', planController.ModulePlanInProgress);

/**
 * @swagger
 * /api/plan/modulePlan/{moduleId}:
 *   get:
 *     summary: Get module plan by module ID
 *     tags: [ModulePlans]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module plan found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ModulePlan'
 *       404:
 *         description: Module plan not found
 */
router.get('/modulePlan/:moduleId', planController.getModulePlanById);

/**
 * @swagger
 * /api/plan/modulePlan:
 *   post:
 *     summary: Create a new module plan
 *     tags: [ModulePlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModulePlan'
 *     responses:
 *       201:
 *         description: Module plan created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/modulePlan', planController.createModulePlan);

/**
 * @swagger
 * /api/plan/lecturePlan/{moduleId}:
 *   post:
 *     summary: Create a new lecture plan for a specific module
 *     tags: [LecturePlans]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module to associate the lecture plan with
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LecturePlan'
 *     responses:
 *       201:
 *         description: Lecture plan created successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/lecturePlan/:moduleId', planController.createLecturePlan);

/**
 * @swagger
 * /api/plan/lecturePlan:
 *   get:
 *     summary: Get all lecture plan
 *     tags: [LecturePlans]
 *     responses:
 *       200:
 *         description: List of all lecture plan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LecturePlan'
 */
router.get('/lecturePlan', planController.getAllLecturePlans);

/**
 * @swagger
 * /api/plan/lecturePlan/{id}:
 *   get:
 *     summary: Get lecture plan by ID
 *     tags: [LecturePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lecture plan to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lecture plan found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LecturePlan'
 *       404:
 *         description: Lecture plan not found
 */
router.get('/lecturePlan/:id', planController.getLecturePlanById);

/**
 * @swagger
 * /api/plan/lecturePlans/{moduleId}:
 *   get:
 *     summary: Get lecture plan by module ID
 *     tags: [LecturePlans]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         description: The ID of the module to retrieve lecture plans for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lecture plans for the given module
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LecturePlan'
 *       404:
 *         description: Lecture plans not found
 */
router.get('/lecturePlans/:moduleId', planController.getLecturePlansByModuleId);

/**
 * @swagger
 * /api/plan/approvedLecturePlans/{id}:
 *   get:
 *     summary: Get approved lecture plan by user ID
 *     tags: [LecturePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve approved lecture plan for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of approved lecture plan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LecturePlan'
 *       404:
 *         description: Approved lecture plan not found
 */
router.get('/approvedLecturePlans/:id', planController.getApprovedLecturePlans);

/**
 * @swagger
 * /api/plan/modulePlan/{id}/status:
 *   put:
 *     summary: Update module plan status
 *     tags: [ModulePlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the module plan to update
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
 *                 description: New status of the module plan
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Module plan status updated successfully
 *       404:
 *         description: Module plan not found
 */
router.put('/modulePlan/:id/status', planController.updateModulePlanStatus);

module.exports = router;
