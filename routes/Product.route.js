const Router = require('express').Router()
const ProductController = require('../controllers/product.controller')
// const UploadController = require('../controllers/upload.controller')

// const { verifyTokenAndAdmin } = require('../middleware/verifyToken')
// const multer = require('multer')

// const storage = multer.diskStorage({
//     //destination for files
//     destination: function (request, file, callback) {
//         callback(null, '../react-papa/public/assets');
//     },

//     //add back the extension
//     filename: function (request, file, callback) {
//         callback(null, Date.now() + file.originalname);
//     },
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../../test/react-papa/public/assets/products/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//     }
// })

// //upload parameters for multer
// const upload = multer({
//     storage: storage,
// });


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../react-papa/public/assets/products')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '.jpg')
//   }
// })

// const upload = multer({ storage: storage })



//Product CRUD
Router.post('/', ProductController.addProduct)
Router.get('/', ProductController.getAllProduct)
Router.get('/:id', ProductController.getProduct)
Router.put('/:id', ProductController.UpdateProduct)
Router.delete('/:id', ProductController.DeleteProduct)

//Upload Image
// Router.post("/upload", upload.single('image'), UploadController.uploadImageProduct);

module.exports = Router