const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        // find each person with this email
        const query = User.findOne({'_id': req.params.userId});

        // selecting the `email` fields
        query.select('_id role');

        // execute the query at a later time
        query.exec(function (err, user) {
                if (err) return handleError(err);
                const role = user.role;
                switch (role) {
                    case 0:
                        res.status(401).json({
                            message: 'Your registering is not complete',
                        });
                        break;
                    case 1:
                        next();
                        break;
                    case 2:
                        next();
                        break;
                    case 3:
                        res.status(401).json({
                            message: 'You are banned',
                        });
                        break;
                    default:
                        res.status(500).json({
                            message: 'not allowed middleware login - ',
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


