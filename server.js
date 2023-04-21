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
        ],
      },
    ])
    .then((answer) => {
      console.log(answer.menuChoice);
      choiceRoutes(answer);
    });
};

const choiceRoutes = (answer) => {
  console.log(answer);

  switch (answer.menuChoice) {
    case "Display all Departments":
      console.log("Loading Departments ...");
      break;
    case "Display all Roles":
      console.log("Loading Roles ...");
      break;
    case "Display all Employees":
      console.log("Loading Employees ...");
      break;
    case "Add a Department":
      console.log("Please Enter a Name for the NEW Department");
      break;
    case "Add a Role":
      console.log("Please Enter a Title for the NEW Role");
      break;

    default:
      console.log("Something went wrong, please try again");
      break;
  }
};

mainMenu();
