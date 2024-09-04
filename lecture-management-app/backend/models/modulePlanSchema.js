const mongoose = require('mongoose')

const modulePlanSchema = new mongoose.Schema({
    block: {
        type: String,
        min: 1, 
        max: 8, 
        required: true,
    },
    batch: {
        type: String,
        required: true,
        trim: true,
    },
    semester: {
        type: Number,
        min: 1, 
        max: 8, 
        required: true
    },
    studyProgram: {
        type: String, 
        required: true,
        trim: true,
    },
    startDate: {
        type: String,
        required: true,
        trim: true,
    },
    endDate: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return this.startDate < value;
            },
            message: 'endDate must be after startDate'
        }
    },
    moduleName: {
        type: String, 
        trim: true,
        required: true,
    },
    professors: [{
        id: String,   
        name: String,
    }],
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['progress', 'completed', 'approved'],
        default: 'progress',
    },
},{
    timestamps: true,
})

const ModulePlan = mongoose.model('ModulePlan', modulePlanSchema);
module.exports = ModulePlan;