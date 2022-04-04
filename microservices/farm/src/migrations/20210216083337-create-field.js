'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Field', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            farmId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cropId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            soilId: {
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
        await queryInterface.dropTable('Field');
    }
};
