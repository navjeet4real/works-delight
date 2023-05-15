const router = require("express").Router();
const userController = require("../controllers/userController")

router.post("/create-category", userController.createCategory)
router.get("/get-category", userController.displayCategory)


module.exports = router;