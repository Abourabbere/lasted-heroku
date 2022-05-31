const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        libelle: {
            type: String,
            require: true,
            unique: true
        },
        description: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        categorie: {
            type: Array,
        },
        size: {
            type: String,
        },
        color: {
            type: String,
        },
        price: {
            type: String,
            require: true,
        },
        inStock: {
            type: Boolean,
            default: false,
        }
        
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Product', productSchema)