const Course= require('../models/courseSchema');
const Event= require('../models/eventSchema');
const { format, isValid } = require('date-fns');


exports.getAllCourses = async (req, res) => {
    try {
        const course = await Course.find();
        res.json(course);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        res.json(course);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}

exports.addCourse = async (req, res) => {
    try {
      const { studyProgram, moduleName, creditPoints, language, moduleDetails } = req.body;
      if (!studyProgram || !moduleName || !creditPoints || !language || !moduleDetails) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const newCourse = new Course({studyProgram, moduleName, creditPoints, language, moduleDetails });
      await newCourse.save();
      res.status(200).json(newCourse);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.updateCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const updatedCourse = await Course.findByIdAndUpdate(id, updates, {
            new: true,   
            runValidators: true,
        });
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ message: 'Server error' });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });  
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ message: 'Server error' });
    }
}

exports.addEvent = async (req, res) => {
    try {
        const { startDate, endDate, startTime, endTime, eventDetails, eventType, status } = req.body;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (!isValid(startDateObj) || !isValid(endDateObj)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        const formattedStartDate = format(startDateObj, 'yyyy-MM-dd');
        const formattedEndDate = format(endDateObj, 'yyyy-MM-dd');

        const newEvent = new Event({ 
            startDate: formattedStartDate, 
            endDate: formattedEndDate,      
            startTime, 
            endTime, 
            eventDetails, 
            eventType, 
            status, 
            });
        await newEvent.save();
        res.status(200).json(newEvent);
        } catch (error) {
        res.status(400).json({ message: error.message });
        }
  };

  exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(400).json({ message : error.message})
    }
}



exports.updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                room: req.body.room,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                eventDetails: req.body.eventDetails,
                eventType: req.body.eventType,
                status: req.body.status
            },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ message: 'Server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Event deleted successfully' });  
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(400).json({ message: 'Server error' });
    }
}