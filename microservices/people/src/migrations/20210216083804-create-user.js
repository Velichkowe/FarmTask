'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            isApproved: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            created: {
                type: Sequelize.DATE,
                allowNull: false
            },
            modified: {
                type: Sequelize.DATE,
                allowNull: false
            },
            modifiedBy: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            deleted: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('User');
    }
};
