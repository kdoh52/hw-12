USE employee_db;

TRUNCATE TABLE department;

INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");


TRUNCATE TABLE role;

INSERT INTO role (title, salary, department_id) VALUES ("Regional Manager", "80000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Assistant Regional Manager", "60000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Salesperson", "50000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative", "45000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", "50000", "3");


TRUNCATE TABLE employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", "1", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", "2", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", "3", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beesly", "3", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", "3", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Phyllis", "Vance", "4", "2");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", "5", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Martinez", "5", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", "5", "1");

