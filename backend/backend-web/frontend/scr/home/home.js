// MENU 
const menu = document.getElementById("menuLateral");
const overlay = document.querySelector(".overlay");

function alternarMenu() {
  menu.classList.toggle("aberto");
  overlay.classList.toggle("ativo");
}

document.getElementById("btnMenu").addEventListener("click", alternarMenu);
overlay.addEventListener("click", alternarMenu);


// CARROSSEL AUTOMÁTICO 
const slides = document.querySelector(".slides");
const totalImagens = document.querySelectorAll(".slides img").length;
let index = 0;

//  Função isolada para mover o slide (para podermos chamar ela no automático)
function moverSlide() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

function proximo() {
  index++;
  if (index >= totalImagens) index = 0;
  moverSlide();
}

function anterior() {
  index--;
  if (index < 0) index = totalImagens - 1;
  moverSlide();
}

// Cria o temporizador automático (3000ms = 3 segundos)
let intervalo = setInterval(proximo, 3000);

// Função para resetar o tempo quando o usuário clica
function reiniciarTimer() {
  clearInterval(intervalo); 
  intervalo = setInterval(proximo, 3000); 
}

// Evento botão Direita
document.querySelector(".direita").addEventListener("click", () => {
  proximo();
  reiniciarTimer(); 
});

// Evento botão Esquerda
document.querySelector(".esquerda").addEventListener("click", () => {
  anterior();
  reiniciarTimer();
});