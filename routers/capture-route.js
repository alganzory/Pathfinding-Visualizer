const router = require ("express").Router();
const captureController = require ("../controllers/capture-controller");
router.get('/',captureController.getPage);
module.exports = router;