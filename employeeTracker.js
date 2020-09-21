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
        "View All Employeees By Manager",
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
        multiSearch();
        break;

      case "View All Employeees By Manager":
        rangeSearch();
        break;

      case "Add Employee":
        songSearch();
        break;

      case "Remove Employee":
        songSearch();
        break;

      case "Update Employee Role":
        songSearch();
        break;
    
      case "Update Employee Manager":
        songSearch();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}


function viewAllEmployees() {
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id ";
  // var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id, s.name AS supervisor ";


  query += "FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY employee.id";
  // query += "FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id INNER JOIN employee s ON s.ID = employee.manager_id GROUP BY employee.id";



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
        manager: res[i].manager_id
      }
      employeeArray.push(obj)
    }
    console.table(employeeArray);
    runSearch();
  })
}

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        if (err) throw err;
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}
