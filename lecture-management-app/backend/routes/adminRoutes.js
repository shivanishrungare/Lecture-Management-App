const express = require('express');

const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/courses', adminController.getAllCourses);
router.get('/courses/:id', adminController.getCourseById);
router.post('/course', adminController.addCourse);
router.delete('/courses/:id', adminController.deleteCourse);
router.put('/courses/:id', adminController.updateCourseById);

router.get('/events', adminController.getAllEvents);
router.post('/event', adminController.addEvent);

module.exports = router;