/* -------------------- BASIC JS -------------------- */
(function () {
  /* ---------- KLASE ---------- */
  class UI {
    //konstruktor
    constructor() {
      this.icon = appMenu.children[0].children[0];
      this.menu = document.querySelector(".menu");
    }
    //dobijanje vrijednosti na osnovu koje se radi funkcija hideShowMenu
    getValue() {
      let value;
      if (this.icon.classList.contains("down")) {
        value = "down";
      } else if (this.icon.classList.contains("up")) {
        value = "up";
      }
      return value;
    }
    //prikazi i sakrij meni na osnovu vrijednosti koje si dobio
    hideShowMenu(value) {
      if (value === "down") {
        //akcije sa ikonom
        this.icon.classList.remove("down", "fas", "fa-angle-down");
        this.icon.classList.add("up", "fas", "fa-angle-up");
        //akcije sa menijem
        this.menu.classList.remove("hidemenu");
        this.menu.classList.add("showmenu");
      } else if (value === "up") {
        //akcije sa ikonom
        this.icon.classList.remove("up", "fas", "fa-angle-up");
        this.icon.classList.add("down", "fas", "fa-angle-down");
        //akcije sa menijem
        this.menu.classList.add("hidemenu");
        this.menu.classList.remove("showmenu");
      }
    }
  }
  /* ---------- KLASE ---------- */

  /* ---------- VARIJABLE ---------- */
  let appMenu = document.querySelector(".appMenu");
  let ui = new UI();
  /* ---------- VARIJABLE ---------- */

  /* ---------- EVENTI ---------- */
  //prikazi i sakrij meni
  appMenu.addEventListener("click", (event) => {
    if (event.target.parentElement.classList.contains("openMenu")) {
      let value = ui.getValue();
      ui.hideShowMenu(value);
    } else if (event.target.classList.contains("appMenu")) {
      let value = ui.getValue();
      ui.hideShowMenu(value);
    }
  });
  /* ---------- EVENTI ---------- */
})();
/* -------------------- BASIC JS -------------------- */

/* -------------------- TRANSFER JS -------------------- */
(function () {
  /* ---------- VARIJABLE ---------- */
  let create = document.querySelector(".flashcard_create");
  let settings = document.querySelector(".account_settings");
  create.addEventListener("click", () => {
    window.location.href = "../create/create.html";
  });
  settings.addEventListener("click", () => {
    window.location.href = "../settings/settings.html";
  });
  /* ---------- VARIJABLE ---------- */
})();
/* -------------------- TRANSFER JS -------------------- */

/* ---------------------------------------------------------------------------------------------------------------------------------- */
