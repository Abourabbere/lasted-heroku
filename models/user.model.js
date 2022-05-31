const mongoose = require('mongoose');
// const { IsEmail } = require('validator')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // validate: IsEmail,
        },
        password: {
            type: String,
            required: true,
            maxlength: 1024
        },
        image: {
            type: String,
            required: true,
            default: './upload/profil/img.jpg'
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        bio: {
            type: String,
            max: 1024
        }
    },
    {
        timestamps: true
    }
);

//crytage du mot de passe
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//decryptage du mot de passe
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Email et/ou mot de pass incorrect')
    }
    throw Error('Email et/ou mot de pass incorrect')
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;