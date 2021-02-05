const { User, Role, Employee } = require('../models/index');

module.exports = {
	Query: {
		users: async () => {
			try {
				const users = await User.findAll();

				return users;
			}
			catch(err) {
				console.log(err);
			}
		},

		roles: async () => {
			try {
				const roles = await Role.findAll();

				return roles;
			}
			catch(err) {
				console.log(err);
			}
		},

		// userRoles: async () => {
		//     try {
		//         const userRoles = await UserRole.findAll();

		//         return userRoles;
		//     }
		//     catch(err) {
		//         console.log(err);
		//     }
		// },

		employees: async () => {
			try {
				const employees = await Employee.findAll();
				
				return employees;
			}
			catch(err) {
				console.log(err);
			}
		}
	},

	User: {
		role: async (user) => {
			try {
				return await Role.findByPk(user.roleId)
			}
			catch(err) {
				console.log(err);
			}
		},

		employees: async (user) => {
			return await Employee.findAll({
				where: {
					userId: user.id,
				}
			});
		}
	},

	Employee: {
		user: async (employee) => {
			return await User.findByPk(employee.userId);
		}
	},

	Role: {
		users: async (role) => {
			return await User.findAll({
				where: {
					roleId: role.id,
				}
			});
		}
	}

	// UserRole: {
	// 	user: async (userRole) => {
	// 		return await User.findByPk(userRole.userId);
	// 	},

	// 	role: async (userRole) => {
	// 		return await Role.findByPk(userRole.roleId);
	// 	}
	// }
}