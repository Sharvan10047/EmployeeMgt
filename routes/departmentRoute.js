import express from "express";
import {
  getAllDepartmentsController,
  createDepartmentsController,
  updateDepartmentsController,
  deleteDepartmentsController,
} from "../controller/departmentController.js";

const router = express.Router();

// to get all departments list
router.get("/", getAllDepartmentsController);

// to create new department
router.post("/", createDepartmentsController);

// to update department
router.put("/:id", updateDepartmentsController);

// to delete department
router.delete("/:id", deleteDepartmentsController);

export default router;
