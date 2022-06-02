const express = require('express')
const App = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
//fichier .env
require('dotenv').config({ path: './config/.env' })

//initialisation de mongo
require('./config/db')

// je suis juste ici avec mes codes

//Importation des route
const UserRoute = require('./routes/User.route')
const ProductRoute = require('./routes/Product.route')
const CartRoute = require('./routes/Cart.route')
const OrderRoute = require('./routes/Order.route')

// Middlewares
const { checkUser, requireAuth } = require('./middleware/auth.middleware')

// Port du server
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    // accept: '*/*',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'method': 'POST,HEAD,PUT,GET,PATCH,DELETE',
    'preflightContinue': false
}

// Les middleware telecharger
App
    .use(cors(corsOptions))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(cookieParser())

// les middleware que j'ai creer
App.get('*', checkUser)
App.get('/api/userId', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

App.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

//User api
App.use('/api/user', UserRoute);

//Product api
App.use('/api/product', ProductRoute);

//Cart api
App.use('/api/cart', CartRoute);

//Order api
App.use('/api/order', OrderRoute);

//upload image


// Lancement du server soite sur le port 5000 ou 3000
App.listen(port, () => {
    console.log(`Server is running on @localhost:${port}`);
})


