/* Varuable to Target the Form ******************************************/

var myForm = document.forms.regForm;

/********************************************************************** */

/*initial Value of div Id */

var divId = 1;
var thisDivIdStored ;

/********************************************************************** */

/*Prevent Form Default */

function handleForm(event) {
  event.preventDefault();
}

myForm.addEventListener("submit", handleForm);

/********************************************************************* */

/* Click Listner Function of Add Button and Edit Button ********************************/

myForm.addEventListener("submit", function() {
 
  /* Because I have two buttons with type submit i used If 
  tw selcet the right action on submit   */

  if (myForm.getAttribute("name")=== "add") /* As form have attribute "name = "add" by default this will Work 
  only if add button Clicked*/
  {
  
  var userNameVal = myForm.userName.value; /* to get the user name value */
  var positionVal = myForm.position.value; /* to get the Position value */

  var usersCont = document.getElementById("newContainer");  /* to Target the main container of added divs */

  /* All Next steps to Append the New Div */

  var regUser = document.createElement("div"); 
  regUser.classList.add("item");
  regUser.setAttribute("id", "div" + divId); /* To Create new id to each div */
  regUser.innerHTML =
    `<h2 class="item_input">` +
    userNameVal +
    `</h2><h3 class="item_input">` +
    positionVal +
    `</h3><button class="edit" onClick="edit(this)" >EDIT</button><button class="remove"
    onClick="remove(this)" >REMOVE</button>`;
 
  usersCont.appendChild(regUser);

  /* End of Append Steps */ 


  usersCont.insertBefore(regUser, usersCont.firstChild);  /* To Add New Div On Top */
  divId++; /* To increase div Id after Adding New Div */
  document.getElementById("regForm").reset();  /* To Clear Form After Adding New Child */

}
else {  /*This Will Work only if Edit Button Clicked  and after changing form ttribute 
  "name = "add" to name = "edit"  by below edit function*/
  
  var editUserVal = myForm.userName.value ; /* This Will Get the value of name 
  from bottom Edit function and add it to form again*/

  var editPositionVal = myForm.position.value ;/* This Will Get the value of Position 
  from bottom Edit function and add it to form again */

  myCurrentDiv = document.getElementById(thisDivIdStored); /* this will obtain Which child the user selected to edit and will get its value from edit function */

  myCurrentDiv.querySelector("h2").innerText = editUserVal ; /* this will return the new edited value to the same child */
  myCurrentDiv.querySelector("h3").innerText = editPositionVal ;/* this will return the new edited value to the same child */

  document.getElementById("regForm").reset(); /* this will clear form after editing */

  /* this will return add button after Editing */

  var getAddButton = document.getElementById("addBtn"); 
  getAddButton.classList.remove("hideAddbtn");

  /*this will hide edit button after one click on it */

  var getEditButton = document.getElementById("editBtn");
  getEditButton.classList.remove("viewEditBtn");

  /* this will return form default action */
  myForm.setAttribute("name","add");
 
}

});

/******************************************************************** */

/* Cancel Button OnClick Function *************************************/

function resetForm() {
  document.getElementById("regForm").reset();
}

/******************************************************************** */

/* Remove Button Onclick Function *********************************** */

function remove(item) {
  var removeItem = item;
  removeItem.parentNode.remove();
}

/**Edit Button onClick Function**************************************************** */

function edit(elem) {

  /* this will hide add button from form and edit button will appeaer */

  var getAddButton = document.getElementById("addBtn");
  getAddButton.classList.add("hideAddbtn");

  var getEditButton = document.getElementById("editBtn");
  getEditButton.classList.add("viewEditBtn");

  /*********** */

  /* to Obtain which Child Div  we are working on it  */

  var editItem = elem;

  thisDivIdStored = editItem.parentNode.getAttribute("id");

  catchParent = document.getElementById(thisDivIdStored);

  /************ */

  /** to copy the data inside selected edit child div to the form  */
  var thisDivNameValue = catchParent.querySelector("h2").innerText;
  var thisDivPositionValue = catchParent.querySelector("h3").innerText;

  myForm.userName.value = thisDivNameValue;
  myForm.position.value = thisDivPositionValue;

  /************ */

  /**this to change the default action of submit click Listner to run edit function not add function */
  myForm.setAttribute("name","edit");
}

/****************************************************************** */
