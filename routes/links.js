const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const [ result ] = await pool.query('SELECT 1+1')
  res.json(result);  
});

module.exports = router;
