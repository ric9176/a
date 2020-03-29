const path = require('path');

const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//       res.send({ response: "I am alive" }).status(200);
// });

router.use(express.static(path.join(__dirname, '../frontend/build')));

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../frontend/build/index.html'));
});

module.exports = router;
