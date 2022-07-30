let productos = []
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal')

const buscador = document.getElementById('search')



//Fetch
fetch("js/productos.json")
    .then((response) => response.json())
    .then((data) => {

        productos = data

        mostrarProductos(productos)

    })
    .catch((error) => {
        console.log(error)
    })



//Funciones del Ecommerce
//DOM
function mostrarProductos(productos) {
    let productosGrid = "";
    productos.forEach(el => {
        productosGrid += `<div class="col s12 m6 l3">
                            <div class="card z-depth-2">
                                <div class="card-image">
                                <img class="card-img-top" src="${el.img}">
                                <span class="card-title">${el.nombre}</span>
                                </div>
                                <div class="card-content">
                                <div class="d-flex justify-content-between align-items-center">
                                </div>
                                <p>${el.descripcion}</p>
                                <p> $${el.precio}</p>
                                <a id="boton${el.id}" class="btn-floating halfway-fab waves-effect waves-light red add"><i class="material-icons">add_shopping_cart</i></a>
                                    </div>
                                </div>
                            </div>`
        document.getElementById('productos').innerHTML = productosGrid;


//Agregar al carrito
const add = document.getElementsByClassName('add')
for (let i = 0; i < add.length; i++) {
    add[i].addEventListener('click', () => {
    console.log("Agregando al carrito");

    let producto = {
        nombre: productos[i].nombre,
        precio: productos[i].precio,
        img: productos[i].img
    }
    Toastify({
        text: productos[i].nombre + " agregado al carrito",
        className: "info",
        gravity: "bottom",
        style: {
        background: "linear-gradient(to right, #0D324D, #7F5A83)",
        }
    }).showToast();

    carritoDeCompras.push(producto)
    console.log(carritoDeCompras);
    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    contadorSumar();
    mostrarCarrito();
    })
}
});
}

mostrarProductos(productos);


//Funciones de Carrito
function mostrarCarrito() {
let carritoItem = "";
for (let producto of carritoDeCompras) {
    carritoItem += `
    <div>
        <article class="row">
        <div class="col-4">
            <img class="cart-img" src="${producto.img}" alt="${producto.nombre}">
        </div>
        <div class="col-4">
            <p class="card-text cart-name">${producto.nombre}</p>
            <p class="card-text cart-precio">Precio: $${producto.precio}</p>
            
        </div>
        </article>
    `;
}
document.getElementById('contenedorCarrito').innerHTML = carritoItem;
finalPrice();
}


let contador = 0;
let resultado = document.getElementById('contadorCarrito');


function contadorSumar() {
contador++;
resultado.innerHTML = contador;
}
contadorSumar();


function contadorRestar() {
contador--;
resultado.innerHTML = contador;

if (contador < 0) {

    contador = 0;
    resultado.innerHTML = contador;
}
}
contadorRestar();


function emptyCart() {
//event listener para eliminar productos del carrito al hacer click en el icono #clearCart 
document.getElementById('clearCart').addEventListener('click', () => {
    carrito = [];


//Remplazando con Operador ternario
    contador == 0 ? Swal.fire('El carrito ya esta vacio') : Swal.fire('Vaciaste el carrito')
    contador = 0;
    resultado.innerHTML = contador;

    localStorage.setItem('carrito', JSON.stringify(carrito))
    finalPrice();
    mostrarCarrito();
})
}
emptyCart();

//Precio Final
function finalPrice() {
precioFinal = carritoDeCompras.reduce((acc, prod) => acc + prod.precio, 0)
precioTotal.innerText = `Precio total: $${precioFinal}`
}
finalPrice();

//Guardar carrito
function guardarCarrito() {
if (carritoDeCompras.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
}
}
localStorage.setItem("guardarCarrito", guardarCarrito)


//boton comprar
btnCheckout = document.getElementById('btn-checkout');

//Boton finalizar compra y checkout
function checkout() {
btnCheckout.addEventListener('click', () => {
    if (carritoDeCompras.length > 0) {
        Swal.fire({
            title: '¡Compra exitosa!',
            html: 'Total a pagar: $' + precioFinal,
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: 'linear-gradient(to right, #0D324D, #7F5A83)',
        })

            .then((result) => {
                if (result.isConfirmed) {
                    contador = 0;
                    resultado.innerHTML = contador;
                    carrito = [];
                    localStorage.setItem('carrito', JSON.stringify(carrito))
                    finalPrice();
                    mostrarCarrito();

                }
            })

    } else {
        Swal.fire('El carrito no tiene productos')
    }
})
}
checkout();