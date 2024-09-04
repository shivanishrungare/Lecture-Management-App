const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true,
        trim: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    eventDetails: {
        type: String,
        trim: true,
        required: true,
    },
    eventType: {
        type: String,
        enum: ['Public Holiday', 'Convocation', 'Summer Break', 'Campus Event', 'Christmas Break', 'Other'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Block', 'Open'],
        default: 'Open',
    },
    room: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

// Pre-save middleware to validate startDate, endDate, startTime, endTime
eventSchema.pre('save', function(next) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    if (endDate < startDate) {
        return next(new Error('End date must be the same as or after the start date.'));
    }

    // Check times only if the dates are the same
    if (this.startDate === this.endDate) {
        const startDateTime = new Date(`1970-01-01T${this.startTime}:00Z`);
        const endDateTime = new Date(`1970-01-01T${this.endTime}:00Z`);
        if (endDateTime <= startDateTime) {
            return next(new Error('End time must be after start time when both times are on the same day.'));
        }
    }

    next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
