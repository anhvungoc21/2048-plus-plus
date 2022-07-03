function handleClickSettings(settingsDropDown) {
  settingsDropDown.classList.toggle("show");
}

function handleClickOutsideSettings(e, settingsDropDown) {
  if (!e.target.matches("#btn--settings-dropdown")) {
    settingsDropDown.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
  }
}

export function handleSettings() {
  const btnDropDown = document.getElementById("btn--settings-dropdown");
  const settingsDropDown = document.getElementById("settings-dropdown");
  btnDropDown.addEventListener("click", () => handleClickSettings(settingsDropDown));
  window.addEventListener("click", (e) => handleClickOutsideSettings(e, settingsDropDown));
}