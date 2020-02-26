const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        console.log(req);
        const email = req.user.email;
        console.log(email);

        // find each person with this email
        const query = User.findOne({'email': req.user.email});

        // selecting the `email` fields
        query.select('_id');

        // execute the query at a later time
        query.exec(function (err, user) {
            if (err) return handleError(err);
            console.log(user.id);
            }
        );

    } catch (error) {
        return res.status(500).json({
            message: 'Mail exists middleware - ' + error,
        });
    }
};


