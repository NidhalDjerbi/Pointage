// Load modules
const mongoose = require('mongoose');

// Load mongoose Schema
const { Schema } = mongoose;

/*
* Employee Model Schema
*/
const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    dateCreated: {
      type: Date,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    },
    salary: {
      type: Number,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

// Load model
const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;