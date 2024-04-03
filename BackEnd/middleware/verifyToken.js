const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // Tenta extrair o token do cabeçalho "Authorization"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Padrão Bearer Token

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

// O middleware verificarRole permanece o mesmo
const verificarRole = (rolesPermitidas) => (req, res, next) => {
    if (!req.decoded || !rolesPermitidas.includes(req.decoded.Role)) {
        return res.status(403).send('Acesso negado');
    }
    next();
};

module.exports = {
    verificarToken,
    verificarRole
};
