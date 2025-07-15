
document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2025-08-01",
    locale: "id",
    height: 600,
    events: []
  });
  calendar.render();

  // Generate dropdown dates for August 2025
  const select = document.getElementById("dates");
  for (let day = 1; day <= 31; day++) {
    const date = `2025-08-${day.toString().padStart(2, "0")}`;
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    select.appendChild(option);
  }
  $(select).select2();

  document.getElementById("offForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const selectedDates = $("#dates").val();
    const events = selectedDates.map(date => ({
      title: name,
      start: date,
      allDay: true
    }));

    // Show in calendar
    events.forEach(event => calendar.addEvent(event));

    // Send to Google Apps Script
    fetch("https://script.google.com/macros/s/AKfycbw11gVktegPQnCqvlVlSn3zMMzBqez1yUUkaK7kq5l3lw9EjrA-4JDVO0UD9G9-RoDO3Q/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, dates: selectedDates })
    }).then(() => alert("Data berhasil dikirim!"));

    this.reset();
    $("#dates").val(null).trigger("change");
  });
});
