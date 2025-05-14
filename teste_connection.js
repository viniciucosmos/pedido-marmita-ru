// testConnection.js
import connection from '../db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('Erro na consulta:', err);
  } else {
    console.log('Resultado da consulta:', results);
  }

  connection.end(); // encerra a conexão após o teste
});
