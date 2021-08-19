// MOngoose and Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Schemas
const lessonSchema = new Schema({
    name:{type:String,required:true}
},
{collection:"lessons"})
const squadSchema = new Schema({
    name:{type:String,required:true},
    lessonId:[{ type: Schema.Types.ObjectId, ref: 'lesson' }],
    cohort:Number
},
{collection:"squads"})
// Model
const lesson = mongoose.model("lessons",lessonSchema)
const squad = mongoose.model("squads",squadSchema)
// Export
module.exports={lesson,squad}