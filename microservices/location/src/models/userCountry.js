'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserCountry extends Model {
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
    UserCountry.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            regionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'UserCountry',
            tableName: 'userCountry'
        }
    );

    return UserCountry;
};
