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
  editStack(id){
    let stackName = Storage.getStackName(id);
    this.setDataID(true, id);
    modalInput.value = stackName;
    this.openCloseModal('open');
  }
  setDataID(value, id){
    if(value===true){
      modalDetails.setAttribute('data-id', id);
    } else if(value===false){
      modalDetails.setAttribute('data-id', "");
    }
  }
   openCloseModal(value){
    if(value==='open'){
      modal.classList.remove('hide');
      modal.classList.add('show');
    } else if(value==='close'){
      modal.classList.add('hide');
      modal.classList.remove('show');
      this.setDataID(false)
    }
  }
  deleteFromDOM(target){
    stackArea.removeChild(target);
  }
  deleteFromLS(id){
    let storage = Storage.getStorage();
    let filteredStorage = Storage.filterStorage(storage, id);
    Storage.updateStorage(filteredStorage)
  }
  editModal(name, id){
    Storage.findStack(id, name);
    this.openCloseModal('close');
    location.reload();
  }
  updateTasks(id){
    localStorage.setItem('stackID', JSON.stringify(id));
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
  static getStackName(id) {
    let list = Storage.getStorage();
    let specificStack = list.filter(function(item){
      return item.id === id
    });
    let stackName = Storage.capitalize(specificStack[0].name)
    return stackName;
  }
  static capitalize(str) {
    str = str.split(" ");
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }
  static findStack(id, name){
    let list = Storage.getStorage();
    let specificStack = list.filter(function (item) {
      return item.id === id
    })[0];
    specificStack.name = name.toLowerCase();
    Storage.replaceStack(id, specificStack)
  }
  static replaceStack(id, stack){
    let list = Storage.getStorage();
    let filter = Storage.filterStorage(list, id);
    filter.push(stack)
    localStorage.setItem('stack', JSON.stringify(filter))
  }
}
/* ---------- KLASA STORAGE ---------- */

 /* ------------------------------ KLASE ------------------------------ */

 /* ---------- VARIJABLE ---------- */
let storageItems = JSON.parse(localStorage.getItem('stack'));
let stackArea = document.querySelector(".stackArea");
let modal = document.querySelector('.modal');
let closeModalBtn = document.querySelector('.close');
let modalInput = document.querySelector('.modal_input');
let modalDetails = document.querySelector('.modal_details');
let editModal = document.querySelector(".modal_btn");
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
   } else if(event.target.classList.contains('btnEdit')){
     let id = parseInt(event.target.parentElement.parentElement.children[0].dataset.id);
     ui.editStack(id)
   }
   else if(event.target.classList.contains('btnStudy')){
     let id = parseInt(event.target.parentElement.parentElement.children[0].dataset.id);
  ui.updateTasks(id);
  window.location.replace("../task_list/tasks.html");
   }
 })
 closeModalBtn.addEventListener('click', ()=>{
   ui.openCloseModal('close');
 })
 editModal.addEventListener('click', event =>{
   let stackName = event.target.parentElement.children[1].value;
   let stackID = parseInt(event.target.parentElement.dataset.id);
   ui.editModal(stackName, stackID);
 })
 /* ---------- EVENTI ---------- */
})()
/* -------------------- LOAD JS -------------------- */