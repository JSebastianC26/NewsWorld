/* NewsWorld - Favoritos: lista guardada en localStorage, con opción de eliminar */
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("favoritosContainer");
  const total = document.getElementById("totalFavoritos");

  function render() {
    const guardados = NW.favoritos()
      .map(f => ({ fav: f, n: NW.noticiaPorId(f.id) }))
      .filter(x => x.n)
      .sort((a, b) => b.fav.fecha.localeCompare(a.fav.fecha));

    total.textContent = guardados.length === 1 ? "1 noticia guardada" : `${guardados.length} noticias guardadas`;

    if (!guardados.length) {
      contenedor.innerHTML = `
        <div class="vacio">
          <p>Aún no has guardado ninguna noticia.</p>
          <a class="btn btn--oscuro" href="noticias.html">${NW.icono("flecha")}Explorar noticias</a>
        </div>`;
      return;
    }

    contenedor.innerHTML = `<div class="fav-lista">${guardados.map(({ fav, n }) => `
      <article class="fav" data-id="${n.id}">
        ${NW.imagenHTML(n.imagen, n.titulo)}
        <div class="fav__cuerpo">
          <div class="fav__meta">
            <span class="insignia">${NW.esc(n.categoria)}</span>
            <span>Guardado el ${NW.formatFecha(fav.fecha)}</span>
          </div>
          <h3>${NW.esc(n.titulo)}</h3>
        </div>
        <div class="fav__acciones">
          <a class="btn" href="detalle.html?id=${n.id}">${NW.icono("flecha")}Leer más</a>
          <button type="button" class="btn btn--peligro" data-quitar="${n.id}">${NW.icono("papelera")}Eliminar</button>
        </div>
      </article>`).join("")}</div>`;
  }

  contenedor.addEventListener("click", e => {
    const b = e.target.closest("[data-quitar]");
    if (!b) return;
    NW.quitarFavorito(b.dataset.quitar);
    render();
  });

  render();
});
