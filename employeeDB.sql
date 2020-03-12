DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE IF NOT EXISTS employeeDB;

USE employeeDB;

CREATE TABLE department(
	id INT NOT NULL
    , department_name VARCHAR(60) NOT NULL
    , PRIMARY KEY (id)
);

CREATE TABLE employee_role(
	id INT NOT NULL
    , title VARCHAR(30)
    , salary DECIMAL (12, 2)
    , deparment_id INT
    , PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT
    , first_name VARCHAR(30) NOT NULL
    , last_name VARCHAR(30) NOT NULL
    , role_id INT
    , manager_id INT
    , PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;