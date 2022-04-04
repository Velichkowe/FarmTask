const path = require('path');
const { getSqlData } = require('../helper');

module.exports = {
    up: async (queryInterface) => {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            const sqlData = await getSqlData(path.join(__dirname, '../migrations-sql/20210216084014-seed-data.sql'));

            await queryInterface.sequelize.query(sqlData, { transaction: transaction });

            return transaction.commit();
        } catch (err) {
            console.log('errasd', err);
            await transaction.rollback();

            throw err;
        }
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('UserCountries');
    }
};
