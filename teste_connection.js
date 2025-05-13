// testConnection.js
const connection = require('./db/connection.js');
require('dotenv').config();

connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('Erro na consulta:', err);
  } else {
    console.log('Resultado da consulta:', results);
  }

  connection.end(); // encerra a conexão após o teste
});
