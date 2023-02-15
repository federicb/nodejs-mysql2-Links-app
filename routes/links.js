const express = require('express');
const router = express.Router();

const pool = require('../database')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const [ links ] = await pool.query('SELECT * FROM links') // [] es necesario en mysql2
  console.log(links)
  // res.json(links)
  // res.send('Links list here')
  res.render('links/list', { links }) 
  //{links} = {links:links} -> {render:[links]} primero refiere al render y el segundo al contenido(object)
});

router.get('/add', (req, res) => {
  res.render('links/add')
})

router.post('/add', async (req, res) => {
  const { title, url, description } = req.body
  const newLink = {
    title, 
    url, 
    description
  }
  // console.log(req.body)
  // console.log(newLink)
  await pool.query('INSERT INTO links SET ?', [newLink])
  res.send('Received')
})

router.get('/delete/:id', async (req, res) => {
  // console.log(req.params.id)
  // res.send('DELETED!!')
  const { id } = req.params
  await pool.query('DELETE FROM links WHERE id = ?', [id])
  res.redirect('/links')
})

module.exports = router;
