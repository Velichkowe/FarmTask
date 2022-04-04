'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // /**
        //  * Helper method for defining associations.
        //  * This method is not a part of Sequelize lifecycle.
        //  * The `models/index` file will call this method automatically.
        //  *
        //  * @param models
        //  */
        // static associate(models) {
        //     // define association here
        // }
    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            firstName: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING(30),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isApproved: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'User',
            createdAt: 'created',
            updatedAt: 'modified',
            deletedAt: 'deleted'
        }
    );

    return User;
};
