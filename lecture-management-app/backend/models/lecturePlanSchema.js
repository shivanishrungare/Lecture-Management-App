const mongoose = require('mongoose')
const ModulePlan = require('../models/modulePlanSchema');

const lecturePlanSchema = new mongoose.Schema({
    lectureWeek: {
        type: Number,
        min: 1,
        max: 8,
        required: true,
    },
    module: {
        type: mongoose.Schema.Types.ObjectId, ref: 'ModulePlan'
    },
    lectureDate: {
        type: String,
        required: true,
        validate: {
            validator: async function(value) {
                const module = await ModulePlan.findById(this.module);
                if (!module) {
                    throw new Error('ModulePlan not found');
                }

                return value >= module.startDate && value <= module.endDate;
            },
            message: 'lectureDate must be between the module startDate and endDate'
        }
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return this.startTime < value;
            },
            message: 'endTime must be after startTime'
        }
    },
    professors: [{
        _id: mongoose.Schema.Types.ObjectId,
        id: String,
        name: String
    }],
    lectureDetails: {
        type: String,
        required: true,
        trim: true,
    },
    lectureUnits: {
        type: Number,
        required: true,
        trim: true,
    },
    room: {
        type: String,
        trim: true,
    }
},{
    timestamps: true,
})


const Lecture = mongoose.model('Lecture', lecturePlanSchema);
module.exports = Lecture;