const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    studyProgram: {
        type: String,
        enum: ['ACS', 'ADSA'],
        required: true,
    },
    moduleName: {
        type: String,
        trim: true,
        required: true,
    },
    creditPoints: {
        type: Number,
        trim: true,
    },
    language: {
        type: String,
        enum: ['English', 'German'],
    },
    moduleDetails: {
        type: String,
        trim: true,
    }
},{
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;