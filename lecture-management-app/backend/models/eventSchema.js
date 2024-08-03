const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
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
                return this.startDate <= value;
            },
            message: 'endDate must be after startDate'
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
    eventDetails: {
        type: String,
        trim: true,
        required: true,
    },
    eventType:{
        type: String,
        enum: ['Public Holiday', 'Convocation', 'Summer Break', 'Campus Event', 'Christmas Break', 'Other'],
        required: true,
    }
},{
    timestamps: true,
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;