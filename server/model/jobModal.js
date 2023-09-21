const express = require("express");
const app = express(); 

const mongoose = require("mongoose"); 
const { Schema } = mongoose;


const jobSchema = new Schema({

    jobType: { type:String},
    institute:{ type:String},
    title:{type:String},
    start:{type:Date},
    end:{type:Date},
    pdf:{type:String},
    img:{type:String},
    fee:{type:Number},
    info:{type:String},

})

module.exports=mongoose.model("Job",jobSchema)