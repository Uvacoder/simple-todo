$(document).ready(function() {
  // done and remove icons
  var completeIcon = '<i class="fa fa-check fa-2x" aria-hidden="true"></i>'
  var removeIcon = '<i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>'
  // adds the input to a task on click of add button
  document.getElementById('add').addEventListener('click', function() {
    var todoInput = document.getElementById('todoInput');
    var value = todoInput.value;
    if (value) {
      addTask(value);
    }

  });

  //adds a task to list
   function addTask(item) {
     var list = document.getElementById('todolist');

     var task = document.createElement('li');
     var msg = document.createElement('p');
     msg.innerText = item;

     var buttons = document.createElement('div');
     buttons.classList.add('buttons');

     var complete = document.createElement('button');
     complete.classList.add('complete');
     complete.innerHTML = completeIcon;
     complete.addEventListener('click',completeTask);

     var remove = document.createElement('button');
     remove.classList.add('remove');
     remove.innerHTML = removeIcon;
     remove.addEventListener('click',removeTask);

     buttons.appendChild(complete);
     buttons.appendChild(remove);
     task.appendChild(msg);
     task.appendChild(buttons);


     list.insertBefore(task,list.childNodes[0]);
     document.getElementById('todoInput').value='';
   }

   //completes a task
   function completeTask() {
     var doneList = document.getElementById('donelist');
     var doneTask = document.createElement('li');
     doneTask.classList.add('done-tasks');

     var complete = document.createElement('button');
     complete.classList.add('completed');
     complete.innerHTML = completeIcon;

     var doneItem = this.parentNode.parentNode;
     var mainItem = doneItem.childNodes[0];

     doneTask.appendChild(complete);
     doneTask.appendChild(mainItem);
     doneList.insertBefore(doneTask,doneList.childNodes[0]);

     var doneParent = doneItem.parentNode;
     doneParent.removeChild(doneItem);

   }

   //removes a task
   function removeTask() {
     var item = this.parentNode.parentNode;
     var parent = document.getElementById('todolist');
     parent.removeChild(item);

   }

  var delBtn = document.getElementById('delAll');
  delBtn.addEventListener('click',removeDoneTask);
  //remove done task
  function removeDoneTask() {
    var doneList = document.getElementById('donelist');

    while (doneList.hasChildNodes()) {
      doneList.removeChild(doneList.firstChild);
    }
  }

})
