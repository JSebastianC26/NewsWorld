/* ==========================================================
   NewsWorld - Datos compartidos
   Noticias y favoritos viven en localStorage. Si no hay datos
   guardados, se carga una semilla inicial con contenido de ejemplo.
   ========================================================== */
const NW = (() => {
  const K_NOTICIAS = "nw_noticias_v1";
  const K_FAVORITOS = "nw_favoritos_v1";
  const K_MENSAJES = "nw_mensajes_v1";

  const CATEGORIAS = ["World", "Business", "Technology", "Culture", "Science", "Environment", "Society"];

  const SEMILLA = [
    {
      id: 1, categoria: "Environment", fecha: "2026-09-30", estado: "publicado",
      titulo: "Cómo las ciudades están rediseñando las calles para un futuro más cálido",
      descripcion: "Desde senderos sombreados hasta jardines de lluvia, una nueva generación de proyectos de espacios públicos está haciendo que los barrios urbanos sean más frescos, seguros y conectados.",
      imagen: "img/ciudades-hero.png", autor: "Maya Chen", cargo: "Corresponsal de ciudades", lectura: 8,
      contenido:
        "En el extremo oriental de la ciudad, una amplia avenida, diseñada en su día casi exclusivamente para automóviles, cobra ahora un ritmo diferente. Árboles jóvenes dan sombra a aceras más anchas, jardines de lluvia recogen las aguas pluviales y un antiguo carril de circulación se ha convertido en una vía continua para peatones y ciclistas.\n\n" +
        "El rediseño forma parte de un esfuerzo más amplio para preparar a los barrios densamente poblados ante veranos más largos y calurosos. En lugar de depender de un único proyecto de gran envergadura, los planificadores están combinando pequeñas intervenciones —como zonas de sombra, superficies permeables, asientos públicos y cruces más seguros— para crear una red conectada.\n\n" +
        "> Las calles más exitosas son, al mismo tiempo, infraestructura y espacio público.\n\n" +
        "Los primeros resultados sugieren que los beneficios van más allá de la temperatura. Los negocios locales reportan una mayor afluencia de peatones, los residentes pasan más tiempo al aire libre y las escuelas situadas a lo largo de la ruta disfrutan de entradas más tranquilas. Actualmente, la ciudad está evaluando qué cambios generan el mayor impacto, manzana por manzana.\n\n" +
        "## Diseñar con los residentes, no al margen de ellos\n\n" +
        "La siguiente fase se centrará en vecindarios con menos árboles maduros y menor acceso a parques. Las autoridades señalan que las aportaciones de la comunidad determinarán las características de cada emplazamiento, desde la ubicación de los bancos hasta los horarios habilitados para operaciones de carga y reparto.",
      puntos: ["Manzanas más frescas", "Desplazamientos diarios más seguros", "Diseño liderado por la comunidad"],
      temas: ["Ciudades", "Clima", "Espacio público"]
    },
    {
      id: 2, categoria: "Science", fecha: "2026-09-28", estado: "publicado",
      titulo: "Comienza una nueva era de descubrimientos en las profundidades marinas",
      descripcion: "Los buques de investigación de bajo impacto están revelando ecosistemas extraordinarios sin perturbar hábitats frágiles.",
      imagen: "img/mar-profundo.png", autor: "Daniel Ortiz", cargo: "Editor de ciencia", lectura: 7,
      contenido:
        "A más de tres mil metros de profundidad, una nueva flota de vehículos autónomos recorre el fondo marino con luces tenues y motores casi silenciosos. Su objetivo es observar sin alterar: cada inmersión deja una huella mínima en un entorno que tarda siglos en recuperarse.\n\n" +
        "Los primeros hallazgos incluyen comunidades de esponjas, gusanos tubulares y crustáceos que viven alrededor de fuentes de agua caliente, muchas de ellas desconocidas para la ciencia. Los equipos aseguran que la calidad de las imágenes permite estudiar el comportamiento de las especies sin necesidad de capturarlas.\n\n" +
        "> Ahora podemos mirar sin tocar, y eso lo cambia todo.\n\n" +
        "## Un océano que apenas empezamos a conocer\n\n" +
        "Los investigadores calculan que menos de una cuarta parte del lecho marino ha sido cartografiado con detalle. Los datos abiertos de estas misiones se compartirán con universidades de todo el mundo.",
      puntos: ["Robots de bajo impacto", "Especies aún sin catalogar", "Datos abiertos para la ciencia"],
      temas: ["Océanos", "Biodiversidad", "Tecnología"]
    },
    {
      id: 3, categoria: "Society", fecha: "2026-09-27", estado: "publicado",
      titulo: "Las librerías independientes construyen comunidad",
      descripcion: "En las pequeñas localidades, los libreros locales están ampliando su papel mucho más allá de las estanterías.",
      imagen: "img/libreria.png", autor: "Laura Gómez", cargo: "Reportera de cultura", lectura: 5,
      contenido:
        "Clubes de lectura, talleres para niños y mercados de segunda mano: las librerías independientes se han convertido en puntos de encuentro donde los vecinos se conocen. Para muchos dueños, vender libros es apenas una parte del trabajo.\n\n" +
        "Varias de estas tiendas han formado alianzas con bibliotecas y escuelas para organizar presentaciones de autores locales. Los organizadores dicen que la asistencia se ha duplicado en el último año y que los eventos gratuitos son los más concurridos.\n\n" +
        "> Un libro se vende una vez; una comunidad vuelve cada semana.\n\n" +
        "## Un modelo que se adapta\n\n" +
        "Frente a las plataformas en línea, las librerías apuestan por la recomendación personal y por el vínculo con el barrio, una ventaja que, según sus propietarios, ningún algoritmo puede replicar.",
      puntos: ["Clubes de lectura", "Alianzas con escuelas", "Eventos gratuitos"],
      temas: ["Libros", "Comunidad", "Cultura local"]
    },
    {
      id: 4, categoria: "Business", fecha: "2026-09-30", estado: "publicado",
      titulo: "La energía renovable alcanza un punto de inflexión global",
      descripcion: "La inversión en infraestructura limpia está transformando los planes energéticos nacionales y los mercados laborales locales.",
      imagen: "img/noticia-4.jpg", autor: "Andrés Rojas", cargo: "Editor de economía", lectura: 6,
      contenido:
        "Por primera vez, la inversión mundial en energía solar y eólica supera a la destinada a combustibles fósiles en la mayoría de las grandes economías. Los gobiernos están reescribiendo sus planes energéticos a diez años.\n\n" +
        "El cambio también se nota en el empleo: instaladores, técnicos de mantenimiento y operadores de redes inteligentes son algunos de los perfiles más buscados.\n\n" +
        "## El reto de la red eléctrica\n\n" +
        "Los expertos advierten que el almacenamiento y la modernización de las redes serán decisivos para que la transición sea estable y asequible.",
      puntos: ["Inversión récord", "Nuevos empleos", "Redes más inteligentes"], temas: ["Energía", "Economía"]
    },
    {
      id: 5, categoria: "Environment", fecha: "2026-09-30", estado: "publicado",
      titulo: "Los pueblos costeros restauran sus defensas naturales",
      descripcion: "Las comunidades reconstruyen humedales para reducir las inundaciones y, al mismo tiempo, crear hábitat para la fauna silvestre.",
      imagen: "img/noticia-5.jpg", autor: "Maya Chen", cargo: "Corresponsal de ciudades", lectura: 6,
      contenido:
        "Manglares, dunas y marismas vuelven a ocupar lugares que durante décadas fueron rellenados para construir. Los habitantes de varios pueblos costeros han comprobado que estas barreras naturales amortiguan mejor las tormentas que un muro de concreto.\n\n" +
        "> La naturaleza también es infraestructura.\n\n" +
        "Los proyectos, financiados en parte por fondos climáticos, incluyen jornadas de siembra abiertas a voluntarios y programas de monitoreo con estudiantes.",
      puntos: ["Humedales restaurados", "Menos inundaciones"], temas: ["Costas", "Clima"]
    },
    {
      id: 6, categoria: "Technology", fecha: "2026-09-29", estado: "publicado",
      titulo: "Cómo los equipos pequeños usan la IA de forma más responsable",
      descripcion: "Una mirada práctica a las salvaguardas que surgen dentro de startups y estudios independientes.",
      imagen: "img/noticia-6.jpg", autor: "Sofía Herrera", cargo: "Reportera de tecnología", lectura: 5,
      contenido:
        "Sin departamentos legales ni comités de ética, los equipos pequeños han desarrollado sus propias reglas: revisar siempre los resultados antes de publicarlos, documentar qué datos se usan y ser claros con los usuarios sobre cuándo interviene una máquina.\n\n" +
        "## Prácticas simples, gran efecto\n\n" +
        "Listas de verificación compartidas, pruebas con usuarios reales y registros de decisiones son algunas de las herramientas más habituales.",
      puntos: ["Revisión humana", "Transparencia con usuarios"], temas: ["IA", "Startups"]
    },
    {
      id: 7, categoria: "Society", fecha: "2026-09-29", estado: "publicado",
      titulo: "Las bibliotecas se convierten en el nuevo centro del aprendizaje continuo",
      descripcion: "Nuevos programas ayudan a los residentes a aprender habilidades, acceder a servicios y conocer a sus vecinos.",
      imagen: "img/noticia-7.jpg", autor: "Laura Gómez", cargo: "Reportera de cultura", lectura: 4,
      contenido:
        "Cursos de programación, asesoría laboral y talleres de idiomas se suman a los préstamos de libros. Las bibliotecas públicas buscan responder a una población que necesita reciclarse a lo largo de toda la vida.\n\n" +
        "Muchas ofrecen además espacios de trabajo, acceso gratuito a internet y actividades intergeneracionales."
      , puntos: [], temas: ["Educación", "Comunidad"]
    },
    {
      id: 8, categoria: "Culture", fecha: "2026-09-28", estado: "publicado",
      titulo: "Una nueva generación reinventa las tradiciones gastronómicas regionales",
      descripcion: "Jóvenes chefs combinan técnicas heredadas con ingredientes locales e ideas contemporáneas.",
      imagen: "img/noticia-8.jpg", autor: "Daniel Ortiz", cargo: "Editor de cultura", lectura: 5,
      contenido:
        "En cocinas pequeñas y con menús cortos, una generación de cocineros rescata recetas de sus abuelas y las lleva a formatos nuevos. El foco está en el productor local y en la temporada.\n\n" +
        "> Cocinar es una forma de conservar la memoria.\n\n" +
        "Varios de estos restaurantes trabajan directamente con agricultores de la región para garantizar precios justos."
      , puntos: [], temas: ["Gastronomía", "Tradición"]
    },
    {
      id: 9, categoria: "Science", fecha: "2026-09-28", estado: "publicado",
      titulo: "Un telescopio de nueva generación traza el mapa de un mundo cercano",
      descripcion: "Los investigadores han reunido el perfil atmosférico más nítido hasta ahora de un planeta distante.",
      imagen: "img/noticia-9.jpg", autor: "Andrés Rojas", cargo: "Editor de ciencia", lectura: 6,
      contenido:
        "Con un espejo de más de treinta metros, el nuevo observatorio ha podido separar la luz de un planeta de la de su estrella y analizar los gases que lo rodean. Los datos apuntan a nubes de vapor y trazas de compuestos poco comunes.\n\n" +
        "## Lo que viene\n\n" +
        "Los equipos planean observar otros diez mundos durante el próximo año."
      , puntos: [], temas: ["Astronomía"]
    },
    {
      id: 10, categoria: "Business", fecha: "2026-09-29", estado: "borrador",
      titulo: "Mercados emergentes ante un nuevo ciclo de tasas de interés",
      descripcion: "Borrador: análisis de cómo las decisiones de los bancos centrales afectan a las economías emergentes.",
      imagen: "", autor: "Alex Morgan", cargo: "Editor", lectura: 4,
      contenido: "Texto en preparación.", puntos: [], temas: []
    },
    {
      id: 11, categoria: "World", fecha: "2026-09-28", estado: "revision",
      titulo: "Las delegaciones se reúnen para una cumbre climática decisiva",
      descripcion: "En revisión editorial: qué está en juego en las negociaciones de esta semana.",
      imagen: "", autor: "Alex Morgan", cargo: "Editor", lectura: 5,
      contenido: "Texto en revisión.", puntos: [], temas: []
    }
  ];

  /* ---------- Almacenamiento ---------- */
  function leer(clave, porDefecto) {
    try {
      const bruto = localStorage.getItem(clave);
      return bruto ? JSON.parse(bruto) : porDefecto;
    } catch (e) { return porDefecto; }
  }
  function escribir(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); return true; }
    catch (e) { return false; }
  }

  function noticias() {
    let lista = leer(K_NOTICIAS, null);
    if (!Array.isArray(lista)) {
      lista = SEMILLA.map(n => ({ ...n }));
      escribir(K_NOTICIAS, lista);
    }
    return lista;
  }
  function guardarNoticias(lista) { return escribir(K_NOTICIAS, lista); }
  function noticiaPorId(id) { return noticias().find(n => n.id === Number(id)) || null; }
  function siguienteId() { return noticias().reduce((m, n) => Math.max(m, n.id), 0) + 1; }
  function codigo(n) { return "NW-" + (200 + n.id); }

  /* ---------- Favoritos: [{ id, fecha }] ---------- */
  function favoritos() {
    const ids = new Set(noticias().map(n => n.id));
    return leer(K_FAVORITOS, []).filter(f => ids.has(f.id));
  }
  function esFavorito(id) { return favoritos().some(f => f.id === Number(id)); }
  function quitarFavorito(id) {
    guardarFavoritos(leer(K_FAVORITOS, []).filter(f => f.id !== Number(id)));
  }
  function guardarFavoritos(lista) { return escribir(K_FAVORITOS, lista); }
  /* Devuelve true si quedó guardada, false si se quitó */
  function alternarFavorito(id) {
    id = Number(id);
    if (esFavorito(id)) { quitarFavorito(id); return false; }
    const lista = leer(K_FAVORITOS, []);
    lista.push({ id, fecha: hoyISO() });
    guardarFavoritos(lista);
    return true;
  }

  /* ---------- Mensajes de contacto ---------- */
  function guardarMensaje(m) {
    const lista = leer(K_MENSAJES, []);
    lista.push({ ...m, fecha: new Date().toISOString() });
    return escribir(K_MENSAJES, lista);
  }

  /* ---------- Utilidades ---------- */
  function hoyISO() {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${mm}-${dd}`;
  }
  function formatFecha(iso, largo) {
    const [a, m, d] = String(iso).split("-").map(Number);
    if (!a) return "";
    const fecha = new Date(a, m - 1, d);
    return fecha.toLocaleDateString("es", largo
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "numeric", month: "short", year: "numeric" });
  }
  function esc(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  /* Solo se aceptan rutas relativas o http(s) para las imágenes */
  function imgSegura(url) {
    url = String(url || "").trim();
    if (!url) return "";
    if (/^(https?:\/\/|img\/|\.\/|\/)/i.test(url)) return url;
    return "";
  }
  function normalizar(t) {
    return String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function icono(nombre, extra) {
    return `<svg class="icono" ${extra || ""} aria-hidden="true"><use href="#i-${nombre}"/></svg>`;
  }
  function imagenHTML(url, alt) {
    const src = imgSegura(url);
    return `<div class="imagen">${src ? `<img src="${esc(src)}" alt="${esc(alt || "")}" loading="lazy" onerror="this.remove()">` : ""}</div>`;
  }
  /* Más recientes primero */
  function ordenarRecientes(lista) {
    return [...lista].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  }

  return {
    CATEGORIAS, noticias, guardarNoticias, noticiaPorId, siguienteId, codigo,
    favoritos, esFavorito, quitarFavorito, alternarFavorito, guardarMensaje,
    hoyISO, formatFecha, esc, imgSegura, normalizar, icono, imagenHTML, ordenarRecientes
  };
})();
