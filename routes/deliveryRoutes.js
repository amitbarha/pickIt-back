const express = require("express");
const deliveryController = require("../controllers/deliveryControllers");
const router = express.Router();

// router.route("/").get(userController.users);

router.route('/create').post(deliveryController.create);
router.route('/getAll').get(deliveryController.getAll);
// router.route('/chatReq').post(deliveryController.chatReq);


module.exports = router;
