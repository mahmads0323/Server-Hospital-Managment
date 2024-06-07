import express from "express";
import AdminSignUp from "../controller/admin/signup.js";
import AdminLogin from "../controller/admin/login.js";
import getAdminById from "../controller/admin/getById.js";
import checkAuthorization from "../middlewares/checkAuthorization.js";
import getAllAdmins from "../controller/admin/getAll.js";
import editAdmin from "../controller/admin/edit.js";
import getAdminByCookie from "../controller/admin/get.js";

const adminRouter = express.Router();

adminRouter.get("/", checkAuthorization(["admin"]), getAdminByCookie);
adminRouter.get("/all", checkAuthorization(["admin"]), getAllAdmins);

adminRouter.post("/signup", AdminSignUp);
adminRouter.post("/login", AdminLogin);

adminRouter.patch("/", checkAuthorization(["admin"]), editAdmin);

// dynamic routes
adminRouter.get("/:adminId", checkAuthorization(["admin"]), getAdminById);

export default adminRouter;
