const productos = [
    {
        nombre: `Barreno estandar`,
        id: 1,
        categoria: "Barrenos y soportes",
        precio: "21.000",
        imagen: ["./img-productos/barreno estandar.jpg", "./img-productos/barreno zoom 1.jpg", "./img-productos/barreno zoom 2.jpg"]

    },

    {
        nombre: "Barreno reforzado",
        id: 2,
        categoria: "Barrenos y soportes",
        precio: "25.000", 
        imagenPortada: "./img-productos/barreno para golpear.jpg",
        imagen: ["./img-productos/barreno para golpear.jpg", "./img-productos/barreno zoom 1.jpg", "./img-productos/barreno zoom 2.jpg", "./img-productos/mango barreno reforzado.jpg"]
    },

    {
        nombre: "Barreno estandar y extensor",
        id: 3,
        categoria: "Barrenos y soportes",
        precio: "35.000",
        imagen: ["./img-productos/barreno estandar.jpg", "./img-productos/barreno zoom 1.jpg", "./img-productos/barreno zoom 2.jpg", "./img-productos/EXTENSOR BARRENO.jpg", "./img-productos/extensor barreno zoom.jpg", "./img-productos/extensor barreno zoom 2.jpg"]
    },

    {
        nombre: "Barreno reforzado y extensor",
        id: 4,
        categoria: "Barrenos y soportes",
        precio: "21.000",
        imagen: ["./img-productos/barreno para golpear.jpg", "./img-productos/barreno zoom 1.jpg", "./img-productos/barreno zoom 2.jpg", "./img-productos/EXTENSOR BARRENO.jpg", "./img-productos/extensor barreno zoom.jpg", "./img-productos/extensor barreno zoom 2.jpg", "./img-productos/mango barreno reforzado.jpg"]
    },

    {
        nombre: "Extensor para barrenos",
        id: 5,
        categoria: "Barrenos y soportes",
        precio: "12.000",
        imagen: ["./img-productos/EXTENSOR BARRENO.jpg", "./img-productos/extensor barreno zoom.jpg", "./img-productos/extensor barreno zoom 2.jpg"]
    },

    {
        nombre: "Kit de agronomo",
        id: 6,
        categoria: "Barrenos y soportes",
        precio: "35.000",
        imagen: ["./img-productos/barreno para golpear.jpg", "./img-productos/EXTENSOR BARRENO.jpg", "./img-productos/extensor barreno zoom 2.jpg", "./img-productos/mango barreno reforzado.jpg","./img-productos/termometro 4.jpg", "./img-productos/cucharin gris solo.png"]
    },

    {
        nombre: "Soporte tarjeta hidrosensibles",
        id: 7,
        categoria: "Barrenos y soportes",
        precio: "9000",
        imagen: ["./img-productos/tarjeta hidrosensible  (2).jpeg", "./img-productos/tarjeta hidrosensible  (4).jpeg", "./img-productos/tarjeta hidrosensible  (5).jpeg", , "./img-productos/tarjeta hidrosensible  (8).jpeg", "./img-productos/tarjeta hidrosensible  (9).jpeg",]
    },

    {
        nombre: "Termometro digital",
        id: 8,
        categoria: "Instrumentos digitales",
        precio: "9000",
        imagen: ["./img-productos/termometro.JPG", "./img-productos/termometro2.png", "./img-productos/termometro 3.jpg", "./img-productos/termometro 4.jpg", "/img-productos/termometro 6.jpg", "/img-productos/termometro 7.jpg"]
    },

    {
        nombre: "Balanza de granos",
        id: 9,
        categoria: "Instrumentos digitales",
        precio: "12.000",
        imagen: ["/img-productos/balanza granos.jpg", "/img-productos/balanza granos 2.png"]
    },

    {
        nombre: "Balanza de bolsillo",
        id: 10,
        categoria: "Instrumentos digitales",
        precio: "6.000",
        imagen: ["./img-productos/balanza de bolsillo.png"]
    },

    {
        nombre: "Anemometro",
        id: 11,
        categoria: "Instrumentos digitales",
        precio: "21.000",
        imagen: ["/img-productos/anemometro (1).jpg", "/img-productos/anemometro (2).jpg", "/img-productos/anemometro (3).png"]
    },

    {
        nombre: "Cinta metrica",
        id: 12,
        categoria: "Medicion",
        precio: "5000",
        imagen: ["/img-productos/cinta metrica 2.jpg", "./img-productos/Cinta metrica suelo 2.jpg"]
    },

    {
        nombre: "Cucharin para medicion",
        id: 13,
        categoria: "Medicion",
        precio: "2500",
        imagen: ["/img-productos/cucharin epa 2.jpeg", "/img-productos/cucharin epa 3.jpeg", "/img-productos/cucharin epa 5.jpeg", "/img-productos/cucharin epa.jpeg"]
    },
    {
        nombre: "Pluviometro",
        id: 14,
        categoria: "Medicion",
        precio: "12000",
        imagen: ["./img-productos/pluviometro.jpg", "./img-productos/pluviometro-1.jpg", "./img-productos/pluviometroconzoom.jpg", "./img-productos/pluviometro poste.jpg", "./img-productos/pluviometro azul 2.jpeg"]
    },
    {
        nombre: "Pachimetro",
        id: 15,
        categoria: "Instrumentos digitales",
        precio: "15000",
        imagen: ["./img-productos/peachimetro.jpg", "./img-productos/peachimetro 2.png"]
    },
    {
        nombre: "Paño para muestreo de plagas",
        id: 16,
        categoria: "Medicion",
        precio: "15000",
        imagen: ["/img-productos/paño para muestreo.PNG", "./img-productos/paño para muestreo 2 .jpg", "/img-productos/Paño para muestreo 3.jpg", "/img-productos/paño ruta 12.jpg"]
    },
    {
        nombre: "Kit cosecha",
        id: 17,
        categoria: "Medicion",
        precio: "15000",
        imagen: ["/img-productos/kit cosecha (1).jpeg", "/img-productos/kit cosecha (2).jpeg", "/img-productos/kit cosecha (3).jpeg"]
    }
]


const verMasFuncion = (cantidad) => {
    let arrayVerMas = []
    for (let i = 0; i < productos.length; i += cantidad) {
        arrayVerMas.push(productos.slice(i, i + cantidad))
    }
    return arrayVerMas
};


const appState = {
    listaProductos: verMasFuncion(5),
    indiceDeBucle: 0,
    limiteDeProductos: verMasFuncion(5).length,
    estadoFiltro: null,
    cuentaLogeada: null,
}