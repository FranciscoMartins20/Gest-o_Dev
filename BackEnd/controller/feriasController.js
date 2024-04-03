const { executeQuery } = require('../db');

const adicionarFerias = async (req, res) => {
    const { CC, dataInicio, dataFim } = req.body;

    try {
        // Consulta SQL para inserir as férias do colaborador no banco de dados
        const query = `
            INSERT INTO ferias (CC, dataInicio, dataFim)
            VALUES ('${CC}', '${dataInicio}', '${dataFim}')
        `;

        // Executar a consulta SQL usando a função executeQuery do arquivo db.js
        await executeQuery(query);

        // Se a inserção for bem-sucedida, enviar uma resposta de sucesso
        res.status(201).send('Férias adicionadas com sucesso!');
    } catch (error) {
        // Se ocorrer algum erro, enviar uma resposta de erro
        console.error('Erro ao adicionar férias:', error);
        res.status(500).send('Erro ao adicionar férias');
    }
};

module.exports = {
    adicionarFerias
};
