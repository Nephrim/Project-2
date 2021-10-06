const router = require('express').Router();
const api = require("./api")
const home = require("./Home-routes")

router.use("/api", api)
router.use("/", home)

// router.get("/", async (req, res) => {
//     res.render("home")
// })


module.exports = router;