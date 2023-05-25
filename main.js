// const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// const cargarItemCarrito = ()=>{
//     localStorage.setItem("carrito", JSON.stringify())
// }


const cardProductosConteiner = document.querySelector(".cards__productos")
const buttonVerMas= document.querySelector(".buttons__vermas")
const contenedorCategoria = document.querySelector(".filter__productos")
const buttonFilter = document.querySelectorAll(".categoria")



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

const renderProductos = (e)=>{
    
cardProductosConteiner.innerHTML+= e.map(cardProducto).join("")
}
const ultimoIndiceVerMas = ()=>{
    return appState.indiceDeBucle === appState.limiteDeProductos - 1
}


const verMasProductos=()=>{
    appState.indiceDeBucle += 1
    let {listaProductos, indiceDeBucle} = appState
        renderProductos(listaProductos[indiceDeBucle])
            if(ultimoIndiceVerMas()){
                buttonVerMas.classList.add("hidden")
    }
}

const buttonIncativo =(e)=>{
e.classList.contains("categoria") && !e.classList.contains("button__activo")
}



const cambioEstilosButtonActivado =(categoriaSeleccionada)=>{
    const buttonList = [...buttonFilter]
    buttonList.forEach((button)=>{
        if(button.dataset.categoria !== categoriaSeleccionada)
        {button.classList.remove("button__activo")
        return}
        button.classList.add("button__activo")

    })
}
const cambioEstado=(button)=>{
    appState.filtroEstado = button.dataset.categoria
    cambioEstilosButtonActivado(appState.filtroEstado)
    }
const aplicarFiltro =({target})=>{
    if(!buttonIncativo(target)){
         return
    }
// cambiar el estado del filro 

// si esta activo renderizo producots filtradas
cambioEstilosButtonActivado(target)
// si no hay activo renderizo todo

}
const init =()=> {
renderProductos(appState.listaProductos[appState.indiceDeBucle])
// document.addEventListener("DOMContentLoaded", renderCarrito)
buttonVerMas.addEventListener("click",verMasProductos)
contenedorCategoria.addEventListener("click", aplicarFiltro)



}

init ()