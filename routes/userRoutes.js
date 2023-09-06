const express=require('express')
const userController=require('../controllers/userController');
const router = express.Router();


router.route('/get').get( userController.getUsers);
router.route('/create').post(userController.SignUp);
router.route('/createUserPhone').post(userController.createUserPhone);
router.route('/verifyTheCode').post(userController.verifyTheCode);
router.route('/createNewUser').patch(userController.createNewUser);
router.route('/login').post(userController.Login);
// router.route('/translateToken').post(userController.translateToken);

module.exports = router;