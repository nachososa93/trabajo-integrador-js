const menuResponsiveImg = document.getElementById("menulabel");
const menuResponsive = document.querySelector(".ulnav");
const carritoContenedorImg = document.querySelector(
    ".carrito__compras__imagen"
);
const carritoContenedor = document.querySelector(
    ".carrito__compras__conteiner"
);
const buttonIngreso = document.querySelector(".ingreso__button");
const buttonCrearCuenta = document.querySelector(".crear__cuenta__button");
const logoHome = document.getElementById("logoepa");
const formRegistro = document.querySelector(".form__registro");
const buttonRegistro = document.querySelector(".button__registro");
const emailInput = document.querySelector(".email__input");
const passwordInput = document.querySelector(".contraseña__input");
const passwordInputRepeat = document.querySelector(
    ".contraseña__input__repeat"
);
const buttonLogin = document.querySelector(".button__login")
const smallErrorEmail = document.getElementById("email__error");
const smallErrorPass = document.getElementById("password__error__1");
const smallErrorPassRepeat = document.getElementById("password__error__2");
const alerta = document.querySelector(".cartel__alert");
const contenidoCartelAlertLogin = document.querySelector(
    ".contenido__cartel__alert__register"
);
const cantidadCarritoImg = document.querySelector(
    ".cantidad__carrito__conteiner"
  );
const cardProductosConteiner = document.querySelector(".cards__productos");
const carritoItem = document.querySelector(".card__carrito");
const buttonComprar = document.querySelector(".button__comprar");
const buttonVaciar = document.querySelector(".button__vaciar");
const totalCarrito = document.querySelector(".total__carrito");
const contenidoCartelAlert = document.querySelector(".cartel__alert")
const footer = document.querySelector(".link__github")
const buttonSalirCuenta = document.querySelector(".salir__cuenta")
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarItemCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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
const cardProducto = (productos) => {
    const { nombre, imagen, contiene, precio, id } = productos;
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
  <h3 class="contiene__producto">${contiene}</h3>
  <h3 class="precio__producto"> Precio:$${precio}</h3>
  <button class="agregar__producto__carrito" data-id =${id} data-nombre="${nombre}" data-precio =${precio} data-contiene= ${contiene} data-image=${imagen}>Agregar al carrito</button>
  </div>
  `;
  };
  
  // FUNCION PARA RENDERIZAR EL ARRAY DE PRODUCTOS
  
  const renderProductos = (e) => {
    cardProductosConteiner.innerHTML += e.map(cardProducto).join("");
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
    const { id, precio, nombre, contiene, imagen } = producto;
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
  
  const finalizarCompra =()=>{
    if (!carrito.length){
      return
    }
   if(window.confirm("¿Desea finalizar su compra?")){
      carrito=[]
      contenidoCartelAlert.innerHTML = "Tu compra se realizo con exito"
     alerta.classList.add("mostrar")
    setTimeout(() => {
      alerta.classList.remove("mostrar")
    }, 2000);
      carritoActualizado();
    }
  }
  const vaciarCarrito =()=>{
    if (!carrito.length){
      return
    }
    if(window.confirm("¿Desea vaciar su carrito?")){
      carrito=[]
      contenidoCartelAlert.innerHTML = "Carrito vaciado con exito"
      alerta.classList.add("mostrar")
     setTimeout(() => {
       alerta.classList.remove("mostrar")
     }, 2000);
       carritoActualizado();
  }}
  

  const carritoActualizado = () => {
    guardarItemCarrito();
    renderCarrito();
    renderTotalCarrito();
    actualizarCantidadCarritoImg();
  };
const inputVacio = (input) => {
    return !input.value.trim().length;
};

const EmailValido = (input) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
};
const emailExisteste = (input) => {
    return usuarios.some((usuario) => usuario.email === input.value.trim());
};

const feedbackError = (conteiner, mensaje) => {
    return (conteiner.innerHTML = mensaje);
};

const feedbackCorrecto = (conteiner, mensaje) => {
    return (conteiner.innerHTML = mensaje);
};

const inputEmailValido = () => {
    let valid = false;

    if (inputVacio(emailInput)) {
        feedbackError(smallErrorEmail, "Este campo es necesario");
        return;
    }
    if (!EmailValido(emailInput)) {
        feedbackError(smallErrorEmail, "El formato del E-Mail es invalido");
        return;
    }
    if (emailExisteste(emailInput)) {
        feedbackError(smallErrorEmail, "El mail ingresado ya esta registrado");
        return;
    }
    feedbackCorrecto(smallErrorEmail, "");
    valid = true;
    return valid;
};
const tipoDePassword = (input) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim());
};
const inputPasswordValido = () => {
    let valid = false;

    if (inputVacio(passwordInput)) {
        feedbackError(smallErrorPass, "Este campo es necesario");
        return;
    }
    if (!tipoDePassword(passwordInput)) {
        feedbackError(
            smallErrorPass,
            "La contraseña debe tener un minimo de 8 caracteres, una mayuscula, un numero y un simbolo"
        );
        return;
    }

    feedbackCorrecto(smallErrorPass, "");
    valid = true;
    return valid;
};

const coincidenContraseñas = () => {
    if (passwordInput.value != passwordInputRepeat.value) {
   
        feedbackError(smallErrorPassRepeat, "Las contraseñas deben coincidir");
        return false;
    } else {

        return true;
    }
};
const passwordRepetidaValida = () => {
    let valid = false;

    if (inputVacio(passwordInputRepeat)) {
        feedbackError(smallErrorPassRepeat, "Este campo es necesario");
        return;
    }
    if (!tipoDePassword(passwordInputRepeat)) {
        feedbackError(
            smallErrorPassRepeat,
            "La contraseña debe tener un minimo de 8 caracteres, una mayuscula, un numero y un simbolo"
        );

        return;
    }

    feedbackCorrecto(smallErrorPassRepeat, "");
    valid = true;
    return valid;
};

const validarFormRegistro = (e) => {
    e.preventDefault();
    let todoMailValido = inputEmailValido();
    let todoPasswordValido = inputPasswordValido();
    let todoRepeatPasswordValido = passwordRepetidaValida();
    let coincidenContraseñasCheck = coincidenContraseñas();

    let formularioValidoCompleto =
        todoMailValido &&
        todoPasswordValido &&
        todoRepeatPasswordValido &&
        coincidenContraseñasCheck;
    if (formularioValidoCompleto === true) {
        usuarios.push({
            email: emailInput.value,
            password: passwordInput.value,
            cuentaLogeada : false
        });

        guardarUsuario();
        contenidoCartelAlertLogin.innerHTML = "Te registraste con exito";
        alerta.classList.add("mostrar");
        setTimeout(() => {
            alerta.classList.remove("mostrar");
        }, 2000);
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2500);

    }

    return;
};
const logearCuentaButtons =(emailInputLogin)=>{
  nombreCuentaSpan.innerHTML = `${emailInputLogin.value}`
  buttonSalirCuenta.classList.add("visible")
  miCuentaButton.classList.add("visible")
  buttonSalirCuenta.classList.remove("hidden")
  miCuentaButton.classList.remove("hidden")
  buttonIngreso.classList.add("hidden")
  buttonCrearCuenta.classList.add("hidden")

}
const deslogearCuentaButtons =()=>{
  nombreCuentaSpan.innerHTML = ""
  buttonCrearCuenta.classList.add("visible")
  buttonIngreso.classList.add("visible")
  buttonCrearCuenta.classList.remove("hidden")
  buttonIngreso.classList.remove("hidden")
  buttonSalirCuenta.classList.add("hidden")
  miCuentaButton.classList.add("hidden")
}

const modificarCuentaStateTrue =(emailInputLogin)=>{
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
      return usuario.email == emailInputLogin.value
  }
  )
cuentaACambiarEstado[0].cuentaLogeada = true  
guardarUsuario()
logearCuentaButtons(emailInputLogin)



return
  
}
const modificarCuentaStateFalse =()=>{
  const cuentaACambiarEstado = usuarios.filter((usuario) => {
      return usuario.email == nombreCuentaSpan.innerHTML
  }
  )
  console.log(cuentaACambiarEstado);
cuentaACambiarEstado[0].cuentaLogeada = false  
guardarUsuario()
deslogearCuentaButtons()



return
  
}
 

const ingresarUsuario = (e) => {
  e.preventDefault()
  inputEmailValido(emailInputLogin)
  inputPasswordValido()
  let todoEmailValido = inputEmailValido()
  let todoPasswordValido = inputPasswordValido()

  if (inputPasswordValido() && inputEmailValido()) {
      modificarCuentaStateTrue(emailInputLogin)
console.log(usuarios);
      setTimeout(() => {
          // window.location.href = "login.html";
      }, 1500);
    
  }

return
}

const salirUsuario=()=>{
  modificarCuentaStateFalse()
  console.log(usuarios);
}
const chequeoCuentaLogeada=()=>{
  const hayCuentaLogeada = usuarios.filter((usuario) => {
    return usuario.cuentaLogeada == true
}
)
logearCuentaButtons(hayCuentaLogeada.email)
// console.log(hayCuentaLogeada.length);
// if(hayCuentaLogeada.length>= 1){
// feedbackError(smallErrorPassLogin, "Ya hay una cuenta logeada")
// return
// }
}



const init = () => {
    menuResponsiveImg.addEventListener("click", MenuResposiveManejo);
    carritoContenedorImg.addEventListener("click", carritoManejo);
    window.addEventListener("scroll", funcionMenusWindowsScrolls);
    buttonIngreso.addEventListener("click", redigirButton);
    buttonCrearCuenta.addEventListener("click", redigirButton);
    logoHome.addEventListener("click", redigirButton);
    buttonRegistro.addEventListener("click", validarFormRegistro);
    document.addEventListener("DOMContentLoaded", renderCarrito);
    document.addEventListener("DOMContentLoaded", renderTotalCarrito);
    carritoItem.addEventListener("click", manejarCantidadCarrito);
    buttonComprar.addEventListener("click", finalizarCompra);
    buttonVaciar.addEventListener("click", vaciarCarrito)
    buttonLogin.addEventListener("click", ingresarUsuario)
    buttonSalirCuenta.addEventListener("click",salirUsuario)
    document.addEventListener("DOMContentLoaded", chequeoCuentaLogeada);
   


    carritoActualizado();
};

init();
