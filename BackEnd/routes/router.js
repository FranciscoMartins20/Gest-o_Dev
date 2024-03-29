const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db'); // Importe a função executeQuery do arquivo db.js

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', async (req, res) => {
    // Extrair dados do corpo da solicitação
    const { CC, Nome, Email, EmailOpcional, Telefone, Morada, NIF, Role, Password } = req.body;

    // Exibir dados recebidos no console
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
        // Verificar se a senha está presente
        if (!Password) {
            throw new Error('Senha não fornecida');
        }

        // Gerar um salt
        const salt = await bcrypt.genSalt(10);

        // Gerar um hash da senha com o salt
        const hashedPassword = await bcrypt.hash(Password, salt);
        console.log('Senha criptografada:', hashedPassword);

        // Consulta SQL para inserir um novo usuário no banco de dados
        const query = `
            INSERT INTO users (CC, Nome, Email, EmailOpcional, Telefone, Morada, NIF, Role, PasswordHash)
            VALUES ('${CC}', '${Nome}', '${Email}', '${EmailOpcional}', '${Telefone}', '${Morada}', '${NIF}', '${Role}', '${hashedPassword}')
        `;

        // Executar a consulta SQL usando a função executeQuery do arquivo db.js
        await executeQuery(query);

        res.send('Utilizador registrado com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar utilizador:', error);
        res.status(500).send('Erro ao registrar utilizador');
    }
});

router.post('/login', async (req, res) => {
    // Extrair CC e Password do corpo da solicitação
    const { CC, Password } = req.body;

    try {
        // Verificar se o CC e a senha estão presentes
        if (!CC || !Password) {
            throw new Error('CC ou senha não fornecidos');
        }

        // Consulta SQL para obter o usuário com o CC fornecido
        const query = `
            SELECT * FROM users WHERE CC = '${CC}'
        `;

        // Executar a consulta SQL usando a função executeQuery do arquivo db.js
        const users = await executeQuery(query);

        // Verificar se o usuário foi encontrado
        if (users.length === 0) {
            throw new Error('Usuário não encontrado');
        }

        // Comparar a senha fornecida com a senha armazenada no banco de dados
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



