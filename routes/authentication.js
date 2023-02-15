const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  // console.log(req.body)
  
  res.send('POSTED!!');
});

module.exports = router;
