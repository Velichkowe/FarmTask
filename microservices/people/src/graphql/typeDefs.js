const { gql } = require('apollo-server');

module.exports = gql`
	type User @key(fields: "id") {
		id: ID!,
		firstName: String!,
		lastName: String!,
		password: String!,
		employees: [Employee]!
		role: Role!
	}

	type Role @key(fields: "id") {
		id: ID!
		name: String!
		users: [User]!
	}

	type Employee @key(fields: "id") {
		id: ID!
		firstName: String!
		lastName: String!
		address: String!
		number: String!
		salary: Int!
		user: User!
	}

	# type UserRole @key(fields: "id") {
	# 	id: ID!
	# 	user: User!
	# 	role: Role!
	# }

	extend type Query {
		user(id: ID!): User!
		users: [User]!
		role: Role!
		roles: [Role]!
		employee(id: ID!): Employee!
		employees: [Employee]!
		# userRole(id: ID!): UserRole
		# userRoles: [UserRole]!
	}
`;
