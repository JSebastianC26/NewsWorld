/* NewsWorld - Contacto: validación del formulario y confirmación en pantalla */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formContacto");
  const estado = document.getElementById("estadoContacto");
  const campos = {
    nombre: { el: form.elements.nombre, msg: "Escribe tu nombre completo." },
    email: { el: form.elements.email, msg: "Escribe un correo válido, por ejemplo nombre@ejemplo.com." },
    mensaje: { el: form.elements.mensaje, msg: "Cuéntanos cómo podemos ayudarte (mínimo 10 caracteres)." }
  };

  function valido(nombre, valor) {
    valor = valor.trim();
    if (nombre === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
    if (nombre === "mensaje") return valor.length >= 10;
    return valor.length >= 2;
  }
  function marcar(nombre) {
    const { el, msg } = campos[nombre];
    const ok = valido(nombre, el.value);
    el.setAttribute("aria-invalid", String(!ok));
    document.getElementById("error-" + nombre).textContent = ok ? "" : msg;
    return ok;
  }

  Object.keys(campos).forEach(n =>
    campos[n].el.addEventListener("blur", () => marcar(n)));

  form.addEventListener("submit", e => {
    e.preventDefault();
    estado.className = "mensaje";
    estado.textContent = "";
    const resultados = Object.keys(campos).map(marcar);
    if (resultados.includes(false)) {
      const primero = Object.keys(campos).find(n => !valido(n, campos[n].el.value));
      campos[primero].el.focus();
      return;
    }
    const ok = NW.guardarMensaje({
      nombre: form.elements.nombre.value.trim(),
      email: form.elements.email.value.trim(),
      mensaje: form.elements.mensaje.value.trim()
    });
    estado.className = "mensaje " + (ok ? "mensaje--ok" : "mensaje--error");
    estado.textContent = ok
      ? "¡Gracias! Tu mensaje fue enviado. Responderemos en un plazo de dos días hábiles."
      : "No pudimos guardar tu mensaje. Inténtalo de nuevo.";
    if (ok) {
      form.reset();
      Object.keys(campos).forEach(n => campos[n].el.removeAttribute("aria-invalid"));
    }
  });
});
