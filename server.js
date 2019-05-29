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
const axios = require("axios");
const moment = require("moment");

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

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.get("/callendar", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//Route pour ajouter un nouveau user ==================================================================
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

//Route pour poster un event ==========================================================================
app.post("/addevents", (req, res) => {
  const sql = "INSERT INTO events (title, date, idusers) VALUES (?, ?, ?)";
  const values = [req.body.title, req.body.date, req.body.id];
  connexion.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    } else {
      return res.status(200).send(result);
    }
  });
});

//Route de  connection ================================================================================
app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const sql = "SELECT * FROM users WHERE name = ? AND password = ?";
  const values = [name, password];
  if (name && password) {
    connexion.query(sql, values, (error, results, fields) => {
      console.log("resultas ++++>", results);
      let id;
      if (results.length === 0) {
        id = 0;
      } else {
        id = results[0].id;
      }
      if (results.length > 0) {
        req.session.loggedin = true;
        req.session.name = name;
        req.session.password = password;
        res.redirect("/callendar");
        calendarCreate(id);
      } else {
        // res.send("Incorrect Username and/or Password!");
        res.redirect("/");
      }
      res.end();
    });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

//function pour la création du calendrier =============================================================
calendarCreate = id => {
  axios.get(`http://localhost:3003/road/events/${id}`).then(res => {
    io.on("connection", function(socket) {
      //envoi des datas au front ========================================
      socket.emit(
        "events",
        (data = res.data.map(e => {
          return { title: e.title, start: e.date };
        }))
      );
      // récupération de la data du front ===============================
      socket.on("events", data => {
        let date = data.start;
        date = moment(date).format("YYYY-MM-DD");
        let title = data.title;
        console.log("=======", data);
        //envoi de la data dans la BDD ==================================
        axios
          .post("http://localhost:3003/addevents", {
            title: title,
            date: date,
            id: id
          })
          .then(res => console.log(res));
      });
    });
  });
};

//port d'écoute =======================================================================================
server.listen(port, function() {
  console.log("listening on port = " + port);
});
