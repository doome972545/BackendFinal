
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysql_api_flutter",
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database", err);
        return;
    }
    console.log("Connecting to database successfully!");
});

module.exports = connection;