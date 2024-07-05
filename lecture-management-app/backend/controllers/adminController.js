const Course= require('../models/courseSchema');


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