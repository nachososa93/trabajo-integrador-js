// const carrito = JSON.parse(localStorage.getItem("carrito")) || []

// const cargarItemCarrito = ()=>{
//     localStorage.setItem("carrito", JSON.stringify())
// }


const cardProductosConteiner = document.querySelector(".cards__productos")
const buttonVerMas= document.querySelector(".buttons__vermas")


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

const renderProductos = ()=>{
    let {listaProductos} = appState
cardProductosConteiner.innerHTML= productos.map(cardProducto).join("")
}

// const renderCarrito=()=>{

// }

const verMasProductos=()=>{
appState.indiceDeBucle += 1
let {listaProductos, indiceDeBucle} = appState
renderProductos(listaProductos[indiceDeBucle])
}

const init =()=> {
renderProductos(appState.listaProductos[appState.indiceDeBucle])
// document.addEventListener("DOMContentLoaded", renderCarrito)
buttonVerMas.addEventListener("click",verMasProductos)



}

init ()