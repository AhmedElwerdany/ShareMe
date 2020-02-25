const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        minlength:3,
        maxlength:30,
        trim:true,
        required:true
    },
    link : {
        type : String, 
        required : true
    },
    socialMedia : {
        type : String,
        required : true
    },
    gender :{
        type:String,
        enum:['Male','Female'],
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city :{ 
        type:String,
        required:true
    },
    age : {
        type: Number,
        min:10,
        max:70,
        required:true
    },
    lovers : {
        type : Number,
        default : 0
    },
    likers : {
        type: Number,
        default : 0
    },
    smilers : {
        type : Number,
        default : 0
    }
},{
    timestamps:true
})

const User = mongoose.model('users',userSchema);

module.exports = User