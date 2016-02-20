/**
 * Created by thaodang on 1/2/16.
 */
/**
 * About page route
 */
module.exports.controller = function(app) {

    /**
     * a home page route
     */
    app.get('/signup', function(req, res) {
        // any logic goes here
        res.render('users/signup')
    });

    /**
     * About page route
     */
    app.get('/login', function(req, res) {
        // any logic goes here
        res.render('users/login')
    });

}