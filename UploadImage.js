const multer = require('multer')

//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function (request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
export const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});