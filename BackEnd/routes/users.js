const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    const { CC, Nome, Email, EmailOpcional, Telefone, Morada, NIF, Role, Password } = req.body;

    console.log('Dados recebidos do corpo da solicitação:');
    console.log('CC:', CC);
    console.log('Nome:', Nome);
    console.log('Email:', Email);
    console.log('EmailOpcional:', EmailOpcional);
    console.log('Telefone:', Telefone);
    console.log('Morada:', Morada);
    console.log('NIF:', NIF);
    console.log('Role:', Role);
    console.log('Password:', Password);

    try {
        if (!Password) {
            throw new Error('Senha não fornecida');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        console.log('Senha criptografada:', hashedPassword);

        const query = `
            INSERT INTO users (CC, Nome, Email, EmailOpcional, Telefone, Morada, NIF, Role, PasswordHash)
            VALUES ('${CC}', '${Nome}', '${Email}', '${EmailOpcional}', '${Telefone}', '${Morada}', '${NIF}', '${Role}', '${hashedPassword}')
        `;

        await executeQuery(query);

        res.send('Utilizador registrado com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar utilizador:', error);
        res.status(500).send('Erro ao registrar utilizador');
    }
});

router.post('/login', async (req, res) => {
    const { CC, Password } = req.body;

    try {
        if (!CC || !Password) {
            throw new Error('CC ou senha não fornecidos');
        }

        const query = `
            SELECT * FROM users WHERE CC = '${CC}'
        `;

        const users = await executeQuery(query);

        if (users.length === 0) {
            throw new Error('Utilizador não encontrado');
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(Password, user.PasswordHash);

        if (passwordMatch) {
            res.send('Login bem-sucedido!');
        } else {
            throw new Error('Senha incorreta');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(401).send('Falha no login');
    }
});

module.exports = router;
