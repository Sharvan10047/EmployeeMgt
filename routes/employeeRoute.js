import express from "express";
import {
  createEmployeeController,
  deleteEmployeeController,
  getAllEmployeeController,
  updateEmployeeController,
} from "../controller/employeeController.js";

const router = express.Router();

// for get imployee all list
router.get("/", getAllEmployeeController);

// for create new imployee
router.post("/", createEmployeeController);

// for update imployee
router.put("/:id", updateEmployeeController);

// for create new imployee
router.delete("/:id", deleteEmployeeController);

export default router;
