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

async function executeQuery(query) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.query(query);
    return result.recordset;
  } catch (error) {
    console.error('Erro ao executar consulta:', error);
    throw error;
  }
}

module.exports = {
  executeQuery
};

