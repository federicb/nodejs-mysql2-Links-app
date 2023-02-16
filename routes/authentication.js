const express = require('express');
const router = express.Router();
const passport = require('passport')

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true //se utiliza para poder lanzar mensaje flash si hay fallos de autenticación
}))
// console.log(req.body)
// res.send('POSTED!!')

router.get('/profile', (req,res) => {
  res.send('PROFILE!!')
})

module.exports = router;
