
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

    fetch("https://script.google.com/macros/s/AKfycbw11gVktegPQnCqvlVlSn3zMMzBqez1yUUkaK7kq5l3lw9EjrA-4JDVO0UD9G9-RoDO3Q/exec", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: name,
    dates: dates.split(",").map(d => d.trim())  // pastikan bentuk array
  }),
})
.then(response => response.text())
.then(result => {
  console.log("Sukses kirim:", result);
  alert("Data berhasil dikirim!");
  document.getElementById("offForm").reset();
})
.catch(error => {
  console.error("Gagal kirim:", error);
  alert("Gagal mengirim data");
});
});
