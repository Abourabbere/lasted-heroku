const UserModel = require('../models/user.model')
const objectID = require('mongoose').Types.ObjectId;

//TAKE ALL USER
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//CREATE USER
module.exports.addUser = async (req, res) => {
    try {
        //creation d'un utilisateur

        const user = new UserModel({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password
        })

        user.save((err, user) => {
            if (!err) return res.status(200).json({ _id: user._id })
            else res.status(401).json({ message: err.message })
        })
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}

//TAKE A USER
module.exports.getOneUser = (req, res) => {

    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    try {
        UserModel.findById(req.params.id, (err, user) => {
            if (!err) {
                const message = 'Voici le user demander'
                return res.status(200).send(user)
            } else {
                return res.status(401).json({ message: err.message })
            }
        }).select('-password')
    } catch (err) {
        res.status(401).json({ message: err.message })
    }

}

//UPDATE USER
module.exports.updateUser = async (req, res) => {
    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    try {
        UserModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body, }, { new: true, upsert: true, setDefaultsOnInsert: true }, (err, user) => {
            if (!err)
                return res.status(200).json({ success: true, data: user });
            else
                return res.status(404).json({ success: false, message: err.message })
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//GET USER STATS
module.exports.stats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await UserModel.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
}

// DELETE USER 
module.exports.deleteUser = async (req, res) => {
    if (!objectID.isValid(req.params.id)) return res.status(500).send('ID unknow : ' + req.params.id)

    try {
        UserModel.findByIdAndDelete(req.params.id, (err, user) => {
            if (!err) res.status(200).json({ success: true, data: user });
            else res.status(404).json({ message: err.message })
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}