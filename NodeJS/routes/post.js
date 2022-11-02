const router = require("express").Router();
const verify = require("./verifytoken");

router.get("/", verify, (req, res) => {
  res.send("User posts with user unique ID: " + req.user.id);
});

module.exports = router;
