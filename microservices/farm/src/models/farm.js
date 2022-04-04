'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Farm extends Model {
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
    Farm.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            countryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Farm',
            tableName: 'Farm',
            createdAt: 'created',
            updatedAt: 'modified',
            deletedAt: 'deleted'
        }
    );

    return Farm;
};
