var express = require('express');
var router = express.Router();
var pool = require("../db")

const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

/* GET home page. */
router.get('/', async function(req, res, next) { 
  const [datos] = await pool.query("SELECT * FROM libros")
  res.render("index.ejs", {datos: datos, title: "NodeBooks"})
});

router.get('/addBooks', function(req, res, next) {
  res.render('addBooks', { title: "NodeBooks" });
});

router.post("/addBooks",  function(req, res, next) {
  const {nombre, imagen, descripcion} = req.body
  pool.query("INSERT INTO libros SET ?", {
      nombre, 
      imagen, 
      descripcion
  })
  res.redirect("/")
});

module.exports = router;
