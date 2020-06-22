const pool = require("../../config/database");
const {removePrivacyFields} = require("../privacy/privacy.service");

const standardResponse = (callback, error, results, fields) => {
    if (error) {
        return callback(error);
    }

    results = removePrivacyFields(results);
    return callback(null, results);
};

module.exports = {

    fetchAll: (userId, includeNotfollowed, callback) => {
        let joinType = 'JOIN';
        if (includeNotfollowed)
            joinType = 'left JOIN';
        pool.query(
            `SELECT a.userId, a.firstname, a.tussenvoegsel, a.register_date, a.lastname,
            TO_BASE64(a.image) image, a.register_date, a.role, a.email, a.activated,
            (f.userId is not null) isFollowingThem, 
            pr.address as privacyAddress, pr.email as privacyEmail, pr.telephone as privacyTelephone
                    FROM Account a
                    ` + joinType + ` Followed_people f
                        on f.userId = ?
                        AND f.followedUser = a.userId
                LEFT JOIN Privacy pr ON pr.userId = a.userId 
               WHERE a.userId <> ? 
               AND a.activated = 1 
               AND a.role <> "user"`,
            [userId, userId],
            standardResponse.bind(this, callback)
        );
    },

    deleteFollow: (thisUserId, theirUserId, callback) => {
        pool.query(
            `DELETE FROM Followed_people 
                WHERE userId = ? AND followedUser = ?`,
            [thisUserId, theirUserId],
            standardResponse.bind(this, callback)
        );
    },

    addFollow: (thisUserId, theirUserId, callback) => {
        pool.query(
            `INSERT INTO Followed_people
                    (userId, followedUser) VALUES 
                    (?, ?)`,
            [thisUserId, theirUserId],
            standardResponse.bind(this, callback)
        );
    },
};
