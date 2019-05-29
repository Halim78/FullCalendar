let socket = io();
const date = moment().format();

//Function envoi de data socket====================================================================
function socketEmit(val, data) {
  socket.emit(val, data);
}

//au chargement de la page on affiche le calendrier, puis à chaque évenements on appel la function createEvent
$(document).ready(() => {
  let calendar = createCallendar();
  socket.on("events", data => {
    createEvent(calendar, data);
  });
});

//function pour ajouter l'event
createEvent = (calendar, data) => {
  console.log("datatatatatata", data);
  data.map(e => calendar.addEvent(e));
};

//Function pour la création du calendrier avec la data récuperer du socket===========================
createCallendar = () => {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid"],
    header: {
      center: "addEventButton"
    },
    defaultDate: `${date}`,
    editable: true,
    eventLimit: true,
    events: [
      {
        title: "test",
        start: "2019-05-09"
      }
    ],
    customButtons: {
      addEventButton: {
        text: "add event...",
        click: function() {
          let dateStr = prompt("Enter une date au format DD-MM-YYYY ");
          console.log("ooooooooooo", dateStr);
          let date = new Date(moment(dateStr).format("DD-MM-YYYY"));
          if (!isNaN(date.valueOf())) {
            calendar.addEvent(
              (data = {
                // id: "1",
                // resourceIds: ["2"],
                title: "dynamic event",
                start: date
              })
            );
            alert("Event enregistrer");
            //envoi de la data au serveur============================================================
            socketEmit("events", data);
          } else {
            alert("Invalid date.");
          }
        }
      }
    }
  });
  calendar.render();
  return calendar;
};
