const fs = require('fs');

const getSqlData = (sqlPath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(sqlPath, 'utf8', (err, sqlData) => {
            if (err) {
                return reject(err);
            }

            return resolve(sqlData);
        });
    });
};

module.exports = { getSqlData };
