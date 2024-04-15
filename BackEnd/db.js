const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Sql202!s@',
  server: 'localhost\\sql2017',
  database: 'gestao',
  port: 1433,
  options: {
    encrypt: false
  }
};

async function executeQuery(query, params = {}) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('id', sql.Int, params.id) // Se você estiver usando o ID como parâmetro
      .query(query);
    return result.recordset;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  }
}

module.exports = {
  config, // Exporta as configurações de conexão
  executeQuery, // Exporta a função executeQuery
};
