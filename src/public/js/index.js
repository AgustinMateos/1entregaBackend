
const itemTableContent = document.getElementById("itemTableContent");
const socket = io();
socket.emit("messaje", "Conectado con el Cliente por Sockets");

socket.on("estado", (data) => {
    console.log(data);
});

const cargarDom = (prod) => {
    itemTableContent.innerHTML += `
  <tr>
  <td>${prod.id}</td>
  <td >${prod.title}</td>
  <td >${prod.author}</td>
  <td >${prod.description}</td>
  <td>${prod.price}</td>
  <td>${prod.category}</td>
  <td>
  <img  src=${prod.thumbnail}></td>
  <td>${prod.code}</td>
  <td>${prod.stock}</td>
  </tr>
  `;
};


//Eliminar por ID
// const btnEliminar= document.getElementById("btnEliminar");


btnEliminar.addEventListener("click", (e) => {
    e.preventDefault();
    let id = document.getElementById("productDelete").value;
    socket.emit("deleteProduct", id);
});

socket.on("deleteProduct", (data) => {
    itemTableContent.innerHTML = "";
    data.products.forEach((prod) => {
        cargarDom(prod);
    });
});