
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "id",
    height: 600,
    events: [],
  });

  calendar.render();

  document.getElementById("offForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const dates = document.getElementById("dates").value;
    const eventList = dates.split(",").map((date) => ({
      title: name,
      start: date.trim(),
      allDay: true,
    }));

    eventList.forEach((event) => calendar.addEvent(event));

    fetch("https://script.google.com/macros/s/AKfycbyec8MG9m6CCbkvVH0QSepRef__KcG4_wwEYoQd3pAYhw_a3t5kVdSl8l1IlVqNhVjgsA/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, dates }),
    });

    document.getElementById("offForm").reset();
    alert("Data berhasil dikirim!");
  });
});
