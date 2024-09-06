const { StatusCodes } = require("http-status-codes");
const { UserRepository, RoleRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Auth, Enums } = require("../utils/common");

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    const role = await roleRepository.getRoleByName(Enums.USER_ROLES.CUSTOMER);
    user.addRole(role);
    return user;
  } catch (error) {
    console.log("user-service:", error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new user.",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepository.getUserByEmail(data.email);
    if (!user) {
      throw new AppError(
        "No user found for the given email.",
        StatusCodes.NOT_FOUND
      );
    }
    const passwordMatched = Auth.checkPassword(data.password, user.password);
    if (!passwordMatched) {
      throw new AppError("Invalid Password.", StatusCodes.BAD_REQUEST);
    }

    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("Missing JWT Token.", StatusCodes.BAD_REQUEST);
    }
    const response = Auth.verifyToken(token);
    const user = await userRepository.get(response.id);
    if (!user) {
      throw new AppError("No user found.", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == "JsonWebTokenError") {
      throw new AppError("Invalid JWT Token.", StatusCodes.BAD_REQUEST);
    }
    if (error.name == "TokenExpiredError") {
      throw new AppError("JWT Token Expired.", StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function addRoleToUser(data) {
  try {
    const user = await userRepository.get(data.id);
    if (!user) {
      throw new AppError(
        "No user found for the given id.",
        StatusCodes.NOT_FOUND
      );
    }
    const role = await roleRepository.getRoleByName(data.role);
    if (!user) {
      throw new AppError(
        "No role found for the given role.",
        StatusCodes.NOT_FOUND
      );
    }
    user.addRole(role);
    return user;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAdmin(id) {
  try {
    const user = await userRepository.get(id);
    if (!user) {
      throw new AppError("No user found with given id.", StatusCodes.NOT_FOUND);
    }
    const adminRole = await roleRepository.getRoleByName(
      Enums.USER_ROLES.ADMIN
    );
    if (!adminRole) {
      throw new AppError(
        "No user found for the given role.",
        StatusCodes.NOT_FOUND
      );
    }
    return user.hasRole(adminRole);
  } catch (error) {
    console.log("isAdmin", error);
    if (error instanceof AppError) throw error;
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  signin,
  isAuthenticated,
  addRoleToUser,
  isAdmin,
};
