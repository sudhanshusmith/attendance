const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        default : 1
    },
    history : {
        type : Array,
        required : true,
        default : []
    }
});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade;