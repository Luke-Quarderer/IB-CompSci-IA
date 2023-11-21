 const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    timeFlown:{
        type: Number,
        required: true
    },
    vfrIFR:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    conditions:{
        type: String,
        required: true
    },
    comments:{
        type: String
    },
    solo:{
        type: String,
        required: true
    },  
    tailNo:{
        type: String
    },
    instructorLicense: {
        type: String,
        default: "not applicable"
    }

})


module.exports = mongoose.model('Log', logSchema)