'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserCountries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            countryId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('UserCountries');
    }
};
