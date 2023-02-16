const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database')
const helpers = require('../lib/helpers')

// this code is the strategy to follow for signup POST 
passport.use('local.signup', new localStrategy({
    usernameField: 'username', //save username if it matches
    passwordField: 'password', //save password if it matches
    passReqToCallback: true, // return req with the data signup post (propaga req para utilizarse)
}, async (req, username, password, done) => {
    // console.log(req.body)
    const { email, fullname } = req.body
    const newUser = {
        username,
        password,
        fullname, 
        email
    }
    // encrypting password
    newUser.password = await helpers.encryptPassword(password)

    const [ result ] = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId
    // console.log(result.insertId)

    return done(null, newUser)
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const [ rows ] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    done(null, rows[0])
})  