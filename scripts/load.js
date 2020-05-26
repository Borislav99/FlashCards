/* -------------------- LOAD JS -------------------- */
(function () {
 /* ------------------------------ KLASE ------------------------------ */
 /* ---------- KLASA UI ---------- */
 class UI {
   //napravi stackove iz local storaga
  createStack(stack) {
   let div = document.createElement('div');
   div.classList.add('singleStack');
   div.innerHTML = `
    <h3 class="singleStack_name" data-id='${stack.id}'>${stack.name}</h3>
  <h4 class="singleStack_taskNumber">Number of tasks: <span class="taskNumber">${stack.tasks.length}</span></h4>
  <div class="singleStack_buttons" data-id='${stack.id}'>
   <a href='#'class="singleStack_button btnStudy">Study</a>
   <a href='#'class="singleStack_button btnEdit">Edit</a>
   <a href='#'class="singleStack_button btnDelete">Delete</a>
  </div>
  `;
   stackArea.appendChild(div);
  }
  deleteStack(target, id){
    this.deleteFromDOM(target);
    this.deleteFromLS(id);
  }
  deleteFromDOM(target){
    stackArea.removeChild(target);
  }
  deleteFromLS(id){
    let storage = Storage.getStorage();
    let filteredStorage = Storage.filterStorage(storage, id);
    Storage.updateStorage(filteredStorage)
  }
 }
 /* ---------- KLASA UI ---------- */

/* ---------- KLASA STORAGE ---------- */
class Storage{
  static getStorage(){
    let list = JSON.parse(localStorage.getItem('stack'));
    return list;
  }
  static filterStorage(storage, id){
    let filter = storage.filter(function(item){
      return item.id !== id
    });
    return filter
  }
  static updateStorage(storage){
    localStorage.setItem('stack', JSON.stringify(storage))
  }
}
/* ---------- KLASA STORAGE ---------- */

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
 stackArea.addEventListener('click', event=>{
   //brisanje
   if(event.target.classList.contains('btnDelete')){
     let id = parseInt(event.target.parentElement.parentElement.children[0].dataset.id);
     let target = event.target.parentElement.parentElement;
     ui.deleteStack(target, id)
   }
 })
 /* ---------- EVENTI ---------- */
})()
/* -------------------- LOAD JS -------------------- */