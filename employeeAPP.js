const inquirer = require("inquirer")
const mysql = require("mysql")
require("dotenv").config()

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MY_PASSWORD_IS_SAFE,
    database: "employeeDB"
})

connection.connect((err) => {
    if (err) throw err;
    employment()
});
function employment() {

    inquirer
        .prompt(
            {
                type: "list",
                message: "Would you like to Add, View, or Update",
                choices: [
                    "Add",
                    "View",
                    "Update"
                ],
                name: "selector"
            }
        )
        .then((res) => {
            if (res.selector === "Add") {
                inquirer
                    .prompt(
                        {
                            type: "list",
                            message: "What are you looking to add.",
                            choices: [
                                "Departments",
                                "Roles",
                                "Employees"
                            ],
                            name: "adder"
                        })
                    .then((res) => {
                        if (res.adder === "Departments") {
                            inquirer
                                .prompt([{
                                    type: "input",
                                    message: "What ID would like to give this department",
                                    name: "id"
                                }, {
                                    type: "input",
                                    message: "What name would like to give this department",
                                    name: "departmentName"
                                }])
                                .then((res) => {
                                    console.log("Inserting a new department...\n");
                                    const query = connection.query(
                                        "INSERT INTO department SET ?",
                                        {
                                            id: res.id,
                                            department_name: res.departmentName,
                                        },
                                        function (err, res) {
                                            if (err) throw err;
                                            console.log(res.affectedRows + " department added!\n");
                                        }
                                    );
                                })
                        }
                        else if (res.adder === "Roles") {
                            inquirer
                                .prompt([{
                                    type: "input",
                                    message: "What ID would like to give this role",
                                    name: "id"
                                }, {
                                    type: "input",
                                    message: "What name would like to give this role",
                                    name: "roleName"
                                }, {
                                    type: "input",
                                    message: "How much will this role make a year",
                                    name: "salary"
                                }, {
                                    type: "checkbox",
                                    message: "In what department will this role be",
                                    choices: [
                                        "placeholder",
                                        "placeholder",
                                        "placeholder"
                                    ],
                                    name: "department"
                                }])
                                .then((res) => {
                                    console.log("Inserting a new role...\n");
                                    const query = connection.query(
                                        "INSERT INTO employee_role SET ?",
                                        {
                                            id: res.id,
                                            title: res.roleName,
                                            salary: res.salary,
                                            department_id: res.department
                                        },
                                        function (err, res) {
                                            if (err) throw err;
                                            console.log(res.affectedRows + " new role added!\n");
                                        }
                                    );
                                })
                        }
                        else if (res.adder === "Employees") {
                            inquirer
                                .prompt([{
                                    type: "input",
                                    message: "What is the ID of this new employee",
                                    name: "id"
                                }, {
                                    type: "input",
                                    message: "What is the first name of this new employee",
                                    name: "employeeFName"
                                }, {
                                    type: "input",
                                    message: "What is the first name of this new employee",
                                    name: "employeeLName"
                                }, {
                                    type: "list",
                                    message: "In what role will this person be placed",
                                    choices: [
                                        "placeholder",
                                        "placeholder",
                                        "placeholder"
                                    ],
                                    name: "role"
                                }, {
                                    type: "list",
                                    message: "Who will be the manager",
                                    choices: [
                                        "placeholder",
                                        "placeholder",
                                        "placeholder"
                                    ],
                                    name: "manage"
                                }])
                                .then((res) => {
                                    console.log("Inserting a new employee...\n");
                                    const query = connection.query(
                                        "INSERT INTO employee SET ?",
                                        {
                                            id: res.id,
                                            first_name: res.employeeFName,
                                            last_name: res.employeeLName,
                                            role_id: res.role,
                                            manager_id: res.manage
                                        },
                                        function (err, res) {
                                            if (err) throw err;
                                            console.log(res.affectedRows + " new employee added!\n");
                                        }
                                    );
                                })
                        }
                    })
            }
            else if (res.selector === "View") {
                inquirer
                    .prompt(
                        {
                            type: "list",
                            message: "What would you like to view.",
                            choices: [
                                "Departments",
                                "Roles",
                                "Employees"
                            ],
                            name: "view"
                        }
                    )
                    .then((res) => {
                        if (res.view === "Departments") {
                            connection.query("SELECT * FROM department", function (err, results) {
                                if (err) throw err;
                                console.log(results)
                            })
                        }
                        else if (res.view === "Roles") {
                            connection.query("SELECT * FROM employee_role", function (err, results) {
                                if (err) throw err;
                                console.log(results)
                            })
                        }
                        else if (res.view === "Employees") {
                            connection.query("SELECT * FROM employee", function (err, results) {
                                if (err) throw err;
                                console.log(results)
                            })
                        }
                    })
            }
            else if (res.selector === "Update") {
                inquirer
                    .prompt(
                        {
                            type: "list",
                            message: "Who would you like to update.",
                            choices: [
                                "placeholder",
                                "placeholder",
                                "placeholder"
                            ],
                            name: "role_update"
                        }
                    )
                    .then((res) => {
                        const name = res.role_update
                        inquirer
                            .prompt(
                                {
                                    type: "list",
                                    message: "What role would you like to change to.",
                                    choices: [
                                        "placeholder",
                                        "placeholder",
                                        "placeholder"
                                    ],
                                    name: "role_update"
                                }
                            )
                            .then((res) => {

                                var query = connection.query(
                                    "UPDATE products SET ? WHERE ?",
                                    [
                                        {
                                            role_id: res.role_update
                                        },
                                        {
                                            first_name: name
                                        }
                                    ],
                                    function (err, res) {
                                        if (err) throw err;
                                        console.log(res.affectedRows + " name updated!\n");
                                    }
                            )})
                        // if (res.selector === "Departments") {

                        // }
                        // else if (res.selector === "Roles") {

                        // }
                        // else if (res.selector === "Employees") {

                        // }
                    })
            }
        })
}

function createDepartment(res) {

}