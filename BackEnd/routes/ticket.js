const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db'); // Importando a função de execução de consultas
const sql = require('mssql');
const config = require('../db');




// Buscar todos os tickets
router.get('/tickets', async (req, res) => {
    const sql = 'SELECT * FROM tickets';
    try {
        const result = await executeQuery(sql);
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao buscar tickets:', error);
        res.status(500).send('Erro ao buscar tickets');
    }
});

// Adicionar um novo ticket
router.post('/tickets', async (req, res) => {
    const { data, tempo, empresa, problema, resolucao, estado } = req.body;
    const sql = `
        INSERT INTO tickets (data, tempo, empresa, problema, resolucao, estado)
        VALUES ('${data}', '${tempo}', '${empresa}', '${problema}', '${resolucao}', '${estado}')
    `;
    try {
        await executeQuery(sql);
        res.status(201).send('Ticket adicionado com sucesso.');
    } catch (error) {
        console.error('Erro ao adicionar o ticket:', error);
        res.status(500).send('Erro ao adicionar o ticket.');
    }
});




// Rota para buscar um ticket específico por ID
router.get('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await sql.connect(config); // Utilizando as configurações de conexão
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM tickets WHERE id = @id');
        
        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).send('Ticket não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar o ticket:', error);
        res.status(500).send('Erro ao buscar o ticket');
    }
});

// Atualizar um ticket existente
router.put('/tickets/:id', async (req, res) => {
    const { data, tempo, empresa, problema, resolucao } = req.body;
    const { id } = req.params;
    const sql = `
        UPDATE tickets
        SET data = '${data}', tempo = '${tempo}', empresa = '${empresa}',
            problema = '${problema}', resolucao = '${resolucao}'
        WHERE id = @id`; // Use @id como placeholder para o parâmetro

    try {
        await executeQuery(sql, { id: id }); // Passa o objeto com o parâmetro id
        res.status(200).send('Ticket atualizado com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar o ticket:', error);
        res.status(500).send('Erro ao atualizar o ticket.');
    }
});


// Deletar um ticket
router.delete('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tickets WHERE id = ${id}`;
    try {
        await executeQuery(sql);
        res.status(200).send('Ticket deletado com sucesso.');
    } catch (error) {
        console.error('Erro ao deletar o ticket:', error);
        res.status(500).send('Erro ao deletar o ticket.');
    }
});

module.exports = router;
