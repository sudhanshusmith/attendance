const mongoose = require('mongoose')

const hoursSchema = mongoose.Schema(
    {
        hoursId : {
            type: Number,
            required: true,
        },
        entry : {
            type: String,
            required: true,
        },
        eventId : {
            type: String,
            required: true,
        },
        eventType : {
            type: String,
            required: true,
        },
        eventHours : {
            type: Number,
            required: true,
            default: 0
        },
        addedBy : {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


const Hours = mongoose.model('Hours', hoursSchema);

module.exports = Hours;