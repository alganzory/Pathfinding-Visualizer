const router = require("express").Router();
const simulateController = require ("../controllers/simulate-controller.js")
router.get('/', simulateController.getPage);
module.exports = router;