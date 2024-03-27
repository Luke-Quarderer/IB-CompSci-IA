const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    logs: {
        type: Array
    }
})
const passportLocalMongoose = require("passport-local-mongoose")
userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', userSchema)