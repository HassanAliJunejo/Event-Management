const events = [
  { id: 1, name: "Tech Conference 2025", date: "2025-12-10", seats: 5 },
  { id: 2, name: "AI & Robotics Expo", date: "2025-11-22", seats: 3 },
  { id: 3, name: "Music Fest Karachi", date: "2025-12-05", seats: 8 },
  { id: 4, name: "Startup Pitch Night", date: "2025-10-30", seats: 2 },
  { id: 5, name: "Photography Workshop", date: "2025-11-15", seats: 0 }
];

const container = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");

// Function to display all events
function renderEvents(filterText = "") {
  container.innerHTML = "";
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(filterText.toLowerCase())
  );

  filtered.forEach(event => {
    const card = document.createElement("div");
    card.classList.add("event-card");
    card.innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Available Seats:</strong> <span id="seat-${event.id}">${event.seats}</span></p>
      <button id="book-${event.id}" ${event.seats === 0 ? "disabled" : ""}>
        ${event.seats === 0 ? "Sold Out" : "Book Ticket"}
      </button>
    `;
    container.appendChild(card);

    const bookBtn = document.getElementById(`book-${event.id}`);
    bookBtn.addEventListener("click", () => bookTicket(event.id));
  });
}





// Function to handle booking
function bookTicket(eventId) {
  const event = events.find(e => e.id === eventId);
  if (event.seats > 0) {
    event.seats--;
    document.getElementById(`seat-${event.id}`).textContent = event.seats;
    if (event.seats === 0) {
      document.getElementById(`book-${event.id}`).disabled = true;
      document.getElementById(`book-${event.id}`).textContent = "Sold Out";
    }
    alert(`✅ Ticket booked for ${event.name}`);
  }
}

// Search events live
searchInput.addEventListener("input", e => {
  renderEvents(e.target.value);
});

// Initial render
renderEvents();

