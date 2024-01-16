import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const app = express();

// env config
dotenv.config();

// config Database connection
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// external router and import route files
import departmentRoute from './routes/departmentRoute.js'
import employeeRoute from './routes/employeeRoute.js'
app.use('/department', departmentRoute)
app.use('/employee', employeeRoute)

// defaut route
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Hello Emplayee",
  });
});

// start server on port
app.listen(process.env.PORT, () => {
  console.log(`Server start on ${process.env.PORT}`);
});
