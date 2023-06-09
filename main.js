// ELEMENTOS OBTENIDOS DEL DOM

const cardProductosConteiner = document.querySelector(".cards__productos");
const buttonVerMas = document.querySelector(".buttons__vermas");
const contenedorCategoria = document.querySelector(".filter__productos");
const buttonFilter = document.querySelectorAll(".categoria");
const menuResponsiveImg = document.getElementById("menulabel");
const menuResponsive = document.querySelector(".ulnav");
const carritoContenedorImg = document.querySelector(
  ".carrito__compras__imagen"
);
const carritoContenedor = document.querySelector(
  ".carrito__compras__conteiner"
);
const carritoItem = document.querySelector(".card__carrito");
const buttonIngreso = document.querySelector(".ingreso__button");
const buttonCrearCuenta = document.querySelector(".crear__cuenta__button");
const logoHome = document.getElementById("logoepa");
const totalCarrito = document.querySelector(".total__carrito");
const cantidadCarritoImg = document.querySelector(
  ".cantidad__carrito__conteiner"
);
const buttonComprar = document.querySelector(".button__comprar");
const buttonVaciar = document.querySelector(".button__vaciar");
const alerta = document.querySelector(".cartel__alert");
const contenidoCartelAlert = document.querySelector(
  ".contenido__cartel__alert"
);
const datosContacto = document.querySelector(".contactomain");
const footer = document.querySelector(".link__github");
const alertProductoCard = document.querySelector(
  ".conteiner__alert__producto__agregado__carrito"
);

const buttonLogin = document.querySelector(".button__login");
const buttonSalirCuenta = document.querySelector(".salir__cuenta");
const nombreCuentaSpan = document.querySelector(".nombre__cuenta");
const miCuentaButton = document.querySelector(".mi__cuenta");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarItemCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const guardarUsuario = () => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

// funcion para desactivar carrito y menu resposive con click en pantalla

const funcionMenusWindowsScrolls = () => {
  if (
    !menuResponsive.classList.contains("ulnav__active") &&
    !carritoContenedor.classList.contains("carrito__compras__flex")
  ) {
    return;
  }
  menuResponsive.classList.remove("ulnav__active");
  carritoContenedor.classList.remove("carrito__compras__flex");
};
// funcion para el boton de carrito

const carritoManejo = () => {
  carritoContenedor.classList.toggle("carrito__compras__flex");

  if (menuResponsive.classList.contains("ulnav__active")) {
    menuResponsive.classList.remove("ulnav__active");
    return;
  }
};
// FUNCION PARA EL BOTON DE MENU RESPONSIVE
const MenuResposiveManejo = (e) => {
  menuResponsive.classList.toggle("ulnav__active");
  if (carritoContenedor.classList.contains("carrito__compras__flex")) {
    carritoContenedor.classList.remove("carrito__compras__flex");
    return;
  }
};

// FUNCION PARA FORMAR EL CONTENEDOR EN CADA PRODUCTO DEL ARRAY

const cardProducto = (productos) => {
  const { nombre, imagen, precio, id } = productos;
  return `
<div class="card__producto__solo">
<h2>${nombre.toUpperCase()}</h2>
<div class="imagenes__producto efecto">
${imagen
  .map((e) => {
    return `<img src="${e}" alt="" />`;
  })
  .join("")}
</div>

<h3 class="precio__producto"> Precio:$${precio}</h3>
<button class="agregar__producto__carrito" data-id =${id} data-nombre="${nombre}" data-precio =${precio} data-imagen="${
    imagen[0]
  }">Agregar al carrito</button>

</div>
`;
};

// FUNCION PARA RENDERIZAR EL ARRAY DE PRODUCTOS

const renderProductos = (e) => {
  cardProductosConteiner.innerHTML += e.map(cardProducto).join("");
};

// FUNCION PARA OBTENER DETENER EL BUCLE DE VER MAS

const ultimoIndiceVerMas = () => {
  return appState.indiceDeBucle === appState.limiteDeProductos - 1;
};

// FUNCION PARA DARLE FUNCIONALIDAD AL BUTTON Y DETENER SU FUNCIONAMIENTO OCULTANDO BUTTON

const verMasProductos = () => {
  appState.indiceDeBucle += 1;
  let { listaProductos, indiceDeBucle } = appState;
  renderProductos(listaProductos[indiceDeBucle]);
  if (ultimoIndiceVerMas()) {
    buttonVerMas.classList.add("oculto");
  }
};

// FUNCION PARA DETENERMINAR SI EL BUTTON ESTA DESACTIVADO

const buttonIncativo = (e) => {
  return (
    e.classList.contains("categoria") && !e.classList.contains("button__activo")
  );
};

// FUNCION PARA CAMBIAR EL ESTILO DEL BUTTON ACTIVADO

const cambioEstilosButtonActivado = (categoriaSeleccionada) => {
  const buttonList = [...buttonFilter];
  buttonList.forEach((button) => {
    if (button.dataset.categoria !== categoriaSeleccionada) {
      button.classList.remove("button__activo");
      return;
    }
    button.classList.add("button__activo");
  });
};

// FUNCION PARA OCULTAR EL BUTTON VER MAS EN FILTRO

const mostrarVerMasEnFiltro = () => {
  if (!appState.estadoFiltro) {
    console.log(!appState.estadoFiltro);
    buttonVerMas.classList.remove("oculto");
    return;
  }
  buttonVerMas.classList.add("oculto");
  return;
};
// FUNCION PARA CAMBIAR EL ESTADO DEL BUTTON Y DESACTIVAR EL BUTTON DE VER MAS

const cambioEstado = (button) => {
  appState.estadoFiltro = button.dataset.categoria;
  cambioEstilosButtonActivado(appState.estadoFiltro);
  mostrarVerMasEnFiltro();
};
// FUNCION PARA RENDERIZAR SOLO LOS PRODUCTOS FILTRADOS

const renderProductosFiltrados = () => {
  const productosFiltados = productos.filter((producto) => {
    return producto.categoria === appState.estadoFiltro;
  });

  renderProductos(productosFiltados);
};

// FUNCION PARA APLICAR EL FILTRO A LOS PRODUCTOS RENDERIZADOS TOTALES

const aplicarFiltro = ({ target }) => {
  if (!buttonIncativo(target)) {
    return;
  }
  cambioEstado(target);
  cardProductosConteiner.innerHTML = "";
  if (appState.estadoFiltro) {
    renderProductosFiltrados();
    appState.indiceDeBucle = 0;

    return;
  }
  renderProductos(appState.listaProductos[0]);
  return;
};
// FUNCION PARA REDIRIGR BUTTONS
const redigirButton = ({ target }) => {
  window.location.href = target.dataset.href;
};
// FORMADOR DE TEMPLATE
const carritotemplate = (productos) => {
  const { nombre, precio, id, cantidad, imagen } = productos;
  return `<div class="item__carrito">
    <div class="item__carrito__info"> 
            <h3 class="titulo__item__carrito">${nombre}</h3> 
            <img src="${imagen}" alt="${nombre}" class ="imagen__carrito"/>
            <span class="precio__item__carrito">$${precio}</span> 
          
    </div> 
    <div class="manejar__cantidad"> 
            <button class="button__cantidad__carrito restar" data-id="${id}">-</button> 
            <span class="actual__cantidad">${cantidad}</span> 
            <button class="button__cantidad__carrito sumar" data-id="${id}" data-cantidad=${cantidad}>+</button> 
    </div> 
    </div>
        `;
};
// FUNCION RENDER DE CARRITO
const renderCarrito = () => {
  if (!carrito.length) {
    carritoItem.innerHTML = `<p class="mensaje__carrito__vacio"> No hay articulos cargado en el carrito. (por el momento &#128521 ) </p>`;

    return;
  }
  return (carritoItem.innerHTML = carrito.map(carritotemplate).join(""));
};
// FUNCION PARA CALCULO DE CARRITO
const calculoTotalCarrito = () => {
  return carrito.reduce((acumulador, valor) => {
    return acumulador + Number(valor.precio) * Number(valor.cantidad);
  }, 0);
};
// ACTUALIZAR BURBUJA DEL CARRITO
const actualizarCantidadCarritoImg = () => {
  cantidadCarritoImg.innerHTML = carrito.reduce((acumulador, valor) => {
    return acumulador + valor.cantidad;
  }, 0);
};
// RENDERIZAR EL TOTAL DE CARRITO
const renderTotalCarrito = () => {
  totalCarrito.innerHTML = `$${calculoTotalCarrito().toFixed(3)}`;
};
// COMPROBAR SI HAY PRODUCTO EN CARRITO
const hayProductoCargadoEnCarrito = (id) => {
  return carrito.find((elemento) => {
    return elemento.id === id;
  });
};
// DESTRUCTURAR CARRITO
const desestructurarProductosCarrito = (producto) => {
  const { id, precio, nombre, imagen } = producto;
  return { id, precio, nombre, imagen };
};
// FUNCION PARA SUMAR PRODUCTOS YA EXISTENTE AL CARRITO
const sumarProductoYaExistente = (producto) => {
  carrito = carrito.map((elemento) => {
    return elemento.id === producto.id
      ? { ...elemento, cantidad: elemento.cantidad + 1 }
      : elemento;
  });
};

// FUNCION PARA RESTAR PRODUCTO EN CARRITO
const manejarRestaProductoCarrito = (id) => {
  const productoExistenteEnCarrito = carrito.find(
    (producto) => producto.id === id
  );

  if (productoExistenteEnCarrito.cantidad === 1) {
    eliminarProductoCarrito(productoExistenteEnCarrito);
    return;
  }
  restarProductoCarrito(productoExistenteEnCarrito);
  return;
};
// ELIMINA EL PRODUCTO RESTAR LA ULTIMA UNIDAD EN CARRITO
const eliminarProductoCarrito = (productoExistenteEnCarrito) => {
  carrito = carrito.filter((producto) => {
    return producto.id !== productoExistenteEnCarrito.id;
  });
  carritoActualizado();
};
// RESTA PRODUCTO DE CARRITO
const restarProductoCarrito = (productoExistenteEnCarrito) => {
  carrito = carrito.map((producto) => {
    return producto.id === productoExistenteEnCarrito.id
      ? { ...producto, cantidad: Number(producto.cantidad) - 1 }
      : producto;
  });
};
// FUNCION PARA SUMAR PRODUCTO EN CARRITO
const manejarSumaProductoCarrito = (id) => {
  const productoExistenteEnCarrito = carrito.find(
    (producto) => producto.id === id
  );
  sumarProductoYaExistente(productoExistenteEnCarrito);
  return;
};
// SUMAR PRODUCTO NUEVO AL CARRITO
const crearProductoEnCarrito = (producto) => {
  carrito = [
    ...carrito,
    {
      ...producto,
      cantidad: 1,
    },
  ];
};
// MANEJAR PRODUCTO EN CARRITO Y ACTUALIZAR
const manejarCantidadCarrito = ({ target }) => {
  if (!target.classList.contains("button__cantidad__carrito")) {
    return;
  }
  if (target.classList.contains("sumar")) {
    manejarSumaProductoCarrito(target.dataset.id);
  }
  if (target.classList.contains("restar")) {
    manejarRestaProductoCarrito(target.dataset.id);
  }
  carritoActualizado();
};
// AGREGAR PRODUCTO AL CARRITO
const agregarProductoAlCarrito = (e) => {
  if (!e.target.classList.contains("agregar__producto__carrito")) {
    return;
  }
  const producto = desestructurarProductosCarrito(e.target.dataset);

  if (hayProductoCargadoEnCarrito(producto.id)) {
    sumarProductoYaExistente(producto);
  } else {
    crearProductoEnCarrito(producto);
  }
  alertProductoCard.classList.add("mostrar");
  setTimeout(() => {
    alertProductoCard.classList.remove("mostrar");
    alertProductoCard.classList.remove("remove");
  }, 2000);
  carritoActualizado();
};
// FUNCION PARA FINALIZAR COMPRA Y FEEDBACK
const finalizarCompra = () => {
  if (!carrito.length) {
    return;
  }
  if (window.confirm("¿Desea finalizar su compra?")) {
    carrito = [];
    contenidoCartelAlert.innerHTML = "Tu compra se realizo con exito";
    alerta.classList.add("mostrar");

    alerta.style.backgroundColor = "var(--verdeepa)";
    setTimeout(() => {
      alerta.classList.remove("mostrar");
      alerta.style.backgroundColor = "";
    }, 3000);

    carritoActualizado();
  }
};
// ELIMINAR  TODOS LOS PRODUCTOS DEL CARRITO Y FEEDBACK
const vaciarCarrito = () => {
  if (!carrito.length) {
    return;
  }
  if (window.confirm("¿Desea vaciar su carrito?")) {
    carrito = [];
    contenidoCartelAlert.innerHTML = "Carrito vaciado con exito";
    alerta.classList.add("mostrar");
    alerta.style.backgroundColor = "red";
    setTimeout(() => {
      alerta.classList.remove("mostrar");
      alerta.style.backgroundColor = "";
    }, 2000);
    carritoActualizado();
  }
};
// REDIRIGIR LINKS
const redirigirLinks = (e) => {
  if (
    !e.target.classList.contains("link__contact") &&
    !e.target.classList.contains("link__github")
  ) {
    return;
  }
  window.location.href = e.target.dataset.href;
};
// CUENTA LOGEADA Y CAMBIO DE STYLES A BUTTONS
const logearCuentaButtons = (e) => {
  nombreCuentaSpan.innerHTML = `${e}`;
  buttonSalirCuenta.classList.add("visible");
  miCuentaButton.classList.add("visible");
  buttonSalirCuenta.classList.remove("hidden");
  miCuentaButton.classList.remove("hidden");
  buttonIngreso.classList.add("hidden");
  buttonCrearCuenta.classList.add("hidden");
};
// CUENTA DESLOGEADA Y CAMBIO DE STYLES A BUTTONS
const deslogearCuentaButtons = () => {
  nombreCuentaSpan.innerHTML = "";
  buttonCrearCuenta.classList.add("visible");
  buttonIngreso.classList.add("visible");
  buttonCrearCuenta.classList.remove("hidden");
  buttonIngreso.classList.remove("hidden");
  buttonSalirCuenta.classList.add("hidden");
  miCuentaButton.classList.add("hidden");
};
// MODIFICA EL ESTADO DE CUENTA A TRUE - (logeado)
const modificarCuentaStateTrue = (emailInputLogin) => {
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
    return usuario.email == emailInputLogin.value;
  });
  cuentaACambiarEstado[0].cuentaLogeada = true;

  logearCuentaButtons();
  guardarUsuario();

  return;
};
// MODIFICAR EL ESTADO DE CUENTA A FALSE (DESLOGEADO)
const modificarCuentaStateFalse = () => {
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
    return usuario.email == nombreCuentaSpan.innerHTML;
  });

  cuentaACambiarEstado[0].cuentaLogeada = false;
  guardarUsuario();
  deslogearCuentaButtons();
  return;
};
// FUNCION PARA DESLOGEAR
const salirUsuario = () => {
  modificarCuentaStateFalse();

};
// CHEQUEO DE CUENTA PARA OBTENER SU ESTADO
const chequeoCuentaLogeada = () => {
  const hayCuentaLogeada = usuarios.filter((usuario) => {
    return usuario.cuentaLogeada == true;
  });
  const emailLogeado = hayCuentaLogeada[0].email;
  logearCuentaButtons(emailLogeado);
};
// FUNCION PARA ACTUALIZAR CARRITO
const carritoActualizado = () => {
  guardarItemCarrito();
  renderCarrito();
  renderTotalCarrito();
  actualizarCantidadCarritoImg();
};

const init = () => {
  renderProductos(appState.listaProductos[appState.indiceDeBucle]);
  document.addEventListener("DOMContentLoaded", renderCarrito);
  document.addEventListener("DOMContentLoaded", renderTotalCarrito);
  buttonVerMas.addEventListener("click", verMasProductos);
  contenedorCategoria.addEventListener("click", aplicarFiltro);
  menuResponsiveImg.addEventListener("click", MenuResposiveManejo);
  carritoContenedorImg.addEventListener("click", carritoManejo);
  window.addEventListener("scroll", funcionMenusWindowsScrolls);
  logoHome.addEventListener("click", redigirButton);
  buttonCrearCuenta.addEventListener("click", redigirButton);
  buttonIngreso.addEventListener("click", redigirButton);
  cardProductosConteiner.addEventListener("click", agregarProductoAlCarrito);
  carritoItem.addEventListener("click", manejarCantidadCarrito);
  buttonComprar.addEventListener("click", finalizarCompra);
  buttonVaciar.addEventListener("click", vaciarCarrito);
  datosContacto.addEventListener("click", redirigirLinks);
  footer.addEventListener("click", redirigirLinks);
  document.addEventListener("DOMContentLoaded", chequeoCuentaLogeada);
  buttonSalirCuenta.addEventListener("click", salirUsuario);

  carritoActualizado();
};

init();
