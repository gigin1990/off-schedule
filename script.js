document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "id",
    height: 600,
    events: [],
  });
  calendar.render();

  // Generate August 2025 dates
  const dateSelect = document.getElementById("dates");
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = `2025-08-${i.toString().padStart(2, '0')}`;
    option.text = `Tanggal ${i}`;
    dateSelect.appendChild(option);
  }

  // Limit to 3 selections
  dateSelect.addEventListener("change", function () {
    const selected = [...this.selectedOptions];
    if (selected.length > 3) {
      alert("Maksimal pilih 3 tanggal saja.");
      selected[selected.length - 1].selected = false;
    }
  });

  // Form submission
  document.getElementById("offForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const selectedOptions = Array.from(document.getElementById("dates").selectedOptions);
    const dates = selectedOptions.map(opt => opt.value);

    const eventList = dates.map(date => ({
      title: name,
      start: date,
      allDay: true,
    }));
    eventList.forEach(event => calendar.addEvent(event));

    fetch("https://script.google.com/macros/s/AKfycbw11gVktegPQnCqvlVlSn3zMMzBqez1yUUkaK7kq5l3lw9EjrA-4JDVO0UD9G9-RoDO3Q/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dates }),
    });

    document.getElementById("offForm").reset();
    alert("Data berhasil dikirim!");
  });
});
