const ProductModel = require('../models/product.model');
const objectID = require('mongoose').Types.ObjectId;
const path = require('path');
const fs = require("fs");


// Create a product
// module.exports.addProduct = async (req, res) => {
//     console.log(req.file)
// }

// Create a product
module.exports.addProduct = async (req, res) => {
    console.log(req.file);
    try {
        const user = new ProductModel({
                libelle: req.body.libelle,
                price: req.body.price,
                description: req.body.description,
                categorie: req.body.categorie,
                inStock: req.body.inStock,
                image: './assets/products/' + req.file.filename,
        })

        user.save((err, product) => {
            if (!err) return res.status(200).json(product)
            else res.status(401).json({ error: err.message })
        })
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

// Get all product || with parameters
module.exports.getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategorie = req.query.categorie
    try {
        let product

        if (qCategorie)
            product = await ProductModel.find({ categorie: { $in: [qCategorie] } })
        else if (qNew)
            product = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
        else
            product = await ProductModel.find()

        res.status(200).send(product)
    } catch (err) {
        res.status(401).json({ message: err.message })
    }

}

// Get single product
module.exports.getProduct = async (req, res) => {
    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    try {
        ProductModel.findById(req.params.id, (err, product) => {
            if (!err) {
                return res.status(200).json(product)
            } else {
                return res.status(401).json({ message: err.message })
            }
        })
    } catch (err) {
        res.status(401).json({ message: err.message })
    }

}

// Update product
module.exports.UpdateProduct = async (req, res) => {

    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    // const data = {
    //     libelle: req.body.libelle,
    //     price: req.body.price,
    //     description: req.body.description,
    //     categorie: req.body.categorie,
    //     image: './assets/products/' + req.file.filename,
    // }

    try {
        ProductModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body, }, { new: true, upsert: true, setDefaultsOnInsert: true }, (err, product) => {
            if (!err)
                return res.status(200).json(product);
            else
                return res.status(404).json({ success: false, message: err.message })
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

// Delete  product
module.exports.DeleteProduct = async (req, res) => {
    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    try {
        ProductModel.findByIdAndDelete(req.params.id, (err, product) => {
            if (!err) res.status(200).json(product);
            else res.status(404).json({ message: err.message })
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}