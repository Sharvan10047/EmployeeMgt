import _ from "lodash";
import Employee from "../model/employeeModel.js";
import Department from "../model/departmentModel.js";

// get all employee list
export const getAllEmployeeController = async (req, res) => {
  try {
    const employees = await Employee.find({});
    if (_.isEmpty(employees)) {
      res.status(500).send({
        success: false,
        message: `This employee not found.`,
      });
    } else {
      const getList = Promise.all(
        _.map(employees, async (v, i) => {
          const newDepartment = await Department.findById(v?.department)
            v.department = newDepartment
            return v
        })
      )
      getList.then(r => { 
        res.status(200).send({
          success: true,
          message: "Get all employee list successfully",
          count: employees.length,
          employees: r,
        });
      }).catch(error => {
        console.error(error);
        res.status(500).send({
          success: false,
          message: "Fail to get all employee list",
        });
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to get all employee list",
    });
  }
};

// get all employee list
export const createEmployeeController = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    if (!firstName || !lastName || !department) {
      res.status(500).send({
        success: false,
        message: `Please provide all required data.`,
      });
    } else {
      const slug = _.kebabCase(firstName + ' ' + lastName);
      const employee = await Employee.create({
        firstName,
        lastName,
        slug,
        department,
      });
      res.status(200).send({
        success: true,
        message: "Create new employee is successfully.",
        employee,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to create new employee list",
    });
  }
};

// get all employee list
export const updateEmployeeController = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    if (!firstName || !lastName || !department) {
      res.status(500).send({
        success: false,
        message: `Please provide all required data.`,
      });
    } else {
      const employee = await Employee.findById(req.params.id);
      if (_.isEmpty(employee)) {
        res.status(500).send({
          success: false,
          message: `This employee not found.`,
        });
      } else {
        employee.firstName = firstName
        employee.lastName = lastName
        employee.department = department
        employee.slug = _.kebabCase(firstName + ' ' + lastName);
        await employee.save();
        res.status(200).send({
          success: true,
          message: "Update employee is successfully.",
          employee,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to update employee list",
    });
  }
};

// get all employee list
export const deleteEmployeeController = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (_.isEmpty(employee)) {
      res.status(500).send({
        success: false,
        message: `This employee not found.`,
      });
    } else {
      await employee.deleteOne();
      res.status(200).send({
        success: true,
        message: `Employee ${employee?.firstName} ${employee?.lastName} is deleted successfully.`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to delete employee list",
    });
  }
};
