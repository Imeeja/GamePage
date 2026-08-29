const nameModal = new bootstrap.Modal(document.querySelector("#nameModal"));

const playerName = document.querySelector("#playerName");
const startGameBtn = document.querySelector("#startGameBtn");
const nameError = document.querySelector("#nameError");
const welcomeMessage = document.querySelector("#welcomeMessage");

// Show name modal when page loads
// window.addEventListener("load", () => {
//   nameModal.show();

//   playerName.focus();
// });
//  Show name modal when page loads
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("playerName");

  if (!savedName) {
    nameModal.show();
    playerName.focus();
  } else {
    welcomeMessage.textContent = `Welcome, ${savedName}! 👋`;
  }
});

// Start button
startGameBtn.addEventListener("click", () => {
  const name = playerName.value.trim();

  if (name === "") {
    nameError.style.display = "block";

    playerName.focus();

    return;
  }
  localStorage.setItem("playerName", name);

  nameError.style.display = "none";

  welcomeMessage.textContent = `Welcome, ${name}! 👋`;

  nameModal.hide();
});

// Remove error as user types
playerName.addEventListener("input", () => {
  if (playerName.value.trim() !== "") {
    nameError.style.display = "none";
  }
});

// Allow Enter key to start
playerName.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startGameBtn.click();
  }
});
