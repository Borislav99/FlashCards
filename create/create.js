(function () {
 /* ---------- KLASE ---------- */
 class UI {
  //konstruktor
  constructor() {
   this.icon = appMenu.children[0].children[0];
   this.menu = document.querySelector(".menu");
  }
  //dobijanje vrijednosti na osnovu koje se radi funkcija hideShowMenu
  getValue() {
   let value;
   if (this.icon.classList.contains("down")) {
    value = "down";
   } else if (this.icon.classList.contains("up")) {
    value = "up";
   }
   return value;
  }
  //prikazi i sakrij meni na osnovu vrijednosti koje si dobio
  hideShowMenu(value) {
   if (value === "down") {
    //akcije sa ikonom
    this.icon.classList.remove("down", "fas", "fa-angle-down");
    this.icon.classList.add("up", "fas", "fa-angle-up");
    //akcije sa menijem
    this.menu.classList.remove("hidemenu");
    this.menu.classList.add("showmenu");
   } else if (value === "up") {
    //akcije sa ikonom
    this.icon.classList.remove("up", "fas", "fa-angle-up");
    this.icon.classList.add("down", "fas", "fa-angle-down");
    //akcije sa menijem
    this.menu.classList.add("hidemenu");
    this.menu.classList.remove("showmenu");
   }
  }
 }
 /* ---------- KLASE ---------- */

 /* ---------- VARIJABLE ---------- */
 let appMenu = document.querySelector(".appMenu");
 let ui = new UI();
 /* ---------- VARIJABLE ---------- */

 /* ---------- EVENTI ---------- */
 //prikazi i sakrij meni
 appMenu.addEventListener("click", (event) => {
  if (event.target.parentElement.classList.contains("openMenu")) {
   let value = ui.getValue();
   ui.hideShowMenu(value);
  } else if (event.target.classList.contains("appMenu")) {
   let value = ui.getValue();
   ui.hideShowMenu(value);
  }
 });
 /* ---------- EVENTI ---------- */
})();
/* -------------------- FORMATTING JS -------------------- */
(function(){
/* ---------- KLASE ---------- */
 class UI{
  constructor(){
   this.formatting = document.querySelector('.formatting');
   this.formattingText = document.querySelector('.formattingText');
   this.formattingIcons = document.querySelectorAll('.formatting_style');
  }
  //prikazi i sakrij dugme za formatiranje
  showHideFormatting(value){
   if(value==='true'){
    this.formatting.classList.remove('hide');
    this.formattingText.classList.add('hide');
   } else if (value==='false'){
    this.formatting.classList.add('hide');
    this.formattingText.classList.remove('hide');
   }
  }
  //onemoguci ikonice
  disableIcons(value){
   if(value==='true'){
    this.formattingIcons.forEach(icon => {
     icon.classList.add('disabled');
    })
   } else if(value==='false'){
    this.formattingIcons.forEach(icon => {
     icon.classList.remove('disabled');
    })
   }
  }
  //efekat aktivaranih ikonica
  activate(target){
   target.classList.toggle('activated');
  }
  //provjeri vrijednost za formatiranje
  valueCheck(target){
   let value;
   if (target.classList.contains('activated')) {
    value = 'true';
   } else if (!target.classList.contains('activated')) {
    value = 'false';
   } ;
   return value;
  }
  //formatiraj tekst
  formatText(value, italicValue,underline, target){
   //bold
   if(value==='true'){
    target.classList.add('bold');
   } else if(value==='false'){
    target.classList.remove('bold');
   }
   //italic
   if (italicValue === 'true') {
    target.classList.add('italic');
   } else if (italicValue === 'false') {
    target.classList.remove('italic');
   }
   //underline
   if (underline === 'true') {
    target.classList.add('underline');
   } else if (underline === 'false') {
    target.classList.remove('underline');
   }
  }
  //deaktiviraj ikonice
  deactivate() {
   this.formattingIcons.forEach(icon=>{
    icon.classList.remove('activated');
   })
  }
 };
/* ---------- KLASE ---------- */

/* ---------- VARIJABLE ---------- */
 let formattingBtn = document.querySelector('.lowerPart_formatting');
 let stackForm = document.querySelector('.stackForm');
 let stackInput = document.querySelector('.stackName');
 let taskInput = document.querySelector('.stackForm_input-task');
 let solutionInput = document.querySelector(".stackForm_input-solution");
 let bold = document.querySelector('.bold');
 let italic = document.querySelector('.italic');
 let list = document.querySelector('.list');
 let ui = new UI();
/* ---------- VARIJABLE ---------- */

/* ---------- EVENTI ---------- */
 formattingBtn.addEventListener('click', event=>{
  event.preventDefault();
  ui.showHideFormatting('true');
  if(event.target.parentElement.classList.contains('back')){
   ui.showHideFormatting('false');
  };
 })
 stackForm.addEventListener("click", event=>{
  event.preventDefault();
  if (event.target.classList.contains('stackForm_input-task')){
   ui.disableIcons('false');
  } else if (event.target.classList.contains('stackForm_input-solution')){
   ui.disableIcons('false');
  } else if(event.target.classList.contains('stackName')){
   ui.disableIcons('true');
  }
  //point
  else if(event.target.parentElement.classList.contains('bold')){
   ui.activate(event.target.parentElement);
  } else if(event.target.parentElement.classList.contains('italic')){
   ui.activate(event.target.parentElement);
  } else if(event.target.classList.contains('list')){
   ui.activate(event.target);
  }
  //submit
  else if (event.target.classList.contains('lowerPart_submit')){
   let stackNameValue = stackInput.value;
   let stackTaskValue = taskInput.value;
   let stackSolutionValue = solutionInput.value;
   console.log(stackNameValue);
   console.log(stackTaskValue);
   console.log(stackSolutionValue);
  }
 });
 taskInput.addEventListener('keyup', ()=>{
  let length = taskInput.value.length;
  if(length>0){
   //bold
   let value = ui.valueCheck(bold);
   //italic
   let italicValue = ui.valueCheck(italic);
   //underline
   let underline = ui.valueCheck(list);
   ui.formatText(value, italicValue, underline, taskInput);
  } else{
   taskInput.classList.remove('underline', 'bold', 'italic');
   ui.deactivate();
  }
 });
 solutionInput.addEventListener('keyup', ()=>{
  let length = solutionInput.value.length;
  if (length > 0) {
   //bold
   let value = ui.valueCheck(bold);
   //italic
   let italicValue = ui.valueCheck(italic);
   //underline
   let underline = ui.valueCheck(list);
   ui.formatText(value, italicValue, underline, solutionInput);
  } else {
   solutionInput.classList.remove('underline', 'bold', 'italic');
   ui.deactivate();
  }
 })
 stackInput.addEventListener('click', ()=>{
  ui.deactivate();
 })
/* ---------- EVENTI ---------- */
})()
/* -------------------- FORMATTING JS -------------------- */