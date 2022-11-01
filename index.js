import {
    saveTask,
    getTasks,
    onGetTasks,
    getTask
} from "./firebase.js";

// EN ESTE ARRAY VOY A IR AGREGANDO MI CARRITO CUANDO PRESIONEN ADD
let carrito = []

window.addEventListener("DOMContentLoaded", async() => {
    onGetTasks((querySnapshot) => {
            let html = "";
            // ESTE CODIGO CREA UN DIV PARA CADA PRODUCTO QUE TENGO EN EL STOCK
            querySnapshot.forEach((doc) => {
                const task = doc.data();
                html += `
            <div class="card mt-4 ${task.type}" data-id="${task.id}" style="width: 18rem;">
            <img src="${task.img}" class="card-img-top mh-100" alt="">
            <h3 class="text-center fw-normal fs-5">${task.title}</h3>
            <p class="text-center fw-bold fs-5">$${task.price}</p>
            <button type="button" data-id="${doc.id}" class="btn btn-dark addBtn mb-2">ADD <i class="fa-solid fa-cart-shopping"></i></button>
            </div>
            `;
            });
            // Y ACA LO AÑIDA AL CONTENEDOR LLAMADO AL PRINCIPIO
            tasksContainer.innerHTML = html;

            // ACA LLAMO A LA BASE DE DATOS Y BUSCO EL PRODUCTO POR EL ID PARA AGREGARLO AL ARRAY CARRITO
            const addBtn = tasksContainer.querySelectorAll(`.addBtn`);
            addBtn.forEach((btn) => {
                btn.addEventListener("click", async(e) => {
                    const doc = await getTask(e.target.dataset.id)
                    const prod = doc.data();
                    carrito.push(prod)
                    updateCart()
                    console.log(carrito)
                })
            })
        
            const updateCart = () => {
                    // STRING VACIO PARA QUE NO SE ACUMULEN PRODUCTOS
                    cartContent.innerHTML = ""
                        // ACA CREO UNA FUNCION QUE RECORRA EL ARRAY CARRITO (LO QUE YA AGREGE) ARMANDO UN DIV NUEVO CON CADA 
                        // PRODUCTO AGREGADO Y METIENDOLO EN EL MODAL
                    carrito.forEach((prod) => {
                        const div = document.createElement("div")
                        div.classList.add("d-flex")
                        div.classList.add("mb-1")
                        div.innerHTML = `
            <p class="px-1 border-dark border-opacity-50 border-end border-2">${prod.title}</p>
            <p class="px-1 border-dark border-opacity-50 border-end border-2">Precio: $${prod.price}</p>
            <p class="px-1" id="cantidad">Cantidad: 1 </p>
            `
                        cartContent.appendChild(div)
                    })
                    cartCounter.innerText = carrito.length;
                    totalPrice.innerText = carrito.reduce((acc, prod) => acc + parseInt(prod.price), 0)
                }
                // HAGO QUE EL BOTON VACIAR CARRITO FUNCIONE
            emptyCart.addEventListener("click", () => {
                carrito.length = 0
                updateCart()
            })

            buy.addEventListener("click",()=>{
                cartContent.innerHTML=`
                <div class="alert alert-success" role="alert">
                Nos comunicaremos para coordinar el envio ¡Gracias por la compra!
                </div>
                `
                })
            })
        
            // DATOS DE LOGIN
            logInBtn.addEventListener("click", () => {
                    impContent.classList.add("hideContent")
                    formulario.classList.remove("hideContent")
                    onStockText.classList.add("hideContent")
                    header.classList.add("hideContent")
                })
                //AQUI VALIDO LOS DATOS DEL FORM
            formulario.addEventListener("submit", function(e) {
                e.preventDefault();
                let mail = document.getElementById("exampleInputEmail1").value;
                let password = document.getElementById("exampleInputPassword1").value;
                // AL TERMINAR DE TRAER LOS DATOS DEL FORM LOS VALIDO QUE SEAN CORRECTOS
                if (mail === "mati@gmail.com" & password === "mati123") {
                    formulario.classList.add("hideContent")
                    impContent.classList.remove("hideContent")
                    addDisabled.classList.remove("disabled")
                    onStockText.classList.remove("hideContent")
                    header.classList.remove("hideContent")
                    logInBtn.classList.add("disabled")
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: '¡Login succes! ADD button enabled',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else { Swal.fire('contraseña incorrecta') }
            })
        })

    setTimeout(carga, 2700)

    function carga() {
        loader.remove()
    }

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskForm[`task-title`];
    const id = taskForm[`product-id`];
    const price = taskForm[`product-price`]
    const img = taskForm[`product-img`]
    const type = taskForm[`product-type`]
    saveTask(title.value, id.value, price.value, img.value, type.value);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your product has been saved',
        showConfirmButton: false,
        timer: 1500
    })
    taskForm.reset();
})
