const menuResponsiveImg = document.getElementById("menulabel");
const menuResponsive = document.querySelector(".ulnav");
const carritoContenedorImg = document.querySelector(".carrito__compras__imagen");
const carritoContenedor = document.querySelector(".carrito__compras__conteiner");
const buttonIngreso = document.querySelector(".ingreso__button");
const buttonCrearCuenta = document.querySelector(".crear__cuenta__button");
const logoHome = document.getElementById("logoepa");
const carritoItem = document.querySelector(".card__carrito");
const buttonComprar = document.querySelector(".button__comprar");
const buttonVaciar = document.querySelector(".button__vaciar");
const totalCarrito = document.querySelector(".total__carrito");
const contenidoCartelAlert = document.querySelector(".cartel__alert");
const footer = document.querySelector(".link__github");
const alerta = document.querySelector(".cartel__alert");
const contenidoCartelAlertLogin = document.querySelector(".contenido__cartel__alert__login");
const cantidadCarritoImg = document.querySelector(".cantidad__carrito__conteiner");
const formLogin = document.querySelector(".form__login");
const buttonLogin = document.querySelector(".button__login");
const emailInputLogin = document.querySelector(".email__input__login");
const contraseñaInputLogin = document.querySelector(".contraseña__input__login");
const smallErrorEmailLogin = document.querySelector(".email__error__login");
const smallErrorPassLogin = document.querySelector(".password__error__login");
const buttonSalirCuenta = document.querySelector(".salir__cuenta");
const nombreCuentaSpan = document.querySelector(".nombre__cuenta");
const miCuentaButton = document.querySelector(".mi__cuenta");
const home = document.getElementById("home")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarItemCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const guardarUsuario = () => {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
};

// FUNCION PARA EL BOTON DE MENU RESPONSIVE
const MenuResposiveManejo = (e) => {
  menuResponsive.classList.toggle("ulnav__active");
  if (carritoContenedor.classList.contains("carrito__compras__flex")) {
    carritoContenedor.classList.remove("carrito__compras__flex");
    return;
  }
};

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

const redigirButton = ({ target }) => {
  window.location.href = target.dataset.href;
};

const carritotemplate = (producto) => {
  const { nombre, precio, id, cantidad, imagen } = producto;
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
const renderCarrito = () => {
  if (!carrito.length) {
    carritoItem.innerHTML = `<p class="mensaje__carrito__vacio"> No hay articulos cargado en el carrito. (por el momento &#128521 ) </p>`;

    return;
  }
  return (carritoItem.innerHTML = carrito.map(carritotemplate).join(""));
};

const calculoTotalCarrito = () => {
  return carrito.reduce((acumulador, valor) => {
    return acumulador + Number(valor.precio) * Number(valor.cantidad);
  }, 0);
};

const actualizarCantidadCarritoImg = () => {
  cantidadCarritoImg.innerHTML = carrito.reduce((acumulador, valor) => {
    return acumulador + valor.cantidad;
  }, 0);
};

const renderTotalCarrito = () => {
  totalCarrito.innerHTML = `$${calculoTotalCarrito().toFixed(3)}`;
};

const hayProductoCargadoEnCarrito = (id) => {
  return carrito.find((elemento) => {
    return elemento.id === id;
  });
};

const desestructurarProductosCarrito = (producto) => {
  const { id, precio, nombre, imagen } = producto;
  return { id, precio, nombre, contiene, imagen };
};
const sumarProductoYaExistente = (producto) => {
  carrito = carrito.map((elemento) => {
    return elemento.id === producto.id
      ? { ...elemento, cantidad: elemento.cantidad + 1 }
      : elemento;
  });
};
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

const eliminarProductoCarrito = (productoExistenteEnCarrito) => {
  carrito = carrito.filter((producto) => {
    return producto.id !== productoExistenteEnCarrito.id;
  });
  carritoActualizado();
};

const restarProductoCarrito = (productoExistenteEnCarrito) => {
  carrito = carrito.map((producto) => {
    return producto.id === productoExistenteEnCarrito.id
      ? { ...producto, cantidad: Number(producto.cantidad) - 1 }
      : producto;
  });
};

const manejarSumaProductoCarrito = (id) => {
  const productoExistenteEnCarrito = carrito.find(
    (producto) => producto.id === id
  );
  sumarProductoYaExistente(productoExistenteEnCarrito);
  return;
};

const crearProductoEnCarrito = (producto) => {
  carrito = [
    ...carrito,
    {
      ...producto,
      cantidad: 1,
    },
  ];
};
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

  carritoActualizado();
};

const finalizarCompra = () => {
  if (!carrito.length) {
    return;
  }
  if (window.confirm("¿Desea finalizar su compra?")) {
    carrito = [];
    contenidoCartelAlert.innerHTML = "Tu compra se realizo con exito";
    alerta.classList.add("mostrar");
    setTimeout(() => {
      alerta.classList.remove("mostrar");
    }, 2000);
    carritoActualizado();
  }
};
const vaciarCarrito = () => {
  if (!carrito.length) {
    return;
  }
  if (window.confirm("¿Desea vaciar su carrito?")) {
    carrito = [];
    contenidoCartelAlert.innerHTML = "Carrito vaciado con exito";
    alerta.classList.add("mostrar");
    setTimeout(() => {
      alerta.classList.remove("mostrar");
    }, 2000);
    carritoActualizado();
  }
};

const carritoActualizado = () => {
  guardarItemCarrito();
  renderCarrito();
  renderTotalCarrito();
  actualizarCantidadCarritoImg();
};
const inputVacio = (input) => {
  return !input.value.trim().length;
};
const tipoDePassword = (input) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return re.test(input.value.trim());
};
const contraseñaCorrectaDelUsuario = (inputEmail, inputContraseña) => {
  const usuarioRegistrado = usuarios.filter((usuario) => {
    return usuario.email == inputEmail.value;
  });

  if (usuarioRegistrado[0].password !== inputContraseña.value.trim()) {
    return false;
  }

  return true;
};

const inputPasswordValido = () => {
  let valid = false;

  if (inputVacio(contraseñaInputLogin)) {
    feedbackError(smallErrorPassLogin, "Este campo es necesario");
    return;
  }
  if (!contraseñaCorrectaDelUsuario(emailInputLogin, contraseñaInputLogin)) {
    feedbackError(smallErrorPassLogin, "Contraseña incorrecta");
    return;
  }

  feedbackCorrecto(smallErrorPassLogin, "");
  valid = true;

  return valid;
};

const emailExisteste = (input) => {
  return usuarios.some((usuario) => usuario.email === input.value.trim());
};

const EmailValido = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};
const feedbackError = (conteiner, mensaje) => {
  return (conteiner.innerHTML = mensaje);
};
const feedbackCorrecto = (conteiner, mensaje) => {
  return (conteiner.innerHTML = mensaje);
};
const inputEmailValido = () => {
  let valid = false;

  if (inputVacio(emailInputLogin)) {
    feedbackError(smallErrorEmailLogin, "Este campo es necesario");
    return;
  }
  if (!EmailValido(emailInputLogin)) {
    feedbackError(smallErrorEmailLogin, "El formato del E-Mail es invalido");
    return;
  }
  if (!emailExisteste(emailInputLogin)) {
    feedbackError(smallErrorEmailLogin, "Este E-mail no esta registrado");
    return;
  }
  feedbackCorrecto(smallErrorEmailLogin, "");
  valid = true;
  return valid;
};

const logearCuentaButtons = (e) => {
  nombreCuentaSpan.innerHTML = `${e}`;
  buttonSalirCuenta.classList.add("visible");
  miCuentaButton.classList.add("visible");
  buttonSalirCuenta.classList.remove("hidden");
  miCuentaButton.classList.remove("hidden");
  buttonIngreso.classList.add("hidden");
  buttonCrearCuenta.classList.add("hidden");
};
const deslogearCuentaButtons = () => {
  nombreCuentaSpan.innerHTML = "";
  buttonCrearCuenta.classList.add("visible");
  buttonIngreso.classList.add("visible");
  buttonCrearCuenta.classList.remove("hidden");
  buttonIngreso.classList.remove("hidden");
  buttonSalirCuenta.classList.add("hidden");
  miCuentaButton.classList.add("hidden");
};

const modificarCuentaStateTrue = (emailInputLogin) => {
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
    return usuario.email == emailInputLogin.value;
  });

  cuentaACambiarEstado[0].cuentaLogeada = true;
  guardarUsuario();
  chequeoCuentaLogeada();

  return;
};

const modificarCuentaStateFalse = () => {
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
    return usuario.email == nombreCuentaSpan.innerHTML;
  });
  console.log(cuentaACambiarEstado);
  cuentaACambiarEstado[0].cuentaLogeada = false;
  guardarUsuario();
  deslogearCuentaButtons();

  return;
};

const ingresarUsuario = (e) => {
  e.preventDefault();
  inputEmailValido(emailInputLogin);
  inputPasswordValido();
  let todoEmailValido = inputEmailValido();
  let todoPasswordValido = inputPasswordValido();

  if (inputPasswordValido() && inputEmailValido()) {
    modificarCuentaStateTrue(emailInputLogin);
    contenidoCartelAlertLogin.innerHTML = "Ingresaste con exito";
    alerta.classList.add("mostrar");
    setTimeout(() => {
      alerta.classList.remove("mostrar");
    }, 1500);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 4000);
  }

  return;
};

const salirUsuario = () => {
  modificarCuentaStateFalse();
  console.log(usuarios);
};

const chequeoCuentaLogeada = () => {
  const hayCuentaLogeada = usuarios.filter((usuario) => {
    return usuario.cuentaLogeada == true;
  });
  const emailLogeado = hayCuentaLogeada[0].email;
  logearCuentaButtons(emailLogeado);
};
const filtrarMenuResposive= ()=>{
  if (menuResponsive.classList.contains("ulnav__active")) {
    equipo.classList.add("hidden");
    contactonav.classList.add("hidden");
    productosnav.classList.add("hidden");
    return
  }
  equipo.classList.remove("hidden")
  contactonav.classList.remove("hidden")
  productosnav.classList.remove("hidden")
}
const redirigirLinks = (e) => {
  if (e.target.classList.contains("home")
  ) {return;
  }

  window.location.href = e.target.dataset.href;
};

const init = () => {
  menuResponsiveImg.addEventListener("click", MenuResposiveManejo);
  carritoContenedorImg.addEventListener("click", carritoManejo);
  window.addEventListener("scroll", funcionMenusWindowsScrolls);
  buttonIngreso.addEventListener("click", redigirButton);
  buttonCrearCuenta.addEventListener("click", redigirButton);
  logoHome.addEventListener("click", redigirButton);
  document.addEventListener("DOMContentLoaded", renderCarrito);
  document.addEventListener("DOMContentLoaded", renderTotalCarrito);
  carritoItem.addEventListener("click", manejarCantidadCarrito);
  buttonComprar.addEventListener("click", finalizarCompra);
  buttonVaciar.addEventListener("click", vaciarCarrito);
  buttonLogin.addEventListener("click", ingresarUsuario);
  buttonSalirCuenta.addEventListener("click", salirUsuario);
  document.addEventListener("DOMContentLoaded", chequeoCuentaLogeada);
  menuResponsiveImg.addEventListener("click",filtrarMenuResposive)
  home.addEventListener("click",redirigirLinks)

  carritoActualizado();
};

init();
