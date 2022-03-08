const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    
    emailaddress: {
        type: String,
        required: true
    },
    
    age: {
        type: Number,
        required: true
    },
    
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)