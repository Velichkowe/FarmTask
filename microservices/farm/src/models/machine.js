'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Machine extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         *
         * @param models
         */
        // static associate(models) {
        //     // define association here
        // }
    }
    Machine.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            machineTypeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            farmId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            grainTankCapacity: DataTypes.INTEGER,
            maxHp: DataTypes.INTEGER,
            maxCutWidth: DataTypes.FLOAT,
            unloadingSpeed: DataTypes.INTEGER,
            maxLiftCapacity: DataTypes.INTEGER,
            transmission: DataTypes.STRING,
            engine: DataTypes.STRING,
            pickUpWidth: DataTypes.INTEGER,
            plungerSpeed: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'Machine',
            tableName: 'machine'
        }
    );

    return Machine;
};
