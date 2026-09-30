/* NewsWorld - Admin: crear, editar y eliminar noticias (localStorage) */
document.addEventListener("DOMContentLoaded", () => {
  const POR_PAGINA = 5;
  const form = document.getElementById("formNoticia");
  const estadoForm = document.getElementById("estadoForm");
  const tbody = document.getElementById("tablaNoticias");
  const buscador = document.getElementById("buscarAdmin");
  const filtroEstado = document.getElementById("filtroEstado");
  const pie = document.getElementById("pieTabla");
  const total = document.getElementById("totalNoticias");
  const btnPrev = document.getElementById("prev");
  const btnNext = document.getElementById("next");
  const tituloForm = document.getElementById("tituloForm");
  const btnCancelar = document.getElementById("cancelarEdicion");
  const estado = { pagina: 1, editando: null };

  const ETIQUETA = { publicado: "Publicada", borrador: "Borrador", revision: "En revisión" };

  /* ---------- Estadísticas ---------- */
  function pintarStats() {
    const lista = NW.noticias();
    const cuenta = e => lista.filter(n => n.estado === e).length;
    document.getElementById("stPublicadas").textContent = cuenta("publicado");
    document.getElementById("stBorradores").textContent = cuenta("borrador");
    document.getElementById("stRevision").textContent = cuenta("revision");
    document.getElementById("stFavoritos").textContent = NW.favoritos().length;
    total.textContent = `${lista.length} noticias en total`;
  }

  /* ---------- Tabla ---------- */
  function filtradas() {
    const q = NW.normalizar(buscador.value.trim());
    return NW.ordenarRecientes(NW.noticias())
      .filter(n => !filtroEstado.value || n.estado === filtroEstado.value)
      .filter(n => !q || NW.normalizar(n.titulo + " " + n.categoria + " " + NW.codigo(n)).includes(q));
  }

  function pintarTabla() {
    const lista = filtradas();
    const paginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    if (estado.pagina > paginas) estado.pagina = paginas;
    const desde = (estado.pagina - 1) * POR_PAGINA;
    const visibles = lista.slice(desde, desde + POR_PAGINA);

    tbody.innerHTML = visibles.length ? visibles.map(n => `
      <tr>
        <td><div class="t-titulo">${NW.esc(n.titulo)}</div><div class="t-codigo">${NW.codigo(n)}</div></td>
        <td>${NW.esc(n.categoria)}</td>
        <td><span class="estado estado--${n.estado}">${ETIQUETA[n.estado] || n.estado}</span></td>
        <td>${NW.formatFecha(n.fecha)}</td>
        <td><div class="acciones">
          <button type="button" class="btn-icono" data-editar="${n.id}" aria-label="Editar ${NW.esc(n.titulo)}">${NW.icono("lapiz")}</button>
          <button type="button" class="btn-icono btn-icono--peligro" data-eliminar="${n.id}" aria-label="Eliminar ${NW.esc(n.titulo)}">${NW.icono("papelera")}</button>
        </div></td>
      </tr>`).join("")
      : `<tr><td colspan="5" style="text-align:center;color:var(--apagado);padding:32px">No hay noticias que coincidan.</td></tr>`;

    const hasta = desde + visibles.length;
    pie.textContent = lista.length ? `Mostrando ${desde + 1}–${hasta} de ${lista.length}` : "Sin resultados";
    btnPrev.disabled = estado.pagina <= 1;
    btnNext.disabled = estado.pagina >= paginas;
  }

  function refrescar() { pintarStats(); pintarTabla(); }

  /* ---------- Formulario ---------- */
  function mensaje(texto, tipo) {
    estadoForm.className = "mensaje" + (tipo ? " mensaje--" + tipo : "");
    estadoForm.textContent = texto;
  }
  function limpiarErrores() {
    form.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));
    form.querySelectorAll(".error").forEach(el => (el.textContent = ""));
  }
  function salirDeEdicion() {
    estado.editando = null;
    form.reset();
    limpiarErrores();
    tituloForm.textContent = "Crear noticia";
    btnCancelar.hidden = true;
  }
  function error(campo, texto) {
    form.elements[campo].setAttribute("aria-invalid", "true");
    document.getElementById("error-" + campo).textContent = texto;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    limpiarErrores();
    mensaje("");
    const f = form.elements;
    const datos = {
      titulo: f.titulo.value.trim(),
      categoria: f.categoria.value,
      imagen: f.imagen.value.trim(),
      descripcion: f.descripcion.value.trim(),
      contenido: f.contenido.value.trim(),
      estado: f.estado.value
    };

    let primero = null;
    const falla = (campo, texto) => { error(campo, texto); primero = primero || campo; };
    if (datos.titulo.length < 5) falla("titulo", "El título debe tener al menos 5 caracteres.");
    if (!datos.categoria) falla("categoria", "Selecciona una categoría.");
    if (datos.imagen && !NW.imgSegura(datos.imagen)) falla("imagen", "Usa una URL que empiece por http(s):// o una ruta como img/foto.jpg.");
    if (datos.descripcion.length < 10) falla("descripcion", "Escribe un resumen de al menos 10 caracteres.");
    if (datos.contenido.length < 20) falla("contenido", "El contenido debe tener al menos 20 caracteres.");
    if (primero) { f[primero].focus(); return; }

    const lista = NW.noticias();
    const palabras = datos.contenido.split(/\s+/).length;
    const lectura = Math.max(1, Math.round(palabras / 200));
    let texto;

    if (estado.editando) {
      const i = lista.findIndex(n => n.id === estado.editando);
      if (i === -1) { mensaje("La noticia ya no existe.", "error"); salirDeEdicion(); refrescar(); return; }
      lista[i] = { ...lista[i], ...datos, lectura };
      texto = "Noticia actualizada correctamente.";
    } else {
      lista.push({
        id: NW.siguienteId(), fecha: NW.hoyISO(), autor: "Alex Morgan", cargo: "Editor",
        lectura, puntos: [], temas: [], ...datos
      });
      texto = "Noticia guardada correctamente.";
    }

    if (!NW.guardarNoticias(lista)) { mensaje("No se pudo guardar en este navegador.", "error"); return; }
    salirDeEdicion();
    estado.pagina = 1;
    refrescar();
    mensaje(texto, "ok");
  });

  btnCancelar.addEventListener("click", () => { salirDeEdicion(); mensaje(""); });

  /* ---------- Acciones de la tabla ---------- */
  tbody.addEventListener("click", e => {
    const ed = e.target.closest("[data-editar]");
    const el = e.target.closest("[data-eliminar]");
    if (ed) {
      const n = NW.noticiaPorId(ed.dataset.editar);
      if (!n) return;
      const f = form.elements;
      f.titulo.value = n.titulo; f.categoria.value = n.categoria; f.imagen.value = n.imagen || "";
      f.descripcion.value = n.descripcion; f.contenido.value = n.contenido; f.estado.value = n.estado;
      estado.editando = n.id;
      limpiarErrores();
      tituloForm.textContent = `Editar noticia ${NW.codigo(n)}`;
      btnCancelar.hidden = false;
      mensaje("");
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      f.titulo.focus({ preventScroll: true });
    }
    if (el) {
      const n = NW.noticiaPorId(el.dataset.eliminar);
      if (!n || !confirm(`¿Eliminar "${n.titulo}"? Esta acción no se puede deshacer.`)) return;
      NW.guardarNoticias(NW.noticias().filter(x => x.id !== n.id));
      NW.quitarFavorito(n.id);
      if (estado.editando === n.id) salirDeEdicion();
      refrescar();
      mensaje("Noticia eliminada.", "ok");
    }
  });

  buscador.addEventListener("input", () => { estado.pagina = 1; pintarTabla(); });
  filtroEstado.addEventListener("change", () => { estado.pagina = 1; pintarTabla(); });
  btnPrev.addEventListener("click", () => { estado.pagina--; pintarTabla(); });
  btnNext.addEventListener("click", () => { estado.pagina++; pintarTabla(); });

  refrescar();
});
