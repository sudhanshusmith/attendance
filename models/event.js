const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        eventId : {
            type: Number,
            required: [true, "Please enter id"]
        },  
        name: {
            type: String,
            required: [true, "Please enter event name"]
        },
        type: {
            type: String,
            required: true,
        },
        venue : {
            type: String,
            required: true,
        },
        date : {
            type: String,
            required: true,
        },
    }
)

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;