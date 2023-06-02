const menuResponsiveImg = document.getElementById("menulabel")
const menuResponsive= document.querySelector(".ulnav")
const carritoContenedorImg = document.querySelector(".carrito__compras__imagen")
const carritoContenedor= document.querySelector(".carrito__compras__conteiner")
const buttonIngreso = document.querySelector(".ingreso__button")
const buttonCrearCuenta = document.querySelector(".crear__cuenta__button")
const logoHome = document.getElementById("logoepa")
const formRegistro = document.querySelector(".form__registro")
const buttonRegistro = document.querySelector(".button__registro")
const emailInput = document.querySelector(".email__input")
const passwordInput = document.querySelector(".contraseña__input")
const smallErrorEmail = document.getElementById("email__error")
const smallErrorPass = document.getElementById("password__error__1")
const smallErrorPassRepeat = document.getElementById("password__error__2")

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

const guardarUsuario = ()=>{
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


// FUNCION PARA EL BOTON DE MENU RESPONSIVE 
const MenuResposiveManejo =(e)=>{
    menuResponsive.classList.toggle("ulnav__active")
    if(carritoContenedor.classList.contains("carrito__compras__flex"))
    {
     carritoContenedor.classList.remove("carrito__compras__flex")
     return
    }
 
 }

 const funcionMenusWindowsScrolls =()=>{
    if(!menuResponsive.classList.contains("ulnav__active") && !carritoContenedor.classList.contains("carrito__compras__flex")){
      return
    }
    menuResponsive.classList.remove("ulnav__active")
    carritoContenedor.classList.remove("carrito__compras__flex")
}
// funcion para el boton de carrito

const carritoManejo=()=>{
    carritoContenedor.classList.toggle("carrito__compras__flex")
    if(menuResponsive.classList.contains("ulnav__active"))
   {
    menuResponsive.classList.remove("ulnav__active")
    return
   }

}
const redigirButton=({target})=>{
 
    window.location.href = target.dataset.href
}
const inputVacio =(input)=>{
   return !input.value.trim().length
}

const EmailValido =(input)=>{
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	return re.test(input.value.trim());

}
const emailExisteste = (input) => {
	return usuarios.some((usuario) => usuario.email === input.value.trim());
};

const feedbackError =(conteiner,mensaje)=>{
 return conteiner.innerHTML = mensaje

}



const inputEmailValido =()=>{
   let valid = false

if( inputVacio(emailInput)){
    feedbackError(smallErrorEmail,"Este campo es necesario")
    return
}
if(!EmailValido(emailInput)){
feedbackError(smallErrorEmail,"El formato del E-Mail es invalido")
return
}
if(emailExisteste(emailInput)){
    feedbackError(smallErrorEmail,"El mail ingresado ya esta registrado")
    }
valid = true
return valid
}

const inputPasswordValido = ()=>{
    let valid = false

    if(inputVacio(passwordInput)){
        feedbackError(smallErrorPass, "Este campo es necesario")
    }
    if(tipoDePassword(passwordInput)){
        feedbackError(smallErrorPass, "La contraseña debe tener un minimo de 8 caracteres, una mayuscula, un numero y un simbolo")
    }
    valid = true

    return valid


}

const tipoDePassword = (input) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	return re.test(input.value.trim());
};


const validarFormRegistro =(e)=>{
	e.preventDefault();
// comprobar que cada input introdusza el correcto + feedback
if (inputEmailValido()) {
    
}
// comprobar que no exista en la base de datos + feedback

// // registrar el usuario y guardarlo en LS

// redirigir
return
}

const init =()=> {

menuResponsiveImg.addEventListener("click", MenuResposiveManejo)
carritoContenedorImg.addEventListener("click", carritoManejo)
window.addEventListener("scroll",funcionMenusWindowsScrolls);
buttonIngreso.addEventListener("click",redigirButton)
buttonCrearCuenta.addEventListener("click",redigirButton)
logoHome.addEventListener("click",redigirButton)
buttonRegistro.addEventListener("click",validarFormRegistro)

}

init ()