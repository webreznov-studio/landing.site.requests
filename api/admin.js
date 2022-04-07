const PORT = process.env.PORT || 8080;
const GET_HOST = process.env.GET_HOST || 'http://localhost';

const {nanoid} = require('nanoid');
const {Client} = require('pg');

/** POST /api/admin/login */
console.log(`##admin ${GET_HOST}:${PORT}/api/admin/login`);
exports.login = (req, res) => {
    try {
        const {login, password} = req.body;
        const admLogin = process.env.ADM_LOGIN;
        const admPassword = process.env.ADM_PASSWORD;

        if (admLogin !== login) {
            return res.status(400).json({auth: false, message: `Пользователь ${login} не найден`})
        }
        if (admPassword !== password) {
            return res.status(400).json({auth: false, message: `Введен неверный пароль`})
        }

        return res.json({auth: true});
    } catch (error) {
        console.log(error)
        return res.status(400).json({auth: false, message: 'Ошибка:('})
    }
};