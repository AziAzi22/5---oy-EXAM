const { Router } = require("express");
const superAdmin = require("../middleware/superadmin");
const {
  roleUpgrade,
  getAllUser,
  downgrade,
} = require("../controller/admin.controller");
const checkAdmin = require("../middleware/check-admin");

const adminRouter = Router();

adminRouter.put("/role_upgrade", checkAdmin, superAdmin, roleUpgrade);
adminRouter.get("/get_all_user", checkAdmin, superAdmin, getAllUser);
adminRouter.put("/role_downgrade", checkAdmin, superAdmin, downgrade);

module.exports = adminRouter;
