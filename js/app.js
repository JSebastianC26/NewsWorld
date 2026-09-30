/* NewsWorld - Comportamiento compartido por todas las páginas */
document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil: abre/cierra la lista de enlaces y actualiza aria-expanded
  const boton = document.querySelector(".nav__toggle");
  const enlaces = document.querySelector(".nav__links");
  if (boton && enlaces) {
    boton.addEventListener("click", () => {
      const abierto = enlaces.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", abierto);
    });
  }
  // Año dinámico en el pie de página
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
});
