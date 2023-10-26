const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    timeOfDay:{
        type: String,
        required: true
    },
    vfrIFR:{
        type: Boolean,
        required: true
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
    solo:{
        type: Boolean,
        default: false
    },
    tailNo:{
        type: String
    },
    instructorLicense: {
        type: String,
        default: "blank"
    }

})

module.exports = mongoose.model('Log', logSchema)