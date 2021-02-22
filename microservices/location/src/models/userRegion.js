'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserRegion extends Model {
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
    UserRegion.init(
        {
            userId: {
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
            modelName: 'UserRegion',
            tableName: 'userRegion'
        }
    );

    return UserRegion;
};
