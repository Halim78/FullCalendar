// //initialisation de socket Io===================================================================
// // io.on("connection", function(socket) {
// //   //envoi des datas au front
// //   socket.emit(
// //     "events",
// //     (data = [
// //       {
// //         groupId: 998,
// //         title: "Repeating Event",
// //         start: "2019-05-07T16:00:00"
// //       },
// //       {
// //         groupId: 997,
// //         title: "Repeating Event",
// //         start: "2019-05-06T16:00:00"
// //       },
// //       {
// //         groupId: 999,
// //         title: "Repeating Event",
// //         start: "2019-05-03T16:00:00"
// //       }
// //     ])
// //   );

// //   //récupération de la data du front
// //   socket.on("events", data => {
// //     console.log("events from front", data);
// //   });
// // });

// let socket = io();
// const date = moment().format();

// //Function envoi de data socket====================================================================
// function socketEmit(val, data) {
//   socket.emit(val, data);
// }

// //Au chargement du DOM=============================================================================
// // document.addEventListener("DOMContentLoaded", function() {
// //réception des datas du serveur
// // socket.on("events", data => {
// // doThisWithPrevious(data);
// // });
// // });

// $(document).ready(() => {
//   createCallendar();
// });

// //function création du callendrier
// createCallendar = () => {
//   let calendarEl = document.getElementById("calendar");
//   calendar = new FullCalendar.Calendar(calendarEl, {
//     plugins: ["interaction", "dayGrid"],
//     header: {
//       center: "addEventButton"
//     },
//     defaultDate: `${date}`,
//     editable: true,
//     eventLimit: true,
//     customButtons: {
//       addEventButton: {
//         text: "add event...",
//         click: function() {
//           let dateStr = prompt("Enter une date au format DD-MM-YYYY ");
//           console.log("ooooooooooo", dateStr);
//           let date = new Date(moment(dateStr).format("DD-MM-YYYY"));
//           if (!isNaN(date.valueOf())) {
//             calendar.addEvent(
//               (data = {
//                 // id: "1",
//                 // resourceIds: ["2"],
//                 title: "dynamic event",
//                 start: date
//               })
//             );
//             alert("Event enregistrer");
//             //envoi de la data au serveur============================================================
//             socketEmit("events", data);
//           } else {
//             alert("Invalid date.");
//           }
//         }
//       }
//     }
//   });
//   calendar.render();
// };

// //Function pour la création du calendrier avec la data récuperer du socket==========================
// function doThisWithPrevious(that) {
//   let calendarEl = document.getElementById("calendar");
//   calendar = new FullCalendar.Calendar(calendarEl, {
//     plugins: ["interaction", "dayGrid"],
//     header: {
//       center: "addEventButton"
//     },
//     defaultDate: `${date}`,
//     editable: true,
//     eventLimit: true,
//     events: that,
//     customButtons: {
//       addEventButton: {
//         text: "add event...",
//         click: function() {
//           let dateStr = prompt("Enter une date au format DD-MM-YYYY ");
//           console.log("ooooooooooo", dateStr);
//           let date = new Date(moment(dateStr).format("DD-MM-YYYY"));
//           if (!isNaN(date.valueOf())) {
//             calendar.addEvent(
//               (data = {
//                 // id: "1",
//                 // resourceIds: ["2"],
//                 title: "dynamic event",
//                 start: date
//               })
//             );
//             alert("Event enregistrer");
//             //envoi de la data au serveur============================================================
//             socketEmit("events", data);
//           } else {
//             alert("Invalid date.");
//           }
//         }
//       }
//     }
//   });
//   calendar.render();
// }

// let res = Object.assign({}, ...[tab]);
// console.log(Object.create(res));
// console.log(new Object(tab));
// tab.map(e => console.log(e));
// const resultat = tab.map(e => e);
// console.log(resultat);
let tab = [
  { title: "ok", start: "kokokokoko" },
  { title: "ok", start: "kokokokoko" },
  { title: "ok", start: "kokokokoko" },
  { title: "ok", start: "kokokokokommmmm" }
];
