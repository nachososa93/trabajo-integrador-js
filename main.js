// const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// const cargarItemCarrito = ()=>{
//     localStorage.setItem("carrito", JSON.stringify())
// }

// ELEMENTOS OBTENIDOS DEL DOM 

const cardProductosConteiner = document.querySelector(".cards__productos")
const buttonVerMas= document.querySelector(".buttons__vermas")
const contenedorCategoria = document.querySelector(".filter__productos")
const buttonFilter = document.querySelectorAll(".categoria")
const menuResponsiveImg = document.getElementById("menulabel")
const menuResponsive= document.querySelector(".ulnav")
const carritoContenedorImg = document.querySelector(".carrito__compras__imagen")
const carritoContenedor= document.querySelector(".carrito__compras__conteiner")
const body = document.getElementsByTagName("body")


// funcion para desactivar carrito y menu resposive con click en pantalla 

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
// FUNCION PARA EL BOTON DE MENU RESPONSIVE 
const MenuResposiveManejo =(e)=>{
   menuResponsive.classList.toggle("ulnav__active")
   if(carritoContenedor.classList.contains("carrito__compras__flex"))
   {
    carritoContenedor.classList.remove("carrito__compras__flex")
    return
   }

}

// FUNCION PARA FORMAR EL CONTENEDOR EN CADA PRODUCTO DEL ARRAY

const cardProducto=(productos)=>{
const {nombre,imagen,contiene,precio} = productos
return`
<div class="card__producto__solo">
<h2>${nombre.toUpperCase()}</h2>
<div class="imagenes__producto efecto">
${imagen.map(e => {
    return `<img src="${e}" alt="" />`
}).join("")}
</div>
<h3 class="contiene__producto">${contiene}</h3>
<h3 class="precio__producto"> Precio:$${precio}</h3>
<button class="button__add">Agregar al carrito</button>
</div>
`
}

// FUNCION PARA RENDERIZAR EL ARRAY DE PRODUCTOS

const renderProductos = (e)=>{
cardProductosConteiner.innerHTML+= e.map(cardProducto).join("")
}

// FUNCION PARA OBTENER DETEENER EL BUCLE DE VER MAS

const ultimoIndiceVerMas = ()=>{
    return appState.indiceDeBucle === appState.limiteDeProductos - 1
}

// FUNCION PARA DARLE FUNCIONALIDAD AL BUTTON Y DETENER SU FUNCIONAMIENTO OCULTANDO BUTTON

const verMasProductos=()=>{
    appState.indiceDeBucle += 1
    let {listaProductos, indiceDeBucle} = appState
        renderProductos(listaProductos[indiceDeBucle])
            if(ultimoIndiceVerMas()){
                buttonVerMas.classList.add("hidden")
    }
}

// FUNCION PARA DETENERMINAR SI EL BUTTON ESTA DESACTIVADO

const buttonIncativo =(e)=>{

 return (e.classList.contains("categoria") && !e.classList.contains("button__activo")
)}


// FUNCION PARA CAMBIAR EL ESTILO DEL BUTTON ACTIVADO

const cambioEstilosButtonActivado =(categoriaSeleccionada)=>{
    const buttonList = [...buttonFilter]
    buttonList.forEach((button)=>{
        if(button.dataset.categoria !== categoriaSeleccionada)
        {button.classList.remove("button__activo")
        return}
        button.classList.add("button__activo")

    })
}

// FUNCION PARA OCULTAR EL BUTTON VER MAS EN FILTRO

const mostrarVerMasEnFiltro=()=>{
    if(!appState.estadoFiltro){
        buttonVerMas.classList.remove("hidden")
        return
    }
    buttonVerMas.classList.add("hidden")
}
// FUNCION PARA CAMBIAR EL ESTADO DEL BUTTON Y DESACTIVAR EL BUTTON DE VER MAS

const cambioEstado=(button)=>{
    appState.estadoFiltro = button.dataset.categoria
    cambioEstilosButtonActivado(appState.estadoFiltro)
    mostrarVerMasEnFiltro()
    }
// FUNCION PARA RENDERIZAR SOLO LOS PRODUCTOS FILTRADOS

const renderProductosFiltrados=()=>{
    const productosFiltados = productos.filter((producto)=>{
        return producto.categoria === appState.estadoFiltro
    })
    renderProductos(productosFiltados)
}

// FUNCION PARA APLICAR EL FILTRO A LOS PRODUCTOS RENDERIZADOS TOTALES

const aplicarFiltro =({target})=>{
    if(!buttonIncativo(target)){
         return
    }
// cambiar el estado del filro 
cambioEstado(target);

// si esta activo renderizo producots filtradas
cardProductosConteiner.innerHTML = "";
if(appState.estadoFiltro){
 
    renderProductosFiltrados()
    appState.indiceDeBucle=0
    
    return
}
// si no hay activo renderizo todo

renderProductos(appState.listaProductos[0])

}


const init =()=> {
renderProductos(appState.listaProductos[appState.indiceDeBucle])
// document.addEventListener("DOMContentLoaded", renderCarrito)
buttonVerMas.addEventListener("click",verMasProductos)
contenedorCategoria.addEventListener("click", aplicarFiltro)
menuResponsiveImg.addEventListener("click", MenuResposiveManejo)
carritoContenedorImg.addEventListener("click", carritoManejo)
window.addEventListener("scroll",funcionMenusWindowsScrolls)


}

init ()