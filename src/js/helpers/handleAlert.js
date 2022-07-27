const alertContainer = document.getElementById("alert-container");

/* Alerts */
const createAlert = function (message, duration = 2000) {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.classList.add("alert");
  alertContainer.append(alert);
  setTimeout(() => {
    alert.classList.add("hide");
    alert.addEventListener("transitionend", () => alert.remove()); // Delete old alerts at the end of transition
  }, duration);
};

const displayAlert = function (message, duration = 2000) {
  const alert = alertContainer.querySelector(".alert");

  // Checks for existing alert. If yes, destroy immediately then setTimeout again
  if (alert === null) {
    createAlert(message, duration);
  } else {
    alert.remove();
    createAlert(message, duration);
  }
};

export default displayAlert;
