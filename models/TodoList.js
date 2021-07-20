const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoListSchema = new Schema({

    id : {
        type :Number,
        required :true,
        unique: true,

    },

    title : {
        type :String,
        required :true,
    },

    timestamp : {
        type :Date,
    },

    color : {
        type :String,
        
    },

    completed : {
        type : Boolean,
        required :true,      
    },

    priority : {
        type :String,
        enum :['high', 'medium', 'low'],
        required :true,
        
    },

    

})

const ToDo = mongoose.model("ToDo",todoListSchema);

module.exports = ToDo;