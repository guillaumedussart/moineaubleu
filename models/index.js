const mongoose = require('mongoose');
const {
    DB_PROTOCOL,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

mongoose
    .connect(
        `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
    .then(() => console.log('Connected to db.'))
    .catch(console.error);
