const ModulePlan = require('../models/modulePlanSchema');
const Lecture = require('../models/lecturePlanSchema')
const User = require('../models/userSchema');


exports.createModulePlan = async (req, res) => {
    try {
      const { block, batch, semester, studyProgram, startDate, endDate, moduleName, professors, message } = req.body;
      if (!Array.isArray(professors)) {
        return res.status(400).json({ message: "Professors must be an array." });
      }
      const cleanedProfessors = professors.map(prof => ({
        id: prof.id,
        name: prof.name,
      }));
      
      const newModulePlan = new ModulePlan({block, batch, semester, studyProgram, startDate, endDate, moduleName, professors: cleanedProfessors, message });
      
      await newModulePlan.save();
      res.status(200).json(newModulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.ModulePlanInProgress = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id).select('role');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let modulePlan;
  
      if (user.role === 'Admin') {
        modulePlan = await ModulePlan.find({ status: 'progress' }).select(
          'block batch semester studyProgram startDate endDate moduleName professors message'
        );
      } else if (user.role === 'Professor') {
        modulePlan = await ModulePlan.find({
          status: 'progress',
          'professors.id': id, 
        }).select('block batch semester studyProgram startDate endDate moduleName professors message');
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      res.json(modulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.ModulePlanCompleted = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id).select('role');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let modulePlan;
  
      if (user.role === 'Admin') {
        modulePlan = await ModulePlan.find({ status: 'completed' }).select(
          'block batch semester studyProgram startDate endDate moduleName professors message'
        );
      } else if (user.role === 'Professor') {
        modulePlan = await ModulePlan.find({
          status: 'completed',
          'professors.id': id, 
        }).select('block batch semester studyProgram startDate endDate moduleName professors message');
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      res.json(modulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.ModulePlanApproved = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findById(id).select('role');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let modulePlan;
  
      if (user.role === 'Admin') {
        modulePlan = await ModulePlan.find({ status: 'approved' }).select(
          'block batch semester studyProgram startDate endDate moduleName professors message'
        );
      } else if (user.role === 'Professor') {
        modulePlan = await ModulePlan.find({
          status: 'approved',
          'professors.id': id, 
        }).select('block batch semester studyProgram startDate endDate moduleName professors message');
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      res.json(modulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.createLecturePlan = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const { lectureDate, lectureWeek, startTime, endTime, professors, lectureDetails, lectureUnits } = req.body;
  
      const module = await ModulePlan.findById(moduleId);
  
      if (!module) {
        return res.status(404).json({ message: 'Module not found' });
      }

      const validProfessors = module.professors.filter(moduleProf =>
        professors.includes(moduleProf.name)
      );
  
      if (validProfessors.length === 0) {
        return res.status(400).json({ message: 'No valid professors provided from the module' });
      }
  
      const cleanedProfessors = validProfessors.map(prof => ({
        _id: prof._id,
        id: prof.id,
        name: prof.name
      }));
  
      const newLecture = new Lecture({
        lectureWeek,
        lectureDate,
        module: moduleId,
        startTime,
        endTime,
        professors: cleanedProfessors, 
        lectureDetails,
        lectureUnits
      });

      await newLecture.save();

      res.status(200).json(newLecture);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  

  exports.getAllLecturePlans = async (req, res) => {
    try {
      const lecturePlans = await Lecture.find().select('lectureWeek lectureDate module startTime endTime professors lectureDetails, lectureUnits');
      
      if (!lecturePlans || lecturePlans.length === 0) {
        return res.status(404).json({ message: 'No lecture plans found' });
      }
  
      res.json(lecturePlans); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.getLecturePlanById = async(req, res) => {
    try {
      const { id } = req.params;
      const plan = await Lecture.findById(id);
      if (!plan) {
        return res.status(404).json({ message: 'Lecture not found' });
      }
      res.json(plan)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  exports.getModulePlanById = async (req, res) => {
    try {
      const { moduleId } = req.params;
  
      const modulePlan = await ModulePlan.findOne({ _id : moduleId })
      .select('block batch semester studyProgram moduleName startDate endDate professors message');

    if (!modulePlan) {
      return res.status(404).json({ message: 'Module plan not found for the provided module' });
    }
    res.json(modulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  exports.getLecturePlansByModuleId = async (req, res) => {
    try {
      const { moduleId } = req.params;
      const modulePlan = await ModulePlan.findOne({ _id : moduleId });
      if (!modulePlan) {
        return res.status(404).json({ message: 'Module not found' });
      }
      const lecturePlans = await Lecture.find({ module : moduleId })
      .select('lectureWeek lectureDate module startTime endTime professors lectureDetails');

    if (!lecturePlans || lecturePlans.length === 0) {
      return res.status(404).json({ message: 'Lecture plan not found for the provided module' });
    }

    res.json(lecturePlans);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  exports.updateModulePlanStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const module = await ModulePlan.findById(id);
      if (!module) {
        return res.status(404).json({ message: 'Module not found' });
      }

      module.status = status;
      const updatedStatus = await module.save();
      res.status(200).json(updatedStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  exports.getApprovedLecturePlans = async (req, res) => {
    try {
      const { id } = req.params; // userId
  
      const user = await User.findById(id).select('role');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let modulePlans;
  

      if (user.role === 'Admin') {
        modulePlans = await ModulePlan.find({ status: 'approved' }).select('_id');
      } 

      else if (user.role === 'Professor') {
        modulePlans = await ModulePlan.find({
          status: 'approved',
          'professors.id': id,  
        }).select('_id');
      } 
      else {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const modulePlanIds = modulePlans.map(plan => plan._id);
  
      let lecturePlans;
  

      if (user.role === 'Admin') {
        lecturePlans = await Lecture.find({
          module: { $in: modulePlanIds }
        }).select('lectureWeek module lectureDate startTime endTime professors lectureDetails room');
      } 
     
      else if (user.role === 'Professor') {
        lecturePlans = await Lecture.find({
          module: { $in: modulePlanIds },
          'professors.id': id 
        }).select('lectureWeek module lectureDate startTime endTime professors lectureDetails room');
      }
  
      res.json(lecturePlans);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

  exports.updateLecturePlanById = async (req, res) => {
      try {
          const { id } = req.params; 
  
          const updatedData = {
              lectureWeek: req.body.lectureWeek,
              lectureDate: req.body.lectureDate,
              startTime: req.body.startTime,
              endTime: req.body.endTime,
              professors: req.body.professors,
              lectureDetails: req.body.lectureDetails,
              room: req.body.room
          };
  

          const updatedLecturePlan = await Lecture.findByIdAndUpdate(
              id,
              updatedData,
              { new: true, runValidators: true }
          );
  
   
          if (!updatedLecturePlan) {
              return res.status(404).json({ message: 'Lecture plan not found' });
          }
  
          res.status(200).json(updatedLecturePlan);
      } catch (error) {
          console.error('Error updating lecture plan:', error);
          res.status(400).json({ message: 'Server error' });
      }
  };
  
  