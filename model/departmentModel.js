import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Department name is required.']},
  slug: { type: String, lowercase: true},
}, {timestamps: true});

const Department = mongoose.model('Department', departmentSchema)
export default Department