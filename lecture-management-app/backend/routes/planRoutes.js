const express = require('express');
const cors = require('cors');
const planController = require('../controllers/planController');

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

router.get('/approvedPlan', planController.ModulePlanApproved);
router.get('/completedPlan', planController.ModulePlanCompleted);
router.get('/progressPlan', planController.ModulePlanInProgress);
router.post('/modulePlan', planController.createModulePlan);

module.exports = router;
