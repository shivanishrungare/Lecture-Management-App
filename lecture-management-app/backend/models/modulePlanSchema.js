import mongoose from 'mongoose';

const modulePlanSchema = new mongoose.Schema({
    block: {
        type: Number,
        enum: ['1','2','3','4','5a','5b','6','7','8'],
        required: true,
    },
    batch: {
        type: String,
        match: /^\d{4}-\d{4}$/, 
        required: true,
        trim: true,
    },
    semester: {
        type: Number,
        enum: ['1', '2', '3', '4'],
        required: true
    },
    studyProgram: {
        type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        trim: true,
        required: true,
    },
    professors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    message: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['in progress', 'completed', 'approved'],
        default: 'in progress',
    },
    conflicts: {
        type: Boolean,
        default: false
    },
},{
    timestamps: true,
})

const ModulePlan = mongoose.model('ModulePlan', modulePlanSchema);
module.exports = ModulePlan;