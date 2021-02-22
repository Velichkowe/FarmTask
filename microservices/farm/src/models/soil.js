'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Soil extends Model {
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
    Soil.init(
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Soil',
            tableName: 'soil'
        }
    );

    return Soil;
};
