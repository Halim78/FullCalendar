let socket = io();
const date = moment().format();
//function envoi de data socket============================================================
function socketEmit(val, data) {
  socket.emit(val, data);
}

//Au chargement du DOM======================================================================
document.addEventListener("DOMContentLoaded", function() {
  //réception des datas du serveur
  socket.on("events", data => {
    doThisWithPrevious(data);
  });
});

//Function pour la création du calendrier avec la data récuperer du socket==================
function doThisWithPrevious(that) {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid"],
    header: {
      center: "addEventButton"
    },
    defaultDate: `${date}`,
    editable: true,
    eventLimit: true,
    events: that,
    customButtons: {
      addEventButton: {
        text: "add event...",
        click: function() {
          let dateStr = prompt("Enter une date au format DD-MM-YYYY ");
          console.log("ooooooooooo", dateStr);
          let date = new Date(moment(dateStr).format("DD-MM-YYYY")); // will be in local time

          // let dateStr = prompt("Enter a date in YYYY-MM-DD format");
          // let date = new Date(dateStr + "T00:00:00"); // will be in local time

          if (!isNaN(date.valueOf())) {
            calendar.addEvent(
              (data = {
                title: "dynamic event",
                start: date
              })
            );
            alert("Event enregistrer");
            //envoi de la data au serveur====================================================
            socketEmit("events", data);
          } else {
            alert("Invalid date.");
          }
        }
      }
    }
  });
  calendar.render();
}
