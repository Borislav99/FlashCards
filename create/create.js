/* ------------------------------------------------------------ FORMATTING JS ------------------------------------------------------------*/
(function () {
  /* ------------------------------ KLASE ------------------------------ */

  /* ---------- KLASA UI ---------- */
  class UI {
    constructor() {
      this.formatting = document.querySelector(".formatting");
      this.formattingText = document.querySelector(".formattingText");
      this.formattingIcons = document.querySelectorAll(".formatting_style");
    }
    //prikazi i sakrij dugme za formatiranje
    showHideFormatting(value) {
      if (value === "true") {
        this.formatting.classList.remove("hide");
        this.formattingText.classList.add("hide");
      } else if (value === "false") {
        this.formatting.classList.add("hide");
        this.formattingText.classList.remove("hide");
      }
    }
    //onemoguci ikonice
    disableIcons(value) {
      if (value === "true") {
        this.formattingIcons.forEach((icon) => {
          icon.classList.add("disabled");
        });
      } else if (value === "false") {
        this.formattingIcons.forEach((icon) => {
          icon.classList.remove("disabled");
        });
      }
    }
    //efekat aktivaranih ikonica
    activate(target) {
      target.classList.toggle("activated");
    }
    //provjeri vrijednost za formatiranje
    valueCheck(target) {
      let value;
      if (target.classList.contains("activated")) {
        value = "true";
      } else if (!target.classList.contains("activated")) {
        value = "false";
      }
      return value;
    }
    //formatiraj tekst
    formatText(value, italicValue, underline, target) {
      //bold
      if (value === "true") {
        target.classList.add("bold");
      } else if (value === "false") {
        target.classList.remove("bold");
      }
      //italic
      if (italicValue === "true") {
        target.classList.add("italic");
      } else if (italicValue === "false") {
        target.classList.remove("italic");
      }
      //underline
      if (underline === "true") {
        target.classList.add("underline");
      } else if (underline === "false") {
        target.classList.remove("underline");
      }
    }
    //deaktiviraj ikonice
    deactivate() {
      this.formattingIcons.forEach((icon) => {
        icon.classList.remove("activated");
      });
    }
    //kada je duzina veca od 0 onda da se primjenjuje formatiranje
    validateInput(target) {
      let length = target.value.length;
      if (length > 0) {
        //bold
        let value = this.valueCheck(bold);
        //italic
        let italicValue = this.valueCheck(italic);
        //underline
        let underline = this.valueCheck(list);
        this.formatText(value, italicValue, underline, target);
      } else {
        target.classList.remove("underline", "bold", "italic");
        this.deactivate();
      }
    }
    //funkcija koja pravi stack, ukoliko se stack vec nalazi unutar localStoraga onda samo prikaze taj stack o kome se radi
    createStack(stackName, task, solution) {
      let taskSolution = Storage.createTaskSolution(task, solution);
      let value = Storage.checkForStack(stackName);
      //validacija inputa
      let validator = this.validateAll(stackName, task.value, solution.value);
      let validatorLength = validator.length;
      //prikazati feedback
      if (validatorLength > 0) {
        this.showFeedback('negative', validator);
        this.clearFields();
      }
      //napraviti stack
      else {
        //napravi novi stack
        if (value === false || value === undefined) {
          this.showFeedback('new');
          Storage.addNewStack(stackName, taskSolution);
        }
        //prikazi upisani stack
        else {
          Storage.addToExistingStack(stackName, taskSolution);
        }
        this.clearFields();
      }
    }
    //funkcija koja radi validaciju inputa, ukoliko jedan od inputa nije ispunjen ne moze se nastaviti dalje
    validateAll(stackName, task, solution) {
      let stackNameValue = this.validateInstance(stackName);
      let taskValue = this.validateInstance(task);
      let solutionValue = this.validateInstance(solution);
      let validatorObject = {
        stackNameValue,
        taskValue,
        solutionValue,
      };
      let validatorArr = Object.values(validatorObject);
      let result = [];
      validatorArr.forEach((item, index) => {
        if (item === false) {
          result.push(`Please enter value for ${index}`);
        }
      });
      return result;
    }
    //pojedinacna validacija
    validateInstance(value) {
      if (value.length === 0 || value === "") {
        return false;
      } else {
        return true;
      }
    }
    showFeedback(value, validator) {
      if(value==='negative'){
        let validatorTextArr = this.getValidatorText(validator);
        this.validateFields(validatorTextArr);
        feedback.classList.remove("hide");
        feedback.classList.add("show");
        submitBtn.classList.add("disabled");
        validatorTextArr.forEach((item) => {
          feedback.innerHTML += `
          <p>${item}</p>
          `;
        });
        setTimeout(() => {
          feedback.classList.add("hide");
          feedback.classList.remove("show");
          submitBtn.classList.remove("disabled");
          feedback.innerHTML = "";
        }, 3000);
      } else if(value==='new'){
        feedback.classList.remove("hide");
        feedback.classList.add("positiveFeedback");
        submitBtn.classList.add("disabled");
        feedback.innerHTML = `
        <p>New Stack Added</p>
        `;
        setTimeout(() => {
          feedback.classList.add("hide");
          feedback.classList.remove("positiveFeedback");
          submitBtn.classList.remove("disabled");
          feedback.innerHTML = "";
        }, 3000);
      } else if(value==='update'){
        feedback.classList.remove("hide");
        feedback.classList.add("positiveFeedback");
        submitBtn.classList.add("disabled");
        feedback.innerHTML = `
        <p>${validator.toUpperCase()} stack updated</p>
        `;
        setTimeout(() => {
          feedback.classList.add("hide");
          feedback.classList.remove("positiveFeedback");
          submitBtn.classList.remove("disabled");
          feedback.innerHTML = "";
        }, 3000);
      }
    }
    getValidatorText(validator) {
      let filteredValidator = validator.map((item) => {
        if (item === "Please enter value for 0") {
          return "Please enter value for Stack Name";
        }
        if (item === "Please enter value for 1") {
          return "Please enter value for Task";
        }
        if (item === "Please enter value for 2") {
          return "Please enter value for Solution";
        }
      });
      return filteredValidator;
    }
    validateFields(validator){
      if (validator.includes('Please enter value for Stack Name')){
        this.pleaseValidate(stackInput)
      } if (validator.includes('Please enter value for Task')) {
        this.pleaseValidate(taskInput)
      } if (validator.includes('Please enter value for Solution')) {
        this.pleaseValidate(solutionInput)
      } 
    }
    pleaseValidate(field){
      field.classList.add('validateThis');
      setTimeout(()=>{
        field.classList.remove('validateThis');
      },3000)
    }
    clearFields() {
      stackInput.value = "";
      taskInput.value = "";
      solutionInput.value = "";
      this.validateInput(taskInput);
      this.validateInput(solutionInput);
      this.showHideFormatting("false");
    }
  }
  /* ---------- KLASA UI ---------- */

  /* ---------- KLASA STORAGE ---------- */

  class Storage {
    constructor(){
      let ui = new UI();
    }
    //prikazi informacije vezena za stack u localstoragu
    static getAllInfo() {
      return JSON.parse(localStorage.getItem("stack"));
    }
    //funkcija koja pravi objekat za task i solution
    static createTaskSolution(task, solution) {
      let taskValue = task.value;
      let solutionValue = solution.value;
      let taskStyles = task.getAttribute("class");
      let solutionStyles = solution.getAttribute("class");
      let taskSolutionObject = {
        taskValue,
        solutionValue,
        taskStyles,
        solutionStyles,
        id: 0,
      };
      return taskSolutionObject;
    }
    //funkcija koja vraca vrijednost na osnovu koje znamo da li se stack pravi ili ne
    static checkForStack(stackName) {
      if (localStorage.getItem("stack")) {
        let list = Storage.getAllInfo();
        let value = list.some((someItem) => {
          if (someItem.name === stackName) {
            return true;
          } else {
            return false;
          }
        });
        return value;
      }
    }
    //dobijanje ida za pravljenje stacka
    static getID() {
      let id;
      if (localStorage.getItem("stack")) {
        let list = Storage.getAllInfo();
        let allIDs = [];
        list.forEach((item) => {
          allIDs.push(item.id);
        });
        let max = Math.max(...allIDs);
        id = max + 1;
      } else {
        id = 0;
      }
      if (id === -Infinity) {
        id = 0;
      }
      return id;
    }
    //funkcija koja pravi novi stack
    static addNewStack(stackName, taskSolution) {
      let id = Storage.getID();
      let object = {
        name: stackName,
        id,
        tasks: [taskSolution],
      };
      let list;
      if (localStorage.getItem("stack")) {
        list = Storage.getAllInfo();
      } else {
        list = [];
      }
      list.push(object);
      localStorage.setItem("stack", JSON.stringify(list));
    }
    //funkcija koja dodaje u postojeci stack
    static addToExistingStack(stackName, taskSolution) {
      let list = Storage.getAllInfo();
      let existingStack = list.find((item) => {
        if (item.name === stackName) {
          return item;
        }
      });
      ui.showFeedback('update', existingStack.name);
      let allTasks = existingStack.tasks;
      let id = Storage.findTaskSolutionID(allTasks);
      Storage.updateExistingStack(
        id,
        taskSolution,
        allTasks,
        existingStack,
        list
      );
    }
    //funkcija za pronalazenje id od postojecih stackova
    static findTaskSolutionID(allTasks) {
      let allIDs = [];
      allTasks.forEach((item) => {
        allIDs.push(parseInt(item.id));
      });
      let id = Math.max(...allIDs) + 1;
      return id;
    }
    //funkcija za update postojecih stackova
    static updateExistingStack(
      id,
      taskSolution,
      allTasks,
      existingStack,
      list
    ) {
      taskSolution.id = id;
      allTasks.push(taskSolution);
      existingStack.tasks = allTasks;
      let filter = list.filter((item) => {
        return item.id !== existingStack.id;
      });
      let updatedList = filter.concat(existingStack);
      localStorage.setItem("stack", JSON.stringify(updatedList));
    }
  }

  /* ---------- KLASA STORAGE ---------- */

  /* ------------------------------ KLASE ------------------------------ */

  /* ------------------------------ VARIJABLE ------------------------------ */

  let formattingBtn = document.querySelector(".lowerPart_formatting");
  let submitBtn = document.querySelector(".lowerPart_submit");
  let stackForm = document.querySelector(".stackForm");
  let stackInput = document.querySelector(".stackName");
  let taskInput = document.querySelector(".stackForm_input-task");
  let solutionInput = document.querySelector(".stackForm_input-solution");
  let bold = document.querySelector(".bold");
  let italic = document.querySelector(".italic");
  let list = document.querySelector(".list");
  let feedback = document.querySelector(".feedback");
  let ui = new UI();

  /* ------------------------------ VARIJABLE ------------------------------ */

  /* ------------------------------ EVENTI ------------------------------ */

  //event za prikaz i sakrivanje dugmeta za formatiranje
  formattingBtn.addEventListener("click", (event) => {
    event.preventDefault();
    ui.showHideFormatting("true");
    if (event.target.parentElement.classList.contains("back")) {
      ui.showHideFormatting("false");
    }
  });
  //eventi za formu stacka
  stackForm.addEventListener("click", (event) => {
    event.preventDefault();
    //ukoliko pritisnes na task ili solution da se enabluju ikonice za formatiranje
    if (
      event.target.classList.contains("stackForm_input-task") ||
      event.target.classList.contains("stackForm_input-solution")
    ) {
      ui.disableIcons("false");
    }
    //ukoliko pritisnes na stack name da se disabluju ikonice
    else if (event.target.classList.contains("stackName")) {
      ui.disableIcons("true");
    }
    //prikazi da je pritisnuto za bold i italic
    else if (
      event.target.parentElement.classList.contains("bold") ||
      event.target.parentElement.classList.contains("italic")
    ) {
      ui.activate(event.target.parentElement);
    }
    //prikazi da je pritisnuto za underline
    else if (event.target.classList.contains("list")) {
      ui.activate(event.target);
    }
    //submit
    else if (event.target.classList.contains("lowerPart_submit")) {
      let stackNameValue = stackInput.value.toLowerCase().trim();
      //funkcija koja sluzi da se pravi stack
      ui.createStack(stackNameValue, taskInput, solutionInput);
    }
  });
  //event da pocne formatiranje ako je duzina inputa veca od 0 za task
  taskInput.addEventListener("keyup", () => {
    ui.validateInput(taskInput);
  });
  //event da pocne formatiranje ako je duzina inputa veca od 0 za solution
  solutionInput.addEventListener("keyup", () => {
    ui.validateInput(solutionInput);
  });
  //skini prikaz da je pritisnuto sa svega
  stackInput.addEventListener("click", () => {
    ui.deactivate();
  });

  /* ------------------------------ EVENTI ------------------------------ */
})();

/* ------------------------------------------------------------ FORMATTING JS ------------------------------------------------------------*/
