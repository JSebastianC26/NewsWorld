/* NewsWorld - Detalle de artículo: se lee ?id= y se pinta desde los datos */
document.addEventListener("DOMContentLoaded", () => {
  const raiz = document.getElementById("articulo");
  const id = new URLSearchParams(location.search).get("id");
  const n = NW.noticiaPorId(id);

  if (!n) {
    raiz.innerHTML = `
      <section class="pagina">
        <div class="vacio"><p>No encontramos esta noticia. Puede que haya sido eliminada.</p>
        <a class="btn btn--oscuro" href="noticias.html">${NW.icono("flecha")}Volver a Noticias</a></div>
      </section>`;
    document.title = "Noticia no encontrada — NewsWorld";
    return;
  }

  document.title = `${n.titulo} — NewsWorld`;

  /* Contenido en texto plano: "## " = subtítulo, "> " = cita, resto = párrafo */
  function cuerpo(texto) {
    let primero = true;
    return String(texto || "").split(/\n{2,}/).map(b => b.trim()).filter(Boolean).map(b => {
      if (b.startsWith("## ")) return `<h2>${NW.esc(b.slice(3))}</h2>`;
      if (b.startsWith("> ")) return `<blockquote>“${NW.esc(b.slice(2))}”</blockquote>`;
      const html = `<p${primero ? ' class="lead"' : ""}>${NW.esc(b)}</p>`;
      primero = false;
      return html;
    }).join("");
  }

  const borrador = n.estado !== "publicado"
    ? `<span class="insignia">${n.estado === "borrador" ? "Borrador" : "En revisión"}</span>` : "";
  const puntos = (n.puntos || []).length
    ? `<aside class="panel-lateral"><h4>En esta historia</h4><ul>${n.puntos.map(p => `<li>${NW.esc(p)}</li>`).join("")}</ul></aside>` : "";
  const temas = (n.temas || []).length
    ? `<div class="temas"><strong>Temas</strong>${n.temas.map(t => `<span class="insignia">${NW.esc(t)}</span>`).join("")}</div>` : "";

  raiz.innerHTML = `
    <header class="articulo-cab">
      <div class="articulo-cab__in">
        <div class="articulo-meta">
          <span class="insignia">${NW.esc(n.categoria)}</span>${borrador}
          <span>Publicado el ${NW.formatFecha(n.fecha, true)}</span>
          <i class="punto"></i>
          <span>${n.lectura || 1} min de lectura</span>
        </div>
        <h1>${NW.esc(n.titulo)}</h1>
        <p class="articulo-sub">${NW.esc(n.descripcion)}</p>
        <div class="articulo-autoria">
          <div class="autor">
            <div class="autor__avatar">${NW.icono("usuario")}</div>
            <div><strong>${NW.esc(n.autor || "Redacción")}</strong><span>${NW.esc(n.cargo || "NewsWorld")}</span></div>
          </div>
          <button type="button" class="btn" id="btnFavorito" aria-pressed="false"></button>
        </div>
      </div>
    </header>

    <div class="articulo-media">
      <figure>
        ${NW.imagenHTML(n.imagen, n.titulo)}
        <figcaption>Foto: Archivo de NewsWorld.</figcaption>
      </figure>
    </div>

    <div class="articulo-cuerpo-wrap">
      <div class="articulo-cuerpo ${puntos ? "" : "sin-lateral"}">
        <article class="prosa">${cuerpo(n.contenido)}${temas}</article>
        ${puntos}
      </div>
    </div>`;

  const boton = document.getElementById("btnFavorito");
  function pintarBoton() {
    const activo = NW.esFavorito(n.id);
    boton.setAttribute("aria-pressed", String(activo));
    boton.innerHTML = NW.icono("bookmark") + (activo ? "Guardado en Favoritos" : "Añadir a Favoritos");
  }
  boton.addEventListener("click", () => { NW.alternarFavorito(n.id); pintarBoton(); });
  pintarBoton();
});
