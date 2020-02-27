const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        // find each person with this email
        const query = User.findOne({'_id': req.userData.userId});

        // selecting the `email` fields
        query.select('_id role');

        // execute the query at a later time
        query.exec(function (err, user) {
                if (err) return handleError(err);
                const role = user.role;

                if (role === 3) {
                    return res.status(401).json({
                        message: 'You are banned by an admin',
                    });
                }

                if (role === 1) {
                    next()
                } else {
                    return res.status(401).json({
                        message: 'You are not admin',
                    });
                }

            }
        );

    } catch (error) {
        return res.status(500).json({
            message: 'not allawed middleware - ' + error,
        });
    }
};


