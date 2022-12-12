const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    id:{type:Number},
    name:{type:String,required: true},
    currentClass:{type:Number,required: true},
    division: {type:String,required: true}
});

const trackSchema = new Schema({
    id:{type:String},
    sequence:{type:Number}
})

const student = mongoose.model("student",studentSchema);
const track = mongoose.model("track",trackSchema);

module.exports = {student,track};