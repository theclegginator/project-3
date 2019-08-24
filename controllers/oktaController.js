const oktaClient = require('../routes/api/lib/oktaClient');

module.exports = {

    createUser: function (req, res) {
        // console.log("Okta Req",req);
        console.log("REQ.BODY.BODY",req.body)
        console.log("First Name:", req.body.firstName)
        // if (!req.body.body) return res.sendStatus(400);
        const newUser = {
            profile: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                login: req.body.email
            },
            credentials: {
                password: {
                    value: req.body.password
                }
            }
        };
        console.log("New User:", newUser)
        oktaClient.createUser(newUser)
            .then(user => {
                res.status(201);
                res.send(user);
                console.log(err)
            })
            .catch(err => {
                res.status(400);
                res.send(err);
                console.log(err)
            })
    }
}