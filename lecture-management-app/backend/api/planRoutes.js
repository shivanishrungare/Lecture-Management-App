const express = require('express');
const cors = require('cors');
const planController = require('../controllers/planController');
const { populate } = require('../models/lecturePlanSchema');

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());


router.get('/approvedPlan/:id',  planController.ModulePlanApproved);
router.get('/completedPlan/:id',  planController.ModulePlanCompleted);
router.get('/progressPlan/:id',  planController.ModulePlanInProgress);
router.get('/modulePlan/:moduleId', planController.getModulePlanById);
router.post('/modulePlan', planController.createModulePlan);

router.post('/lecturePlan/:moduleId', planController.createLecturePlan);
router.get('/lecturePlan', planController.getAllLecturePlans);
router.get('/lecturePlan/:id', planController.getLecturePlanById);
router.put('/lecturePlan/:id', planController.updateLecturePlanById);


router.get('/lecturePlans/:moduleId', planController.getLecturePlansByModuleId);
router.get('/approvedLecturePlans/:id', planController.getApprovedLecturePlans);

router.put('/modulePlan/:id/status', planController.updateModulePlanStatus);


module.exports = router;
