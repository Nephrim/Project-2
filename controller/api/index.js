const router = require('express').Router();

const movie = require("./movie-routes")
const user = require("./user-routes")


router.use("/movie", movie)
router.use("/user", user)


module.exports = router;