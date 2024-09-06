const CrudRepository = require("./crud-repository");
const { Role } = require("../models");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }

  async getRoleByName(userRole) {
    const role = await Role.findOne({ where: { role: userRole } });
    return role;
  }
}

module.exports = RoleRepository;
