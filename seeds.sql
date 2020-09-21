USE employee_db;

TRUNCATE TABLE department;

INSERT INTO department (name) VALUES ("management");
INSERT INTO department (name) VALUES ("sales");
INSERT INTO department (name) VALUES ("accounting");


TRUNCATE TABLE role;

INSERT INTO role (title, salary, department_id) VALUES ("regional manager", "80", "1");
INSERT INTO role (title, salary, department_id) VALUES ("assistant regional manager", "60", "1");
INSERT INTO role (title, salary, department_id) VALUES ("salesperson", "50", "2");
INSERT INTO role (title, salary, department_id) VALUES ("sales rep", "45", "2");
INSERT INTO role (title, salary, department_id) VALUES ("accountant", "50", "3");


TRUNCATE TABLE employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", "1", "0");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", "2", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", "3", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beesly", "3", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", "3", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Phyllis", "Vance", "4", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", "5", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Martinez", "5", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", "5", "1");






