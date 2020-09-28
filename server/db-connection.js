const mongoose = require('mongoose');
const connectionString = `mongodb://localhost:27017/boats-api`;

module.exports = () => {
    mongoose.connect(connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        poolSize: 5,
        useUnifiedTopology: true
    })
        .then(db => console.log('Connected with MongoDB.'))
        .catch(err => console.log(`Unable to connect with MongoDB: ${err.message}`));
}