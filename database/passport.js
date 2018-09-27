const LocalStrategy = require("passport-local");
const User = require("./models/User")

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use("local-signup", new LocalStrategy((username, password, done) => {
        process.nextTick(() => {
            User.findOne({name : username}, (err, user) => {
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, false, {message: "Username is already taken"})
                } else{
                    let newUser = new User({
                        name: username,
                    });
                    newUser.password = newUser.generateHash(password);
    
                    newUser.save((saveErr) => {
                        if(saveErr)
                            return done(saveErr);
                        return done(null, newUser)
                    })
                }
            })
        })
    }));

    passport.use("local-login", new LocalStrategy((username, password, done) => {
        process.nextTick(() => {
            User.findOne({name: username}, (err, user) => {
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, {message: "Invalid Username or Password"});
                if(!user.validPassword(password))
                    return done(null, false, {message: "Invalid Username or Password"});
                return done(null, user)
            })
        })
    }))
}
