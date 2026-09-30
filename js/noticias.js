/* NewsWorld - Página Noticias: filtro por categoría, búsqueda y paginación */
document.addEventListener("DOMContentLoaded", () => {
  const POR_PAGINA = 6;
  const grid = document.getElementById("newsGrid");
  const pag = document.getElementById("paginacion");
  const buscador = document.getElementById("searchInput");
  const chips = document.querySelectorAll(".chip[data-categoria]");
  const contador = document.getElementById("contador");
  const estado = { categoria: "Todas", texto: "", pagina: 1 };

  function filtrar() {
    const q = NW.normalizar(estado.texto.trim());
    return NW.ordenarRecientes(NW.noticias().filter(n => n.estado === "publicado"))
      .filter(n => estado.categoria === "Todas" || n.categoria === estado.categoria)
      .filter(n => !q || NW.normalizar(n.titulo + " " + n.descripcion + " " + n.categoria).includes(q));
  }

  function tarjeta(n) {
    return `
      <article class="tarjeta">
        ${NW.imagenHTML(n.imagen, n.titulo)}
        <div class="tarjeta__cuerpo">
          <div class="tarjeta__top">
            <span class="insignia">${NW.esc(n.categoria)}</span>
            <time class="meta" datetime="${NW.esc(n.fecha)}">${NW.formatFecha(n.fecha)}</time>
          </div>
          <h3>${NW.esc(n.titulo)}</h3>
          <p>${NW.esc(n.descripcion)}</p>
          <a class="btn" href="detalle.html?id=${n.id}">${NW.icono("flecha")}Leer más</a>
        </div>
      </article>`;
  }

  function renderPaginacion(total) {
    const paginas = Math.max(1, Math.ceil(total / POR_PAGINA));
    if (paginas <= 1) { pag.innerHTML = ""; return; }
    let html = `<button type="button" data-pagina="${estado.pagina - 1}" ${estado.pagina === 1 ? "disabled" : ""}>Anterior</button>`;
    for (let i = 1; i <= paginas; i++) {
      html += `<button type="button" data-pagina="${i}" ${i === estado.pagina ? 'aria-current="page"' : ""}>${i}</button>`;
    }
    html += `<button type="button" data-pagina="${estado.pagina + 1}" ${estado.pagina === paginas ? "disabled" : ""}>Siguiente</button>`;
    pag.innerHTML = html;
  }

  function render() {
    const lista = filtrar();
    const paginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    if (estado.pagina > paginas) estado.pagina = paginas;
    const desde = (estado.pagina - 1) * POR_PAGINA;
    const visibles = lista.slice(desde, desde + POR_PAGINA);

    grid.innerHTML = visibles.length
      ? visibles.map(tarjeta).join("")
      : `<div class="vacio"><p>No encontramos noticias con esos criterios.</p>
           <button type="button" class="btn" id="limpiar">Limpiar filtros</button></div>`;
    contador.textContent = lista.length === 1 ? "1 noticia" : `${lista.length} noticias`;
    renderPaginacion(lista.length);
  }

  chips.forEach(chip => chip.addEventListener("click", () => {
    estado.categoria = chip.dataset.categoria;
    estado.pagina = 1;
    chips.forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
    render();
  }));

  buscador.addEventListener("input", () => {
    estado.texto = buscador.value;
    estado.pagina = 1;
    render();
  });

  pag.addEventListener("click", e => {
    const b = e.target.closest("button[data-pagina]");
    if (!b || b.disabled) return;
    estado.pagina = Number(b.dataset.pagina);
    render();
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  grid.addEventListener("click", e => {
    if (!e.target.closest("#limpiar")) return;
    estado.categoria = "Todas"; estado.texto = ""; estado.pagina = 1;
    buscador.value = "";
    chips.forEach(c => c.setAttribute("aria-pressed", String(c.dataset.categoria === "Todas")));
    render();
  });

  render();
});
