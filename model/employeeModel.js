import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'Employee first name is required']},
  lastName: { type: String, required: [true, 'Employee last name is required']},
  slug: { type: String, lowercase: true},
  department: {type: mongoose.Schema.Types.ObjectId, ref: 'Department'}
}, {timestamps: true})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee