const pool = require("../../config/database");

module.exports = {

    insertAttendance: (eventId, userId, callback) => {
        pool.query(
            'INSERT INTO Attendants VALUE (? , ?)',
            [eventId, userId, userId, eventId],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, true);
            }
        )
    }
}