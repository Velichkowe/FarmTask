'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Field extends Model {
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
    Field.init(
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            farmId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cropId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            soilId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Field',
            tableName: 'field'
        }
    );

    return Field;
};
