const inquirer = require("inquirer")
const mysql = require("mysql")
require("dotenv").config()

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env. ,
    database: ""
})

connection.connect((err) => {
    if (err) throw err;

});
function employment() {

    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to look at",
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"
                ],
                name: ""
            }, {
                type: "list",
                message: "Would you like to Add, View, or Update",
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"
                ],
                name: ""
            }
        )
}