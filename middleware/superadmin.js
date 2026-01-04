const CustomErrorHandler = require("../utils/custom-error-handler");

const superAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "superadmin") {
      throw CustomErrorHandler.Forbidden("you are not superadmin");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = superAdmin;
