const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db');

const registrarUtilizador = async (req, res) => {
    const { Username, Nome, Email, EmailOpcional, Telemovel, Password, Role } = req.body;

    console.log('Dados recebidos do corpo da solicitação:');
    console.log('Username:', Username);
    console.log('Nome:', Nome);
    console.log('Email:', Email);
    console.log('EmailOpcional:', EmailOpcional);
    console.log('Telemovel:', Telemovel);
    console.log('Password:', Password);
    console.log('Role:', Role);
 

    try {
        if (!Password) {
            throw new Error('Senha não fornecida');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        console.log('Senha criptografada:', hashedPassword);

        const query = `
            INSERT INTO users ( Username, Nome, Email, EmailOpcional, Telemovel, Password, Role )
            VALUES ('${Username}', '${Nome}', '${Email}', '${EmailOpcional}', '${Telemovel}', '${hashedPassword}','${Role}')
        `;

        await executeQuery(query);

        res.send('Utilizador registado com sucesso!');
    } catch (error) {
        console.error('Erro ao registar utilizador:', error);
        res.status(500).send('Erro ao registar utilizador');
    }
};

const fazerLogin = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        if (!Username || !Password) {
            throw new Error('CC ou senha não fornecidos');
        }

        // Supõe-se que executeQuery é uma função definida em outro lugar para executar consultas SQL
        const query = `SELECT * FROM users WHERE Username = '${Username}'`;
        const users = await executeQuery(query);

        if (users.length === 0) {
            throw new Error('Utilizador não encontrado');
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
            // Supõe-se que "secreto" é a sua chave secreta para o JWT. Isso deve ser mantido seguro e, em produção, fora do código
            const token = jwt.sign({ Username: user.Username, Role: user.Role }, 'secreto', { expiresIn: '1h' });

            res.status(200).json({ token: token, message: 'Login bem-sucedido!' });
        } else {
            throw new Error('Senha incorreta');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(401).send('Falha no login');
    }
};

const logout = (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).send('Logout realizado com sucesso.');
};

module.exports = {
    registrarUtilizador,
    fazerLogin,
    logout
};
