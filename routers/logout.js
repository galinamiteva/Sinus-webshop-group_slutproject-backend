const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()


// Här man rensar cookie - ersätter jwt men en tomt string och exp är bara 10/1000sek
router.get('/',  (req, res) => {
  res.cookie('jwt', '', { exp: 10 });
  res.redirect('/');

})
module.exports = router