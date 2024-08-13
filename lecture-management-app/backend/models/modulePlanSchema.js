const mongoose = require('mongoose')

const modulePlanSchema = new mongoose.Schema({
    block: {
        type: Number,
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
        ref: 'Course',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
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
        // ref: 'Course',
        trim: true,
        required: true,
    },
    professors: [{
        type: String,
        // ref: 'User',
        required: true
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
    // conflicts: {
    //     type: Boolean,
    //     default: false
    // },
},{
    timestamps: true,
})

const ModulePlan = mongoose.model('ModulePlan', modulePlanSchema);
module.exports = ModulePlan;