const ModulePlan = require('../models/modulePlanSchema');
// const Lecture = require('../models/lecturePlanSchema');

exports.createModulePlan = async (req, res) => {
    try {
      const { block, batch, semester, studyProgram, startDate, endDate, moduleName, professors, message } = req.body;
    //   if (!block || !batch || !semester || !studyProgram || !startDate ) {
    //     return res.status(400).json({ error: 'All fields are required' });
    //   }
      const newModulePlan = new ModulePlan({block, batch, semester, studyProgram, startDate, endDate, moduleName, professors, message });
      await newModulePlan.save();
      res.status(200).json(newModulePlan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.ModulePlanInProgress = async (req, res) => {
    try {
       const modulePlan = await ModulePlan.find({ status: 'progress' }).select(' block batch semester studyProgram startDate endDate moduleName professors');
       res.json( modulePlan ); 
    } catch (error) {
       res.status(400).json({ message : error.message})
    }
  };

exports.ModulePlanCompleted = async (req, res) => {
    try {
       const modulePlan = await ModulePlan.find({ status: 'completed' }).select(' block batch semester studyProgram startDate endDate moduleName professors');
       res.json( modulePlan ); 
    } catch (error) {
       res.status(400).json({ message : error.message})
    }
  };

  exports.ModulePlanApproved = async (req, res) => {
    try {
       const modulePlan = await ModulePlan.find({ status: 'approved' }).select(' block batch semester studyProgram startDate endDate moduleName professors');
       res.json( modulePlan ); 
    } catch (error) {
       res.status(400).json({ message : error.message})
    }
  };
