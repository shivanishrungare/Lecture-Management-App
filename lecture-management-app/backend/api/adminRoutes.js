const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @swagger
 * /api/admin/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studyProgram:
 *                     type: string
 *                     description: Study program for the course
 *                     example: "ACS"
 *                   moduleName:
 *                     type: string
 *                     description: Name of the course module
 *                     example: "Advanced Computer Science"
 *                   creditPoints:
 *                     type: string
 *                     description: Credit points for the course
 *                     example: "8"
 *                   language:
 *                     type: string
 *                     description: Language of instruction
 *                     example: "English"
 *                   moduleDetails:
 *                     type: string
 *                     description: Details of the module
 *                     example: "Introduction to AWS"
 */
router.get('/courses', adminController.getAllCourses);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 studyProgram:
 *                   type: string
 *                   description: Study program for the course
 *                   example: "ACS"
 *                 moduleName:
 *                   type: string
 *                   description: Name of the course module
 *                   example: "Advanced Computer Science"
 *                 creditPoints:
 *                   type: string
 *                   description: Credit points for the course
 *                   example: "8"
 *                 language:
 *                   type: string
 *                   description: Language of instruction
 *                   example: "English"
 *                 moduleDetails:
 *                   type: string
 *                   description: Details of the module
 *                   example: "Introduction to AWS"
 *       404:
 *         description: Course not found
 */
router.get('/courses/:id', adminController.getCourseById);

/**
 * @swagger
 * /api/admin/course:
 *   post:
 *     summary: Add a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studyProgram:
 *                 type: string
 *                 description: Study program for the course
 *                 example: "ACS"
 *               moduleName:
 *                 type: string
 *                 description: Name of the course module
 *                 example: "Advanced Computer Science"
 *               creditPoints:
 *                 type: string
 *                 description: Credit points for the course
 *                 example: "8"
 *               language:
 *                 type: string
 *                 description: Language of instruction
 *                 example: "English"
 *               moduleDetails:
 *                 type: string
 *                 description: Details of the module
 *                 example: "Introduction to AWS"
 *     responses:
 *       201:
 *         description: Course added successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/course', adminController.addCourse);

/**
 * @swagger
 * /api/admin/course/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/course/:id', adminController.deleteCourse);

/**
 * @swagger
 * /api/admin/courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studyProgram:
 *                 type: string
 *               moduleName:
 *                 type: string
 *               creditPoints:
 *                 type: string
 *               language:
 *                 type: string
 *               moduleDetails:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put('/courses/:id', adminController.updateCourseById);

/**
 * @swagger
 * /api/admin/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   startDate:
 *                     type: string
 *                     format: date
 *                     description: Event start date
 *                     example: "2024-09-28"
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: Event end date
 *                     example: "2024-09-28"
 *                   startTime:
 *                     type: string
 *                     format: time
 *                     description: Event start time
 *                     example: "09:00"
 *                   endTime:
 *                     type: string
 *                     format: time
 *                     description: Event end time
 *                     example: "18:00"
 *                   eventDetails:
 *                     type: string
 *                     description: Details of the event
 *                     example: "Public Holiday"
 *                   eventType:
 *                     type: string
 *                     description: Type of the event
 *                     example: "Other"
 *                   status:
 *                     type: string
 *                     description: Event status
 *                     example: "Block"
 */
router.get('/events', adminController.getAllEvents);

/**
 * @swagger
 * /api/admin/event:
 *   post:
 *     summary: Add a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Event start date
 *                 example: "2024-09-28"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Event end date
 *                 example: "2024-09-28"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Event start time
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: Event end time
 *                 example: "18:00"
 *               eventDetails:
 *                 type: string
 *                 description: Details of the event
 *                 example: "Public Holiday"
 *               eventType:
 *                 type: string
 *                 description: Type of the event
 *                 example: "Other"
 *               status:
 *                 type: string
 *                 description: Event status
 *                 example: "Block"
 *     responses:
 *       201:
 *         description: Event added successfully
 *       400:
 *         description: Invalid input data
 */
router.post('/event', adminController.addEvent);

/**
 * @swagger
 * /api/admin/event/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete('/event/:id', adminController.deleteEvent);

/**
 * @swagger
 * /api/admin/event/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               startTime:
 *                 type: string
 *                 format: time
 *               endTime:
 *                 type: string
 *                 format: time
 *               eventDetails:
 *                 type: string
 *               eventType:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put('/event/:id', adminController.updateEventById);

module.exports = router;
