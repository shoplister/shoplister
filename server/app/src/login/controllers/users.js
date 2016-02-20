module.exports.controller = function(app) {

    /**
     * signup page route
     */
    app.get('/signup', function(req, res) {
        // any logic goes here
        res.render('users/signup')
    });

    /**
     * Login page route
     */
    app.get('/login', function(req, res) {
        // any logic goes here
        res.render('users/login')
    });

}