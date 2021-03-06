var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table')

var PORT = process.env.PORT || 3000;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        viewAllEmployees();
        break;

      case "View All Employees By Department":
        viewByDepartment();
        break;

      case "View All Employees By Manager":
        viewByManager();
        // breaks when manager name is invalid
        break;

      case "Add Employee":
        addEmployee();
        // breaks when manager name is invalid
        break;

      case "Remove Employee":
        removeEmployee();
        break;

      case "Update Employee Role":
        updateRole();
        break;
    
      case "Update Employee Manager":
        updateManager();
        // breaks when manager name is invalid
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}


function viewAllEmployees() {
  // var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id ";
  // query += "FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY employee.id";

  var query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager_name ";
  query += "FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id INNER JOIN employee m ON m.id = e.manager_id GROUP BY e.id"

  connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(res);
    var employeeArray = [];
    for (var i = 0; i < res.length; i++) {
      var obj = {
        id: res[i].id,
        first_name: res[i].first_name,
        last_name: res[i].last_name,
        title: res[i].title,
        department: res[i].name,
        salary: res[i].salary,
        manager: res[i].manager_name
      }
      employeeArray.push(obj)
    }
    console.table(employeeArray);
    runSearch();
  })
}

function viewByDepartment() {
  
  // connection.query("SELECT department.name FROM department", function(err, res) {
  //   if (err) throw err;
  //   return (res);
  // });
  
  inquirer
    // .prompt({
    //   name: "department",
    //   type: "input",
    //   message: "Which department?"
    // })
    .prompt({
      name: "department",
      type: "list",
      message: "Which department?",
      choices: ["Management", "Sales", "Accounting"]
    })
    .then(function(answer) {
      var query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager_name ";
      query += "FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id INNER JOIN employee m ON m.id = e.manager_id WHERE name=? GROUP BY e.id"

      // var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id, e.first_name + ' ' + e.last_name employ, m.first_name + ' ' + m.last_name AS manager ";
      // query += "FROM employee e LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE name=? INNER JOIN employee m ON m.id = e.manager_id GROUP BY employee.id";

    
      connection.query(query, [answer.department], function(err, res) {
        if (err) throw err;
        // console.log(res);
        var employeeArray = [];
        for (var i = 0; i < res.length; i++) {
          var obj = {
            id: res[i].id,
            first_name: res[i].first_name,
            last_name: res[i].last_name,
            title: res[i].title,
            department: res[i].name,
            salary: res[i].salary,
            manager: res[i].manager_name
          }
          employeeArray.push(obj)
        }
        console.table(employeeArray);
        runSearch();
      })
    })
}


function viewByManager() {
  inquirer
    .prompt([
      {
        name: "managerFirst",
        type: "input",
        message: "Manager's first name?"
      },
      {
        name: "managerLast",
        type: "input",
        message: "Manager's last name?"
      }
    ])
    .then(function(answer) {
      let managerID
      let managerQuery = "SELECT employee.id FROM employee WHERE first_name=? AND last_name=?"
      connection.query(managerQuery, [answer.managerFirst, answer.managerLast], function(err, res) {
        managerID = res[0].id;
        // console.log(managerID)

        var query = "SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager_name ";
        query += "FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id INNER JOIN employee m ON m.id = e.manager_id WHERE e.manager_id=? GROUP BY e.id";
        connection.query(query, [managerID], function(err, res) {
          if (err) throw err;
          // console.log(res);
          var employeeArray = [];
          for (var i = 0; i < res.length; i++) {
            var obj = {
              id: res[i].id,
              first_name: res[i].first_name,
              last_name: res[i].last_name,
              title: res[i].title,
              department: res[i].name,
              salary: res[i].salary,
              manager: res[i].manager_name
            }
            employeeArray.push(obj)
          }
          console.table(employeeArray);
          runSearch();
        })
      })
    })
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "Employee's role?",
        choices: [
          "Regional Manager",
          "Assistant Regional Manager",
          "Salesperson",
          "Sales Representative",
          "Accountant"
        ]
      },
      {
        name: "managerFirst",
        type: "input",
        message: "Manager's first name?"
      },
      {
        name: "managerLast",
        type: "input",
        message: "Manager's last name?"
      }
    ])
    .then(function(answer) {
      let roleID
      if (answer.role === "Regional Manager") {
        roleID = 1;
      } else if (answer.role === "Assistant Regional Manager") {
        roleID = 2;
      } else if (answer.role === "Salesperson") {
        roleID = 3;
      } else if (answer.role === "Sales Representative") {
        roleID = 4;
      } else if (answer.role === "Accountant") {
        roleID = 5;
      }
      
      let managerID
      let managerQuery = "SELECT employee.id FROM employee WHERE first_name=? AND last_name=?"
      connection.query(managerQuery, [answer.managerFirst, answer.managerLast], function(err, res) {
        if (err) {runSearch()};
        managerID = res[0].id;
        // console.log(answer.firstName);
        // console.log(answer.lastName);
        // console.log(roleID);
        // console.log(managerID);

        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
        connection.query(query, [answer.firstName, answer.lastName, roleID, managerID], function(err, res) {
          // console.log("updated lol");
          if (err) {runSearch()};
          runSearch();
        })
      })

    })
}


function removeEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
      }
    ])
    .then(function(answer) {
      let query = "DELETE FROM employee WHERE first_name=? AND last_name=?";
      connection.query(query, [answer.firstName, answer.lastName], function(err, res) {
        // console.log("deleted lol");
        runSearch();
      })
    })
}

function updateRole() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
      },
      {
        name: "role",
        type: "list",
        message: "New role?",
        choices: [
          "Regional Manager",
          "Assistant Regional Manager",
          "Salesperson",
          "Sales Representative",
          "Accountant"
        ]
      }
    ])
    .then(function(answer) {
      let query = "UPDATE employee SET role_id=? WHERE first_name=? AND last_name=?";
      let roleID
      if (answer.role === "Regional Manager") {
        roleID = 1;
      } else if (answer.role === "Assistant Regional Manager") {
        roleID = 2;
      } else if (answer.role === "Salesperson") {
        roleID = 3;
      } else if (answer.role === "Sales Representative") {
        roleID = 4;
      } else if (answer.role === "Accountant") {
        roleID = 5;
      }
      connection.query(query, [roleID, answer.firstName, answer.lastName], function(err, res) {
        // console.log("updated lol");
        runSearch();
      })
    })
}


function updateManager() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Employee's last name?"
      },
      {
        name: "managerFirst",
        type: "input",
        message: "Manager's first name?"
      },
      {
        name: "managerLast",
        type: "input",
        message: "Manager's last name?"
      }
    ])
    .then(function(answer) {
      let managerID
      let managerQuery = "SELECT employee.id FROM employee WHERE first_name=? AND last_name=?"
      connection.query(managerQuery, [answer.managerFirst, answer.managerLast], function(err, res) {
        if (err) {runSearch()};
        managerID = res[0].id;
        // console.log(managerID);

        let query = "UPDATE employee SET manager_id=? WHERE first_name=? AND last_name=?";
        connection.query(query, [managerID, answer.firstName, answer.lastName], function(err, res) {
          // console.log("updated lol");
          if (err) {runSearch()};
          runSearch();
        })
      })

    })
}
