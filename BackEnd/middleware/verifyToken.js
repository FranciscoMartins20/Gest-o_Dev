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
        // Armazenando o CC do usuário no objeto req para uso posterior nas rotas protegidas
        req.CC = decoded.CC;
        next(); // Passa o controle para a próxima função de middleware na pilha
    });
};

module.exports = verificarToken;
