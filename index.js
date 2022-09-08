const express = require("express");
const bodyParser = require("body-parser");

const sql = require("mssql");

const port = 3000;
const app = express();

app.use(bodyParser.json());
var config = {
  user: "sa",
  password: "reallyStrongPwd123",
  server: "localhost",
  database: "master",
  synchronize: true,
  trustServerCertificate: true,
};
var request;
sql.connect(config, function (err) {
  if (err) {
    console.log(err);
  } else {
    request = new sql.Request();
    console.log("connected");
  }
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  return res.send("Hello  World!");
});

app.get("/json", (req, res) => {
  request.query("select * from prices", function (err, recordset) {
    if (err) return res.status(400).json({ status: false, message: err });
    return res.json({ data: recordset.recordset, status: true });
  });
});

//mysql connection
// const mysql = require("mysql2");
// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "12345678",
//   database: "test",
// });
// conn.connect((err) => {
//   if (err) {
//     console.error("error connection " + err.stack);
//     return;
//   }
//   console.log("connection " + conn.threadId);
// });
