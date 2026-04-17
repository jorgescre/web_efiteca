# 🚀 PROMPT MAESTRO: EXPANSIÓN DE PÁGINAS EFITECA (DISEÑO & UI KIT)

**Objetivo:** Crear y estandarizar las páginas faltantes de Efiteca (Aviso Legal, Protección de Datos, Política de Cookies, Canal Ético, Nueva Reclamación, 404 y Blog Interno) utilizando el sistema de diseño existente y siguiendo estrictamente el documento `README-UI-KIT.md`.

---

## 🛠 REFERENCIAS OBLIGATORIAS
1. **`README-UI-KIT.md`**: Fuente de verdad absoluta para colores, tipografía, espaciados, sombras y componentes.
2. **`ReactHome.tsx`**: Referencia de implementación real para componentes como `Frame115`, `FaqSection` y `ContactForm`.
3. **`ReactSolutionsPage.tsx`**: Referencia para layouts de servicios y comparativas.

---

## 🎨 RESUMEN KEY DESIGN (Extraído de UI KIT)
- **Colores:** Púrpura (`#8949ff`), Amarillo Acción (`#fcc63d`), Negro Base (`#080813`).
- **Gutter Global:** Mobile: 20px | Tablet: 40px | Desktop: 64px | Max: 80px.
- **Max-Width:** 1460px para el contenido principal.
- **Botón:** Estilo "Pill" completo con sombra/glow amarillo visible (`0 25px 50px rgba(252, 198, 1, 0.3)`).

---

## 📋 FLUJO DE EJECUCIÓN (12 FASES)

### FASE 1: Descubrimiento de Componentes & UI KIT
Lee detenidamente `README-UI-KIT.md`. Analiza cómo se implementan los tokens de color y espaciado en `ReactHome.tsx`.
**🏁 CIERRE FASE 1:** Realizar un rápido QA mental de los componentes identificados. **RELEER este Master Prompt** antes de pasar a la Fase 2.

### FASE 2: Definición de Esquemas (TinaCMS)
Verifica `tina/config.ts`. Prepara las colecciones para las nuevas páginas (Aviso Legal, Protección de Datos, Política de Cookies, Canal Ético, Nueva Reclamación).
**🏁 CIERRE FASE 2:** Validar que los campos coincidan con los textos del apéndice. **RELEER este Master Prompt** antes de pasar a la Fase 3.

### FASE 3: Creación de Contenido Legal (Archivos MD)
Genera los archivos `.md` en `src/content/pages/` para:
- `aviso-legal-es.md`
- `proteccion-de-datos-es.md`
- `politica-de-cookies-es.md`
- `canal-etico-es.md`
- `nueva-reclamacion-es.md`
Usa los textos exactos del Apéndice de Datos.
**🏁 CIERRE FASE 3:** Verificar que no falte ningún texto oficial. **RELEER este Master Prompt** antes de pasar a la Fase 4.

### FASE 4: Componente React para Páginas de Texto (`ReactPolicyPage.tsx`)
Crea un componente React genérico y elegante para las páginas legales. Debe seguir la sección "Espaciado y layout" del UI KIT (80px de ritmo vertical). Usa `prose` de Tailwind pero personalizado con los colores de la marca.
**🏁 CIERRE FASE 4:** Verificar responsividad básica y colores. **RELEER este Master Prompt** antes de pasar a la Fase 5.

### FASE 5: Implementación de Rutas Legales
Configura las rutas Astro en `src/pages/[lang]/` para `aviso-legal`, `proteccion-de-datos` y `politica-de-cookies`, importando el componente de la Fase 4.
**🏁 CIERRE FASE 5:** Probar navegación interna. **RELEER este Master Prompt** antes de pasar a la Fase 6.

### FASE 6: Diseño y Lógica del Canal Ético y Reclamación
Reutiliza la lógica de `ContactForm`. Sigue las reglas de "Formularios" del UI KIT: labels claros, inputs blancos, radio 6px, y el CTA amarillo de cierre. Implementa el formulario de "Nueva Reclamación" con el campo de adjuntar archivo.
**🏁 CIERRE FASE 6:** Validar validación de campos. **RELEER este Master Prompt** antes de pasar a la Fase 7.

### FASE 7: Página 404 Estilo Efiteca
Diseña `404.astro`. Usa un hero con el gradiente violeta oficial. Debe ser impactante y ofrecer un botón "Volver al inicio" con el estilo "Pill" amarillo.
**🏁 CIERRE FASE 7:** Verificar visuales 404. **RELEER este Master Prompt** antes de pasar a la Fase 8.

### FASE 8: Estructura de Blog Interno (Layout Premium)
Crea `ReactBlogPost.tsx` para artículos de ~1200 palabras. Incluye Hero de impacto, Sticky TOC (índice), bloques de imágenes intercalados y sección de "Posts relacionados".
**🏁 CIERRE FASE 8:** Verificar legibilidad long-form. **RELEER este Master Prompt** antes de pasar a la Fase 9.

### FASE 9: Conectividad de Datos del Blog
Asegura que las rutas `src/pages/[lang]/news/[slug].astro` rendericen el nuevo diseño de la Fase 8.
**🏁 CIERRE FASE 9:** Probar slugs del blog. **RELEER este Master Prompt** antes de pasar a la Fase 10.

### FASE 10: Responsividad y Breakpoints
Aplica estrictamente los breakpoints: `md: 768px` y `xl: 1280px`. Verifica que los botones en mobile usen `width: 100%`.
**🏁 CIERRE FASE 10:** QA en inspeccionador (mobile/desktop). **RELEER este Master Prompt** antes de pasar a la Fase 11.

### FASE 11: Auditoría SEO y Meta Tags
Asegura que cada página tenga su `Title Tag` y `Meta Description` única.
**🏁 CIERRE FASE 11:** Check de etiquetas head. **RELEER este Master Prompt** antes de pasar a la Fase 12.

### FASE 12: Verificación Final y Build
Ejecuta `npm run build`. Verifica visualmente que no se hayan introducido colores "legacy".
**🏁 CIERRE FINAL:** Proyecto listo para deploy.

---

## 📂 APÉNDICE DE DATOS (TEXTOS PARA PÁGINAS)

### 1. TEXTO: AVISO LEGAL
**Contenido:**
El presente Aviso Legal regula el acceso, navegación y uso del sitio web (en adelante el sitio Web).

La titularidad de este dominio y de la marca asociada corresponde a SUNCAPITAL MANAGEMENT, S.L., con NIF B85093060 y dirección en C/ d’Aragó, 383, Pl. 5ª, 08013, Barcelona. No obstante, determinados servicios ofrecidos en este sitio web, en particular los relacionados con la intermediación de crédito inmobiliario, son prestados por SUNCAPITAL VALUE ADDED I, S.L., con CIF B56619307 y domicilio en C/ Condesa Trifaldi 46, 28034 – Madrid, (sociedad dependiente de SUNCAPITAL MANAGEMENT, S.L).,  inscrita en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España con número E377 , ( pueden comprobar la inscripción en https://app.bde.es/rbe_spa/#/home  )y en el Registro Estatal de Empresas de Intermediación Financiera  con número 1165/2025 de la sección segunda.
SUNCAPITAL MANAGEMENT, S.L. está inscrita en el Registro Mercantil de Madrid en el Tomo 24869, Folio 209, Sección 8, Hoja M 447709.
Puede contactar con nosotros a través de nuestro número de teléfono +34 937 370 596 o mediante el correo electrónico info@efiteca.com.

**Propiedad Intelectual e Industrial**
Los contenidos, diseño gráfico, logotipos, marcas, textos, imágenes, software, código fuente y demás elementos son titularidad de SUNCAPITAL MANAGEMENT, S.L. o de terceros autorizados. Queda prohibida su reproducción sin autorización expresa.

**Responsabilidad del Contenido**
SUNCAPITAL MANAGEMENT, S.L. no se responsabiliza del mal uso de los contenidos ni de la información en webs de terceros mediante enlaces. La presencia de enlaces tiene finalidad informativa únicamente.

### 2. TEXTO: PROTECCIÓN DE DATOS
**Contenido:**
SUNCAPITAL MANAGEMENT SL se compromete a impulsar el cumplimiento de los principios de responsabilidad activa establecidos en el RGPD mediante un proceso de mejora continua.

**Identidad del responsable:** SUNCAPITAL MANAGEMENT SL, NIF B85093060, C/ d’Aragó, 383, Barcelona.
**Delegado de Protección de Datos:** privacidad@efiteca.com

**Finalidad:** Gestión de relaciones con clientes/proveedores, servicios hipotecarios y comunicaciones comerciales (si se autoriza).
**Derechos:** Acceso, rectificación, supresión, limitación y portabilidad. Reclamaciones ante la AEPD (www.aepd.es).

### 3. TEXTO: POLÍTICA DE COOKIES
**Contenido:**
Este sitio web utiliza cookies técnicas para la sesión, cookies de personalización (idioma, preferencias) y cookies de terceros (Google Maps, Vimeo).

| Cookie | Clasificación | Proveedor | Finalidad |
| :--- | :--- | :--- | :--- |
| Suncapital | Técnica | Suncapital | Gestión de sesión. |
| cookie_notice_accepted | Técnica | Suncapital | Estado de aceptación. |
| pll_language | Personalización | Suncapital | Idioma elegido. |
| NID | Técnica | Google | Mapas de localización. |
| _cf_bm / vuid | Técnica | Vimeo | Reproducción de videos. |

**Desactivación:** El usuario puede configurar su navegador (Chrome, Firefox, Edge, Safari) para bloquear o eliminar cookies en cualquier momento.

### 4. TEXTO: CANAL ÉTICO Y RECLAMACIONES
**Contenido:**
Procedimiento para la resolución de quejas y reclamaciones. El servicio es gestionado por SUNCAPITAL VALUE ADDED I, S.L., inscrita en el Registro del Banco de España (E377).

- **Presentación:** Por correo electrónico a `reclamaciones_value@suncapital.es` o correo postal a Calle Aragón 383, Barcelona.
- **Requisitos:** Nombre, DNI, motivo claro, declaración de no haber iniciado procesos judiciales previos.
- **Plazos:** Acuse de recibo en 5 días hábiles. Resolución en un máximo de 1 mes.
- **Independencia:** El Área de Resolución es autónoma de los servicios comerciales.

### 5. ESTRUCTURA: NUEVA RECLAMACIÓN (FORMULARIO)
**Título:** Envíanos tu Reclamación
**Campos:** Nombre, Apellidos, Correo, Relación con la empresa, Detalle reclamación (Textarea), Seleccionar archivo.
**Estilo:** Botón Pill Púrpura/Amarillo.

### 6. CONCEPTO: PÁGINA 404
**Copy:** "¡Ups! Esta página se quedó fuera de mercado."
**CTA:** "Volver al Inicio" (Amarillo Pill) y "Ver Soluciones" (Outline Púrpura).

### 7. CONCEPTO: MEJORA BLOG INTERNO (LONG-FORM)
**Métricas:** ~1200 palabras, ancho 800-900px.
**Elementos:** Hero Full-width, Sticky TOC lateral, Bloques de imágenes de alta calidad (viviendas, oficinas), Newsletter Block vibrante y Cards de "Posts Relacionados".

---

## 🚫 REGLAS DE ORO
1. **NO ALUCINAR:** Fidelidad total al UI KIT y al lenguaje visual de `ReactHome.tsx`.
2. **BOTONES:** Sombra obligatoria `shadow-[0px_25px_50px_0px_rgba(252,198,61,0.3)]`.
3. **TEXTO:** No usar Lorem Ipsum. Usar los textos oficiales provistos.
4. **CICLO DE QA Y REVISION:** Obligatorio: Al término de cada una de las fases, realiza siempre un QA rápido de tu trabajo comparándolo con el UI KIT (revisa saltos de color, tipografía y márgenes). Una vez terminado el QA, **DEBES REVISAR ESTE ARCHIVO MAESTRO DE NUEVO** para refrescar contexto y no alucinar en la siguiente fase.
