const Cart = require("./cart.controller");
const objectID = require('mongoose').Types.ObjectId;

const router = require("express").Router();

//CREATE
module.exports.addCart =  async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}

//UPDATE
module.exports.updatedCart = async (req, res) => {
  if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}

//DELETE
module.exports.deleteCart = async (req, res) => {
  if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
}

//GET USER CART
module.exports.getUserCart = async (req, res) => {
  if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
}

//GET ALL
module.exports.getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
}
