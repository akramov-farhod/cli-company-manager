const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "company_directory",
  },
  console.log(`Connected: Company Directory`)
);

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: `Greetings, User. Select an Action: `,
        name: "menuChoice",
        choices: [
          "Display all Departments",
          "Display all Roles",
          "Display all Employees",
          "Add a Department",
          "Add a Role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer.menuChoice);
      choiceRoutes(answer);
    });
};

const choiceRoutes = (answer) => {
  switch (answer.menuChoice) {
    case "Display all Departments":
      console.log("Loading Departments ...");
      db.query("SELECT * FROM departments", (error, results) => {
        console.table(results);
        console.log("Returning to the MAIN Menu ...");
        mainMenu();
      });
      break;

    case "Display all Roles":
      console.log("Loading Roles ...");
      db.query(
        "SELECT roles.id, roles.title, roles.salary, departments.name FROM roles INNER JOIN departments ON roles.department_id=departments.id",
        (error, results) => {
          console.table(results);
          console.log("Returning to the MAIN Menu ...");
          mainMenu();
        }
      );
      break;

    case "Display all Employees":
      console.log("Loading Employees ...");
      db.query(
        "SELECT employee.id, employee.first_name, employee.last_name, departments.name, roles.title, roles.salary FROM employee INNER JOIN roles ON employee.role_id=roles.id INNER JOIN departments ON roles.department_id=departments.id",
        (error, results) => {
          console.table(results);
          console.log("Returning to the MAIN Menu ...");
          mainMenu();
        }
      );
      break;
    case "Add a Department":
      addDepartment();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Exit":
      exit();
      break;

    default:
      console.log("Something went wrong, please try again");
      break;
  }
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the NEW department?",
        name: "newDepartment",
      },
    ])
    .then((answer) => {
      console.log(answer.newDepartment);
      let depName = answer.newDepartment;
      db.query("INSERT INTO departments SET name=?", [depName]);
      db.query("SELECT * FROM departments", (error, results) => {
        console.table(results);
        console.log("!!! Successfully ADDED a NEW Department !!!");
        console.log("Returning to the MAIN Menu ...");
        mainMenu();
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter a TITLE for the New Role",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Enter desired SALARY for the New Role",
        name: "roleSalary",
      },
      {
        type: "list",
        choices: ["Corporate", "Management", "Front", "Back"],
        message: "Select a Department for the Role",
        name: "roleDep",
      },
    ])
    .then((answer) => {
      console.log(answer.roleTitle);
      console.log(answer.roleSalary);
      let roleTitle = answer.roleTitle;
      let roleSalary = answer.roleSalary;
      let roleDepName = answer.roleDep;
      let roleDepId;
      switch (roleDepName) {
        case "Corporate":
          roleDepId = 1;
          break;
        case "Management":
          roleDepId = 2;
          break;
        case "Front":
          roleDepId = 3;
          break;
        case "Back":
          roleDepId = 4;
          break;
        default:
          console.log("Something went wrong, please try again!");
          break;
      }

      let sql = "INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)";
      let userInput = [roleTitle, roleSalary, roleDepId];

      db.query(sql, userInput, (error, result) => {
        if (error) throw error;
      });

      db.query("SELECT * FROM roles", (error, results) => {
        console.table(results);
        console.log("!!! Successfully ADDED a NEW Role !!!");
        console.log("Returning to the MAIN Menu ...");
        mainMenu();
      });
    });
};

const exit = () => {
  inquirer
    .prompt([
      {
        // I do know that i could've used CONFIRM for this,
        // but for visual representation of my application
        // i prefer the use of arrow keys instead
        type: "list",
        choices: ["No", "Yes"],
        message: "Are you Certain that you want to EXIT the Application?",
        name: "exit",
      },
    ])
    .then((answer) => {
      if (answer.exit === "Yes") {
        console.log("Exiting Application ...");
        process.exit();
      } else {
        mainMenu();
      }
    });
};
mainMenu();
