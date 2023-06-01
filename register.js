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


const validarFormRegistro =()=>{
	e.preventDefault();
// comprobar que cada input introdusza el correcto + feedback

// comprobar que no exista en la base de datos + feedback

// // registrar el usuario y guardarlo en LS

// redirigir

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