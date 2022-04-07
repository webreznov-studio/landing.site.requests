require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const helmet = require('helmet'); // creates headers that protect from attacks (security)
const cors = require('cors');

const admin = require('./api/admin.js');
const email = require('./api/email.js');
const portfolio = require('./api/portfolio.js');

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
const jsonencodedParser = bodyParser.json();

const PORT = process.env.PORT || 8084;
app.listen(PORT, (req, res) => {
    console.log(`server listening on port: ${PORT}`);
});

// Admin Panel
app.get('/', (req, res) => res.sendfile(__dirname + '/page/index.html'));
app.post('/api/admin/login', jsonencodedParser, admin.login);//login logic

// Email
app.get('/api/get/contacts/:id', email.toReadUserContact);
app.delete('/api/contacts/delete/:id', email.deleteContactById);
app.get('/api/email/get/all', email.toReadUserContactsAll);
app.post('/api/email/add', urlencodedParser, email.toAddUserContact);

// Portfolio
app.get('/api/portfolio/all', portfolio.getPortfolioAll);
app.post('/api/portfolio/add-new-project', [jsonencodedParser], portfolio.toAddNewProject);

module.exports = app;