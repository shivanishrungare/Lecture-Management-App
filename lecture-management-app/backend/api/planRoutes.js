const express = require('express');
const cors = require('cors');
const planController = require('../controllers/planController');
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /api/plans/approvedPlan/{id}:
 *   get:
 *     summary: Get approved module plan by user ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve approved plans for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of approved module plans
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
 * /api/plans/completedPlan/{id}:
 *   get:
 *     summary: Get completed module plan by user ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve completed plans for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of completed module plans
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
 * /api/plans/progressPlan/{id}:
 *   get:
 *     summary: Get module plans in progress by user ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve in-progress plans for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of module plans in progress
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
 * /api/plans/modulePlan/{moduleId}:
 *   get:
 *     summary: Get module plan by module ID
 *     tags: [Plans]
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
 * /api/plans/modulePlan:
 *   post:
 *     summary: Create a new module plan
 *     tags: [Plans]
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
 * /api/plans/lecturePlan/{moduleId}:
 *   post:
 *     summary: Create a new lecture plan for a specific module
 *     tags: [Plans]
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
 * /api/plans/lecturePlan:
 *   get:
 *     summary: Get all lecture plans
 *     tags: [Plans]
 *     responses:
 *       200:
 *         description: List of all lecture plans
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
 * /api/plans/lecturePlan/{id}:
 *   get:
 *     summary: Get lecture plan by ID
 *     tags: [Plans]
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
 * /api/plans/lecturePlan/{id}:
 *   put:
 *     summary: Update lecture plan by ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lecture plan to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LecturePlan'
 *     responses:
 *       200:
 *         description: Lecture plan updated successfully
 *       404:
 *         description: Lecture plan not found
 */
router.put('/lecturePlan/:id', planController.updateLecturePlanById);
/**
 * @swagger
 * /api/plans/lecturePlans/{moduleId}:
 *   get:
 *     summary: Get lecture plans by module ID
 *     tags: [Plans]
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
 * /api/plans/approvedLecturePlans/{id}:
 *   get:
 *     summary: Get approved lecture plans by user ID
 *     tags: [Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve approved lecture plans for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of approved lecture plans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LecturePlan'
 *       404:
 *         description: Approved lecture plans not found
 */
router.get('/approvedLecturePlans/:id', planController.getApprovedLecturePlans);

/**
 * @swagger
 * /api/plans/modulePlan/{id}/status:
 *   put:
 *     summary: Update module plan status
 *     tags: [Plans]
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
