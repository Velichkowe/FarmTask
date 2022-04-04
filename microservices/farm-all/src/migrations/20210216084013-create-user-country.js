'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('UserCountry', {
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
            regionId: {
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
        await queryInterface.dropTable('UserCountry');
    }
};
