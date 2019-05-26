const express = require("express");
const app = express();
const connexion = require("./back/config");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3003;
const road = require("./back/road.js");
const session = require("express-session");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/road", road);

app.use(express.static(path.join(__dirname, "public")));

app.get("/callendar", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", function(req, res) {
  res.sendFile(__dirname + "/register.html");
});

//ajouter un nouveau user
app.post("/addusers", (req, res) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
  const values = [req.body.name, req.body.email, req.body.password];
  connexion.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      return res.status(200).send(result);
    }
  });
});

//se connecter
app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE name = ? AND password = ?";
  const values = [name, password];
  console.log(name, password);
  if (name && password) {
    console.log("okokokokokoko");
    connexion.query(sql, values, (error, results, fields) => {
      console.log("results", results);
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.name = name;
        res.redirect("/callendar");
      } else {
        res.redirect("/");
        res.send("Incorrect Username and/or Password!");
      }
      res.end();
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

server.listen(port, function() {
  console.log("listening on port = " + port);
});

//initialisation de socket Io
io.on("connection", function(socket) {
  //envoi des datas au front
  socket.emit(
    "events",
    (data = [
      {
        groupId: 998,
        title: "Repeating Event",
        start: "2019-04-07T16:00:00"
      },
      {
        groupId: 997,
        title: "Repeating Event",
        start: "2019-04-06T16:00:00"
      },
      {
        groupId: 999,
        title: "Repeating Event",
        start: "2019-04-03T16:00:00"
      }
    ])
  );

  //récupération de la data du front
  socket.on("events", data => {
    console.log("events from front", data);
  });
});
