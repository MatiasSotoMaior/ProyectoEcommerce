// LLAMO AL CONTENEDOR DONDE VOY A UBICAR MI STOCK
const contenedorProductos = document.getElementById("card0")
    //LLAMO AL MODAL DONDE SE VA A ALMACENAR LO QUE AGREGE AL CARRITO
const cartContent = document.getElementById("cartContent")
    //LLAMO AL BOTON DE VACIAR CARRITO
const emptyCart = document.getElementById("emptyCart")
    // LLAMO AL CONTADOR DEL CARRITO
const cartCounter = document.getElementById("cartCounter")
    // LLAMO AL PRECIO TOTAL
const totalPrice = document.getElementById("totalPrice")
    // EN ESTE ARRAY VOY A IR AGREGANDO MI CARRITO CUANDO PRESIONEN ADD
let carrito = []
    // HAGO QUE EL BOTON VACIAR CARRITO FUNCIONE
emptyCart.addEventListener("click", () => {
        carrito.length = 0
        updateCart()
    })
    // ESTE CODIGO CREA UN DIV PARA CADA PRODUCTO QUE TENGO EN EL STOCK
fetch('/stock.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            const div = document.createElement("div")
            div.classList.add("card")
            div.classList.add("mt-4")
            div.setAttribute("style", "width: 18rem;")
            div.setAttribute("id", producto.tipo)
            div.innerHTML = `
    <img src=${producto.img} class="card-img-top" alt="...">
    <h3 class="text-center fw-normal fs-5">${producto.nombre}</h3>
    <p class="text-center fw-bold fs-5">$${producto.precio}</p>
    <button type="button" id="add${producto.id}" class="btn btn-dark mb-2">ADD <i class="fa-solid fa-cart-shopping"></i></button>
    `
                // Y ACA LO AÑIDA AL CONTENEDOR LLAMADO AL PRINCIPIO
            contenedorProductos.appendChild(div)
                // ACA ARMAMOS EL CODIGO QUE AGREGA EL STOCK AL CARRITO, PRIMERO LLAMAMOS AL BOTON
            const boton = document.getElementById(`add${producto.id}`)
                // AL PRESIONAR ADD SE VA A AGREGAR AL ARRAY carrito 
            boton.addEventListener("click", () => {
                agregarAlCarrito(producto.id)
            })

        })
    })
    // ACA CREO UNA FUNCION QUE AL LLAMARLA AGREGA PRODUCTOS AL CARRITO BUSCANDOLOS POR EL ID
const agregarAlCarrito = (prodId) => {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
        updateCart()
        console.log(carrito)
    }
    // ELIMINAR DEL CARRITO = CON FIND ENCUENTRA EL PRODUCTO QUE BUSCA POR ID Y SE ELIMINA DEL ARRAY CARRITO CON SPLICE
const deleteFromCart = (prodId) => {
        const item = carrito.find((prod) => prod.id === prodId)
        const indice = carrito.indexOf(item)
        carrito.splice(indice, 1)
        updateCart()
    }
    // ACA CREO UNA FUNCION QUE RECORRA EL CARRITO (LO QUE YA AGREGE) ARMANDO UN DIV NUEVO CON CADA 
    // PRODUCTO AGREGADO Y METIENDOLO EN EL MODAL
const updateCart = () => {
    // STRING VACIO PARA QUE NO SE ACUMULEN PRODUCTOS
    cartContent.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement("div")
        div.classList.add("d-flex")
        div.classList.add("mb-1")
        div.innerHTML = `
    <p class="px-1 border-dark border-opacity-50 border-end border-2">${prod.nombre}</p>
    <p class="px-1 border-dark border-opacity-50 border-end border-2">Precio: $${prod.precio}</p>
    <p class="px-1" id="cantidad">Cantidad: ${prod.cantidad}</p>
    <i class="ms-2 mt-1 fa-regular fa-trash-can" onclick="deleteFromCart(${prod.id})"></i>
    `
        cartContent.appendChild(div)
    })

    cartCounter.innerText = carrito.length;

    totalPrice.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}