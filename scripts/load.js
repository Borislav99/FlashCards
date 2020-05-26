/* -------------------- LOAD JS -------------------- */
(function () {
 /* ------------------------------ KLASE ------------------------------ */
 /* ---------- KLASA UI ---------- */
 class UI {
  createStack(stack) {
   let div = document.createElement('div');
   div.classList.add('singleStack');
   div.innerHTML = `
    <h3 class="singleStack_name" data-id='${stack.id}'>${stack.name}</h3>
  <h4 class="singleStack_taskNumber">Number of tasks: <span class="taskNumber">${stack.tasks.length}</span></h4>
  <div class="singleStack_buttons" data-id='${stack.id}'>
   <a href='#'class="singleStack_button">Study</a>
   <a href='#'class="singleStack_button">Edit</a>
   <a href='#'class="singleStack_button">Delete</a>
  </div>
  `;
   stackArea.appendChild(div);
  }
 }
 /* ---------- KLASA UI ---------- */

 /* ------------------------------ KLASE ------------------------------ */

 /* ---------- VARIJABLE ---------- */
 let storageItems = JSON.parse(localStorage.getItem('stack'));
 let stackArea = document.querySelector(".stackArea");
 let ui = new UI();
 /* ---------- VARIJABLE ---------- */
 /* ---------- EVENTI ---------- */
 if (localStorage.getItem('stack')) {
  document.addEventListener('DOMContentLoaded', () => {
   storageItems.forEach(item => {
    ui.createStack(item);
   })
  })
 }
 /* ---------- EVENTI ---------- */
})()
/* -------------------- LOAD JS -------------------- */