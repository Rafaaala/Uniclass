// MENU 
const menu = document.getElementById("menuLateral");
const overlay = document.querySelector(".overlay");

function alternarMenu() {
  menu.classList.toggle("aberto");
  overlay.classList.toggle("ativo");
}

document.getElementById("btnMenu").addEventListener("click", alternarMenu);
overlay.addEventListener("click", alternarMenu);

