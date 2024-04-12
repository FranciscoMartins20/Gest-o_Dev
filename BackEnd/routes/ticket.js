const express = require('express');
const router = express.Router();
const { executeQuery } = require('../db'); // Importando a função de execução de consultas


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
    const { data, tempo, empresa, problema, resolucao } = req.body;
    const sql = `
        INSERT INTO tickets (data, tempo, empresa, problema, resolucao)
        VALUES ('${data}', '${tempo}', '${empresa}', '${problema}', '${resolucao}')
    `;
    try {
        await executeQuery(sql);
        res.status(201).send('Ticket adicionado com sucesso.');
    } catch (error) {
        console.error('Erro ao adicionar o ticket:', error);
        res.status(500).send('Erro ao adicionar o ticket.');
    }
});

// Atualizar um ticket existente
router.put('/tickets/:id', async (req, res) => {
    const { data, tempo, empresa, problema, resolucao } = req.body;
    const { id } = req.params;
    const sql = `
        UPDATE tickets
        SET data = '${data}', tempo = '${tempo}', empresa = '${empresa}',
            problema = '${problema}', resolução = '${resolucao}'
        WHERE id = ${id}
    `;
    try {
        await executeQuery(sql);
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
