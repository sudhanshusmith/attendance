const mongoose = require('mongoose')

const counterSchema = mongoose.Schema(
    {
        id : {
            type: Number,
            required: [true, "Please enter id"]
        },
        counterHours : {
            type: Number,
            required: true,
            default: 0
        },
        counterEvent : {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;