const pool = require("../../config/database");


module.exports = {
    insertPost: (data, userId, callback) => {
console.log("Dit is de data" + data)
        pool.query(
            // `insert into Post(text, userId, postDate, categoryId, title)
            //     values(?, ?,now(),?,?)`,
            `insert into Post(text, image, userid, categoryId, title,postDate)
                values(?, FROM_BASE64(?), ?, ?, ?, now())`,
            [
                data.text,
                data.image,
                userId,
                data.categoryId,
                data.title,
            ],
            console.log("inserted"),
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getCategories: callback => {
        // console.log("CATEGORIES")
        pool.query(
            `select * from Category`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                // console.log(results[0].categoryId)
                return callback(null, results);
            }
        )
    },


    create: (data, callback) => {
        pool.query(
            `insert into Account(firstname, lastname, register_date, password, role, email)
        values(?, ?, ?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name,
                data.register_date,
                data.password,
                data.role,
                data.email,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    }
}
