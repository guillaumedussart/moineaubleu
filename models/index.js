const mongoose = require('mongoose');
const {
    db
} = require('../environement');

mongoose
    .connect(
        `${db.protocol}://${db.user}:${db.password}@${db.host}/${db.name}?${db.options}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    .then(() => console.log('Connected to db.'))
    .catch(console.error);
