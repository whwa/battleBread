const mysql = require('mysql');
const sequelize = require('sequelize');
const db = require ('database-helpers.js');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'battlebread'
});
