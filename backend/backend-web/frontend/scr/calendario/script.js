document.addEventListener("DOMContentLoaded", function () {
  const monthYearEl = document.getElementById("month-year");
  const daysEl = document.getElementById("days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const todayBtn = document.getElementById("today-btn");
  const eventDateEl = document.getElementById("event-date");
  const eventListEl = document.getElementById("event-list");

  let currentDate = new Date();
  let selectedDate = null;

  // ====== PADRONIZAÇÃO DE DATA ======
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  function buildDateKey(y, m, d) {
    return `${y}-${pad(m)}-${pad(d)}`;
  }

  // ====== EVENTOS DE EXEMPLO ======
  const events = {
    "2025-10-06": [{ time: "15:00 PM", text: "Acolhimento de alunos" }],
    "2025-10-17": [{ time: "All day", text: "Evento Clinica-Escola" }],
    "2025-10-18": [{ time: "08:00 PM", text: "MOCHILÃO - Unipê" }],
  };

  // ====== RENDERIZA O CALENDÁRIO ======
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0–11

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();
    const nextDays = 7 - (lastDayIndex + 1);

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    monthYearEl.textContent = `${months[month]} ${year}`;
    let days = "";

    // ====== Dias do mês anterior ======
    for (let x = firstDayIndex; x > 0; x--) {
      const day = prevLastDay.getDate() - x + 1;
      const dateKey = buildDateKey(year, month, day);

      const hasEvent = !!events[dateKey];

      days += `
        <div class="day other-month${hasEvent ? " has-events" : ""}">
          ${day}
        </div>
      `;
    }

    // ====== Dias do mês atual ======
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateKey = buildDateKey(year, month + 1, day);
      const hasEvent = !!events[dateKey];

      let classes = "day";

      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        classes += " today";
      }

      if (
        selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()
      ) {
        classes += " selected";
      }

      if (hasEvent) classes += " has-events";

      days += `
        <div class="${classes}" data-date="${dateKey}">
          ${day}
        </div>
      `;
    }

    // ====== Dias do próximo mês ======
    for (let day = 1; day <= nextDays; day++) {
      const dateKey = buildDateKey(year, month + 2, day);
      const hasEvent = !!events[dateKey];

      days += `
        <div class="day other-month${hasEvent ? " has-events" : ""}">
          ${day}
        </div>
      `;
    }

    daysEl.innerHTML = days;

    // ====== Clique nos dias ======
    document.querySelectorAll(".day:not(.other-month)").forEach((dayEl) => {
      dayEl.addEventListener("click", () => {
        const dateStr = dayEl.getAttribute("data-date");
        const [y, m, d] = dateStr.split("-").map(Number);

        selectedDate = new Date(y, m - 1, d);

        renderCalendar();
        showEvents(dateStr);
      });
    });
  }

  // ====== MOSTRA EVENTOS ======
  function showEvents(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const weekDays = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    const weekDayName = weekDays[dateObj.getDay()];

    eventDateEl.textContent = `${weekDayName}, ${day} de ${
      months[month - 1]
    } de ${year}`;
    eventListEl.innerHTML = "";

    if (events[dateStr]) {
      events[dateStr].forEach((evt) => {
        const item = document.createElement("div");
        item.className = "event-item";
        item.innerHTML = `
          <div class="event-color"></div>
          <div class="event-time">${evt.time}</div>
          <div class="event-text">${evt.text}</div>
        `;
        eventListEl.appendChild(item);
      });
    } else {
      eventListEl.innerHTML = `<div class="no-events">Sem eventos para esse dia</div>`;
    }
  }

  // ====== Botão mês anterior ======
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null;
    renderCalendar();
    eventDateEl.textContent = "Selecione uma data";
    eventListEl.innerHTML = "";
  });

  // ====== Botão próximo mês ======
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null;
    renderCalendar();
    eventDateEl.textContent = "Selecione uma data";
    eventListEl.innerHTML = "";
  });

  // ====== Botão HOJE ======
  todayBtn.addEventListener("click", () => {
    currentDate = new Date();
    selectedDate = new Date();
    renderCalendar();

    const todayKey = buildDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate()
    );

    showEvents(todayKey);
  });

  // Inicializa
  renderCalendar();
});
