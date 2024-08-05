const mongoose = require('mongoose')

const deletedHoursSchema = mongoose.Schema(
    {
        hoursId : {
            type: Number,
            required: true,
        },
        entry: {
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
        deletedBy : {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


const DeletedHours = mongoose.model('DeletedHours', deletedHoursSchema);

module.exports = DeletedHours;