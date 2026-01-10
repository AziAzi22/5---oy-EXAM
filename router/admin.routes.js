const { Router } = require("express");
const superAdmin = require("../middleware/superadmin");
const {
  roleUpgrade,
  getAllUser,
  downgrade,
} = require("../controller/admin.controller");
const authorization = require("../middleware/authorization");

const adminRouter = Router();

adminRouter.patch("/role_upgrade", authorization, superAdmin, roleUpgrade);
adminRouter.patch("/role_downgrade", authorization, superAdmin, downgrade);
adminRouter.get("/get_all_user", authorization, superAdmin, getAllUser);

module.exports = adminRouter;
