module.exports = {
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Login Now! Not Authorized');
        res.redirect('/');
    }, 
    ensureguest: function(req, res, next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard');
        }else{
            return next();
        }
    }
}