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
        type: Object,
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
        type: Object,
        default: false
    },  
    tailNo:{
        type: String
    },
    instructorLicense: {
        type: String,
        default: ""
    }

})


module.exports = mongoose.model('Log', logSchema)