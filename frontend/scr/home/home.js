document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btnMenu");
  const menu = document.getElementById("menuLateral");
  const overlay = document.querySelector(".overlay");

  if (btnMenu && menu && overlay) {
    btnMenu.addEventListener("click", () => {
      menu.classList.toggle("aberto");
      overlay.classList.toggle("ativo");
    });

    // fechar tocando no fundo escuro
    overlay.addEventListener("click", () => {
      menu.classList.remove("aberto");
      overlay.classList.remove("ativo");
    });
  }
});
