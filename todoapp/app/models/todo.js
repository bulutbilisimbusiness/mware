"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
//* SEQUELIZE
//? npm i sequelize sqlite3
const path = require('path');
// https://sequelize.org/docs/v6/getting-started/
const { Sequelize, DataTypes } = require('sequelize')
// Where is DB (DB Connection Details):
 //const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/todoch15') // $ npm i pg pg-hstore
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
const sqlitePath = path.resolve(__dirname, 'db.sqlite3');
console.log("SQLite Path:", sqlitePath);

const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || sqlitePath))

// sequelize.define('tableName', { columns })
const Todo = sequelize.define('todo', {
    // https://sequelize.org/docs/v7/models/data-types/
     
    // id: { //? Not need define ID field, it will create auto.
    //     type: DataTypes.INTEGER,
    //     unique: true,
    //     allowNull: false, // default: true
    //     field: 'custom_column_name', // Change column name
    //     comment: 'Description',
    //     primaryKey: true,
    //     autoIncrement: true,
    // },

    title: {
        type: DataTypes.STRING(64), // varchar(64)
        allowNull: false,
    },

    description: DataTypes.TEXT, // ShortHand Using.

    priority: { // 1: High, 0: Normal, -1: Low
       type: DataTypes.TINYINT, 
        // postgres: INTEGER
         //type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // set default value.
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    
    //? Not need define "createdAt" & "updatedAt" fields.
    // createdAt: false, // Unset
    // updatedAt: false, // Unset
})

//! SYNC MUST RUN ONCE!
//sequelize.sync() // CREATE TABLE
// sequelize.sync({ force: true }) // DROP & CREATE
sequelize.sync({ alter: true }) // TO BACKUP & DROP & CREATE & FROM BACKUP

// Connect:
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch((err) => console.log('* DB Not Connected *', err))



module.exports = Todo