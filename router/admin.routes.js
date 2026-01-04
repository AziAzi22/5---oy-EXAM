const { Router } = require("express");
const superAdmin = require("../middleware/superadmin");
const {
  roleUpgrade,
  getAllUser,
  downgrade,
} = require("../controller/admin.controller");
const authorization = require("../middleware/authorization");

const adminRouter = Router();

adminRouter.put("/role_upgrade", authorization, superAdmin, roleUpgrade);
adminRouter.get("/get_all_user", authorization, superAdmin, getAllUser);
adminRouter.put("/role_downgrade", authorization, superAdmin, downgrade);

module.exports = adminRouter;
