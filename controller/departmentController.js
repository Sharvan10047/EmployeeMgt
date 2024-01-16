import _ from "lodash";
import Department from "../model/departmentModel.js";

export const getAllDepartmentsController = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).send({
      success: true,
      message: "Get all department list successfully.",
      departments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to get all department list.",
    });
  }
};

export const createDepartmentsController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(500).send({
        success: false,
        message: "Department name is required.",
      });
    } else {
      const slug = _.kebabCase(name);
      const departments = await Department.create({ name, slug});
      res.status(200).send({
        success: true,
        message: "Create new department is successfully.",
        departments,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to crate new department.",
    });
  }
};

export const updateDepartmentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const department = await Department.findById(id);
    if (_.isEmpty(department)) {
      res.status(404).send({
        success: false,
        message: "Department not found.",
      });
    } else {
      if (!name) {
        res.status(500).send({
          success: false,
          message: "Department name is required.",
        });
      } else {
        department.name = name;
        department.slug = _.kebabCase(name);
        const departments = await department.save();
        res.status(200).send({
          success: true,
          message: "Update department is successfully.",
          departments,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to update department.",
    });
  }
};

export const deleteDepartmentsController = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (_.isEmpty(department)) {
      res.status(404).send({
        success: false,
        message: "Department not found.",
      });
    } else {
      await department.deleteOne();
      res.status(200).send({
        success: true,
        message: "Delete department is successfully.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Fail to delete department.",
    });
  }
};
