import mongoose from 'mongoose';

const lecturePlanSchema = new mongoose.Schema({
    lectureWeek: {
        type: Number,
        enum: ['1','2','3','4','5','6','7','8'],
        required: true,
    },
    lectureDate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ModulePlan',
        validate: {
            validator: function(value) {
                return this.startDate <= value <= this.endTime;
            },
            message: 'lectureDate must be between startDate and endDate'
        }
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return this.startTime < value;
            },
            message: 'endTime must be after startTime'
        }
    },
    Professors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lectureDetails: {
        type: String,
        required: true,
        trim: true,
    },
    conflicts: {
        type: Boolean,
        default: false,
    },
},{
    timestamps: true,
})

lecturePlanSchema.pre('save', async function(next) {
    const Lecture = mongoose.model('Lecture');

    const conflictingLectures = await Lecture.find({
        professors: { $in: this.professors }, 
        lectureDate: this.lectureDate
    });

    if (conflictingLectures.length > 0) {
        this.conflicts = true;
    } else {
        this.conflicts = false;
    }

    next();
});

const Lecture = mongoose.model('Lecture', lecturePlanSchema);
module.exports = Lecture;