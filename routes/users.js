const express=require('express')
const userController=require('../controllers/userController');
const router = express.Router();

router.route('/get').get( userController.getusers);
router.route('/create').post(userController.SignUp);
router.route('/login').post(userController.Login);
// router.route('/translateToken').post(userController.translateToken);

module.exports = router;