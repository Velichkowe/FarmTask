'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MachineType extends Model {
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
    MachineType.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'MachineType',
            tableName: 'machine_type'
        }
    );

    return MachineType;
};
