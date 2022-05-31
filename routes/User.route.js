const Router = require('express').Router()
// const UploadController = require('../controllers/upload.controller')
const AuthController = require('../controllers/user.auth.controller')
const UserController = require('../controllers/user.controller')
// const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middleware/verifyToken')
// const multer = require("multer");
// const path = require('path');
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, '../react-papa/public/assets/profiles')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, req.body.firstName + '.jpg')
// 	}
// })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../react-papa/public/assets/profiles')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '.jpg')
//   }
// })

// const upload = multer({ storage: storage })

//AuthController
Router.post('/register', AuthController.signUp)
Router.post('/login', AuthController.logIn)
Router.get('/logout', AuthController.logOut)

//User CRUD
Router.get('/', UserController.getAllUsers)
Router.post('/', UserController.addUser)
Router.get('/:id', UserController.getOneUser)
Router.put('/:id', UserController.updateUser)
Router.delete('/:id', UserController.deleteUser)
Router.get('/admin/stats', UserController.stats)

//Upload Image
// Router.post("/upload", upload.single("file"), UploadController.uploadProfil);


module.exports = Router