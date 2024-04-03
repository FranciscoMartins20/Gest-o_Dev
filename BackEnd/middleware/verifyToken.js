const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.cookies.jwtToken;
    console.log(token);

    if (!token) {
        return res.status(403).send('Token não fornecido');
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).send('Token inválido');
        }
        req.decoded = decoded;
        next();
    });
};

// Middleware genérico para verificar role
const verificarRole = (rolesPermitidas) => (req, res, next) => {
    if (!req.decoded || !rolesPermitidas.includes(req.decoded.Role)) {
        return res.status(403).send('Acesso negado');
    }
    next();
};


module.exports = {
    verificarToken,
    verificarRole
}
