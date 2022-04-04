'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Machine', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            machineTypeId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            farmId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            grainTankCapacity: Sequelize.INTEGER,
            maxHp: Sequelize.INTEGER,
            maxCutWidth: Sequelize.FLOAT,
            unloadingSpeed: Sequelize.INTEGER,
            maxLiftCapacity: Sequelize.INTEGER,
            transmission: Sequelize.STRING,
            engine: Sequelize.STRING,
            pickUpWidth: Sequelize.INTEGER,
            plungerSpeed: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Machine');
    }
};
