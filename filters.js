import {
    onGetTasks,
} from "./firebase.js";

    window.addEventListener("DOMContentLoaded", async () => {
        onGetTasks(() => {

            const cerveza = document.querySelectorAll(".Cerveza")
            const bebidaBlanca = document.querySelectorAll(".Bebidablanca")
            const licor = document.querySelectorAll(".Licor")                

            nuestrasCervezasBtn.addEventListener("click", () => {
                onStockText.innerHTML="CERVEZAS"
                updateFilter()
                bebidaBlanca.forEach((e)=>{
                e.classList.add("hideContent1")
            })
                licor.forEach((e)=>{
                e.classList.add("hideContent1")
            })
        })
            bebidasBlancasBtn.addEventListener("click", () => {
                onStockText.innerHTML="BEBIDA BLANCA"
                updateFilter()
                cerveza.forEach((e)=>{
                e.classList.add("hideContent1")
            })
                licor.forEach((e)=>{
                e.classList.add("hideContent1")
            })
        })
            licoresBtn.addEventListener("click", () => {
                onStockText.innerHTML="LICORES"
                updateFilter()
                cerveza.forEach((e)=>{
                e.classList.add("hideContent1")
            })
                bebidaBlanca.forEach((e)=>{
                e.classList.add("hideContent1")
            })
        })
        const updateFilter = ()=>{
            const update = document.querySelectorAll(".hideContent1")
            update.forEach((e)=>{
            e.classList.remove("hideContent1")
            });
        }
    })    
})
