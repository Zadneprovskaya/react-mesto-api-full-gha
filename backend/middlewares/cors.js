// eslint-disable-next-line no-unused-vars
const allowedCors = [
    'https://myeducateproject.nomoredomainsrocks.ru',
    'http://myeducateproject.nomoredomainsrocks.ru',
    'https://api.myeducateproject.nomoredomainsrocks.ru',
    'http://api.myeducateproject.nomoredomainsrocks.ru',
    'localhost:3000'
];

// eslint-disable-next-line no-undef
module.exports = (req, res, next) => {
    const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const { origin } = req.headers;
    const { method } = req;
    const requestHeader = req.headers['access-control-request-headers'];

    console.log(origin);
    console.log(allowedCors.includes(origin));
    
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', true);
    }

    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);
        res.header('Access-Control-Allow-Credentials', requestHeader);
        res.end();
        return;
    }
    next();
}
