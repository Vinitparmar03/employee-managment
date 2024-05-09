import express from "express";
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
} from "../controllers/employee.js";
import { singleUpload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/add", singleUpload, addEmployee);

app.get("/getallemployees", getEmployees);

app
  .route("/:id")
  .get(getSingleEmployee)
  .put(singleUpload, updateEmployee)
  .delete(deleteEmployee);

export default app;
