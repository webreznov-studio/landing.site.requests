require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet'); // creates headers that protect from attacks (security)
const cors = require('cors');

var test = require('./api/test.js');
var email = require('./api/email.js');

const whitelist = [
    process.env.LOCALHOST_3000,
    process.env.LOCALHOST_8000,
    process.env.LOCALHOST_8080,
    process.env.LOCALHOST_8084,
    process.env.WEBREZNOV,
    process.env.WEBREZNOV_DEVELOP,
];

const corsOptions = {
    origin: function (origin, callback) {
        console.log('** Origin of request ' + origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            console.log('Origin acceptable');
            callback(null, true);
        } else {
            console.log('Origin rejected');
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(helmet());
app.use(cors(corsOptions));

const urlencodedParser = bodyParser.urlencoded({
    extended: false,
});

const PORT = process.env.PORT || 8084;
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`);
});

var getMainPathLayout = `
<main>
    <h1>webreznov application</h1>
    <h3>This page was running at ${new Date()}</h3>
    <hr />

    <h3>Получить контакт по id</h3>
    <strong>Локально</strong>
    <p>http://localhost:${PORT}/api/get/contacts/:id</p>
    <strong>Prod</strong>
    <p>https://webreznov-landing-site-request.herokuapp.com/api/get/contacts/:id</p>

    <h3>Получить список всех контактов</h3>
    <strong>Локально</strong>
    <p>http://localhost:${PORT}/api/email/get/all</p>
    <strong>Prod</strong>
    <p>https://webreznov-landing-site-request.herokuapp.com/api/email/get/all</p>

    <h3>Удалить контакт по id</h3>
    <strong>Локально</strong>
    <p>http://localhost:${PORT}/api/contacts/delete/:id</p>
    <strong>Prod</strong>
    <p>https://webreznov-landing-site-request.herokuapp.com/api/contacts/delete/:id</p>

    <h3>Добавить новую заявку</h3>
    <strong>Локально</strong>
    <p>http://localhost:${PORT}/api/email/add</p>
    <strong>Prod</strong>
    <p>https://webreznov-landing-site-request.herokuapp.com/api/email/add</p>

</main>
`;

// Test
app.get('/', (req, res) => res.send(getMainPathLayout));
app.get('/api/test/counter', test.testCounter);
app.get('/api/test/write-file', test.testWriteFile);

// Email

app.get('/api/get/contacts/:id', email.toReadUserContact);
app.delete('/api/contacts/delete/:id', email.deleteContactById);
app.get('/api/email/get/all', email.toReadUserContactsAll);
app.post('/api/email/add', urlencodedParser, email.toAddUserContact);

module.exports = app;