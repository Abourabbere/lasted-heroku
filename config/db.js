const mongoose = require('mongoose');

const URI = "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.4zgua.mongodb.net/papa-api";

mongoose.connect(URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('Connecte to mongoDB'))
    .catch((err) => console.log('Failed to connect to mongoDB', err));