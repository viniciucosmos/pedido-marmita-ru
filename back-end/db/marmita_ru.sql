-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS marmita_ru;
USE marmita_ru;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  matricula VARCHAR(50) NOT NULL UNIQUE,
  cpf VARCHAR(20) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  campus numeric(11) NOT NULL,
  celular VARCHAR(20) NOT NULL,
  data_criacao DATE NOT NULL,
  subsidio BOOLEAN DEFAULT FALSE
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id_pedido INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario_FK INT NOT NULL,
  valor DECIMAL(8,2) NOT NULL,
  data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario_FK) REFERENCES usuarios(id_usuario)
);
