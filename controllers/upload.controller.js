const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");
const objectID = require('mongoose').Types.ObjectId;
const multer = require('multer')
const upload = multer().single('file')

//USER PROFILE
module.exports.uploadProfil = async (req, res) => {

    const fileName = req.file.filename

    try {
        await UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { image: "./assets/profiles/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        )
            .then((user) => res.send(user))
            .catch((err) => res.status(500).send({ message: err }))
    } catch (err) {
        return res.status(200).send({ message: "probleme headers a RESOUDRE" });
    }

};


// PRODUCT IMAGE
module.exports.uploadImageProduct = async (req, res) => {
    if (!objectID.isValid(req.body.prodId)) return res.status(500).send('ID unknow : ' + req.body.prodId)

    const image = {
        image: "./assets/products/" + req.file.filename
    }

    try {
        await ProductModel.findOneAndUpdate(
            req.body.prodId,
            { $set: image },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        )
            .then((product) => res.send(product))
            .catch((err) => res.status(500).send({ message: err }))
    }
    catch (err) {
        console.log('in The catch');
        return res.send(err);
    }
};