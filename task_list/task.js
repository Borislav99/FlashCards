/* -------------------- TASK JS -------------------- */
(function(){

/* ------------------------------ KLASE ------------------------------ */

/* ---------- KLASA UI ---------- */
class UI{
  //funkcija odgovorna za prikazivanje taskova unutar stacka
listAllTasks(stack){
 let taskList = stack.tasks;
 taskList.forEach(item=>{
  let questionStyles = item.taskStyles.slice(21).trim();
  let answerStyles = item.solutionStyles.slice(25).trim();
  let div = document.createElement('div');
  div.classList.add('singleTask');
  div.innerHTML = `
         <h3 class="singleTask_name ${questionStyles}" data-id='${item.id}'>${item.taskValue}</h3>
         <h4 class="singleTask_taskNumber ${answerStyles} hide">${item.solutionValue}</h4>
       <div class="singleTask_buttons" data-id='${item.id}'>
        <a href='#' class="singleTask_button btnShow">Show</a>
        <a href='#' class="singleTask_button btnEdit">Edit</a>
        <a href='#' class="singleTask_button btnDelete">Delete</a>
       </div>
  `;
  taskArea.appendChild(div);
 })
}
showAnswer(answer, btn){
  if(answer.classList.contains('hide')){
    answer.classList.remove('hide');
    btn.textContent = 'HIDE';
  } else {
    answer.classList.add('hide');
    btn.textContent = 'SHOW';
  }
}
}
class Storage{
  //funkcija za dobijanje stack id-ja, vazna je zbog toga sto otvaras novu stranicu tasks.html i na osnovu tog idija izlistavas stackove
 static getID(){
  let id = JSON.parse(localStorage.getItem('stackID'));
  return id;
 }
 //pronadji stack koji odgovora id-ju iz local storaga
 static findValidStack(id){
  let stack = Storage.getStackStorage();
  let validStack = Storage.filterStack(stack, id);
  return validStack;
 }
 //sve vrijednosti stackova, vazno je zbog filtriranja stackova
 static getStackStorage(){
  let stackStorage = JSON.parse(localStorage.getItem('stack'));
  return stackStorage;
 }
 //filtriranje stackova
 static filterStack(stack, id){
  let validStack = stack.find(item=>{
   if(item.id === id){
    return item;
   }
  });
  return validStack;
 }
}
/* ---------- KLASA UI ---------- */

/* ------------------------------ KLASE ------------------------------ */

/* ------------------------------ VARIJABLE ------------------------------ */
let taskArea = document.querySelector('.taskArea');
let ui = new UI();
/* ------------------------------ VARIJABLE ------------------------------ */

/* ------------------------------ EVENTI ------------------------------ */
document.addEventListener('DOMContentLoaded', ()=>{
 let stackID = Storage.getID();
 let stack = Storage.findValidStack(stackID);
 ui.listAllTasks(stack);
})
taskArea.addEventListener('click', event=>{
  if(event.target.classList.contains('btnShow')){
    let showBtn = event.target;
    let answer = event.target.parentElement.parentElement.children[1];
    ui.showAnswer(answer, showBtn);
  } else if(event.target.classList.contains('btnDelete')){
    let id = parseInt(event.target.parentElement.dataset.id);
    console.log(id);
  }
})
/* ------------------------------ EVENTI ------------------------------ */
})()
/* -------------------- TASK JS -------------------- */