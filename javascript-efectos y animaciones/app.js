let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecGenero = document.getElementById('selecGenero')

selecGenero.addEventListener('change',()=>{
    console.log(selecGenero.value)
    if(selecGenero.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(elemento => elemento.Genero == selecGenero.value))
    }
})

mostrarProductos(stockProductos)

function mostrarProductos(array){
    contenedorProductos.innerHTML = ''

    array.forEach(productos => {
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `
            <div class="card">
                <div class="card-image">
                    <img src=${productos.img}>
                    <span class="card-title">${productos.nombre}</span>
                    <a id="boton${productos.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                </div>
                <div class="card-content">
                    <p>${productos.Genero}</p>
                    <P>${productos.tipo}</P>
                    <p>$${productos.precio}</p>
                </div>
            </div>
        `
        contenedorProductos.appendChild(div)

        let botonAgregar = document.getElementById(`boton${productos.id}`)

        botonAgregar.addEventListener('click', ()=>{
            agregarAlCarrito(productos.id)

            Toastify({
                text: "Producto Agregado",
                className: "info",
                style: {
                  background: "green",
                }
              }).showToast();
        })

    });
}


function agregarAlCarrito(id) {
    let verificar = carritoDeCompras.find(elemento => elemento.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML = `<p id="cantidad${verificar.id}">Cantidad:${verificar.cantidad}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(producto => producto.id == id)

        carritoDeCompras.push(productoAgregar)
        
        actualizarCarrito() 

        let div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
                        <p>${productoAgregar.nombre}</p>
                        <p>Precio:$${productoAgregar.precio}</p>
                        <p>Tipo:${productoAgregar.tipo}</p>
                        <p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>
                        <button class="boton-eliminar" id='eliminar${productoAgregar.id}'><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        btnEliminar.addEventListener('click', ()=>{
            if(productoAgregar.cantidad == 1){
                btnEliminar.parentElement.remove()
                carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)
                actualizarCarrito()
                Toastify({
                    text: "Producto Eliminado",
                    className: "info",
                    style: {
                    background: "red",
                    }
                }).showToast();
            }else{
                productoAgregar.cantidad= productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad:${productoAgregar.cantidad}</p>`
                actualizarCarrito()
            }
            
        })
    }
    
}


function  actualizarCarrito (){
   contadorCarrito.innerText = carritoDeCompras.reduce((acc, el)=> acc + el.cantidad, 0)
   precioTotal.innerText = carritoDeCompras.reduce((acc, el)=> acc + (el.precio * el.cantidad), 0 )
}
/*animaciones*/
$('#ir').on('click', function () {
    $('html, body').animate({
        scrollTop: $('#contacto').offset().top
    }, 6000)
  })


  $('#der').on('click', function () {
    $('.block').animate({"left": "+=50px"}, "slow")
})

$('#izq').on('click', function () {
    $('.block').animate({"left": "-=50px"}, "slow")
})   


$('#fin').on('click', function () {
    
    alert('Gracias por su compra')
    carritoDeCompras= [],
    localStorage.clear()
    actualizarCarrito()
    $('#carrito-contenedor').empty()
})