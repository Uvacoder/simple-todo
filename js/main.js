$(document).ready(function() {
  // done and remove icons
  var completeIcon = '<i class="material-icons">done</i>';
  var removeIcon = '<i class="material-icons">delete</i>';
  var editIcon = '<i class="material-icons">edit</i>';

  // TEST
  // Task presence notification
  if (!$('#done').has('.done-task')) {
     // $('#notif').html('You have no tasks to complete.');
     console.log("no task at all");
  } else if ($('#done').has('.done-task')) {
     // $('#notif').html('You have completed all your tasks.');
     console.log("all done");
  } else {
    // $('#notif').html('');
    console.log("full task");
  }
  // Ajax loader
  $.ajax({
    url:"js/data.json",
    type:'GET',
    dataType:'json',
    success: function(tasks) {
      $.each(tasks, function(i, item) {
        addTask(item.task);
      })
    },
    error: function() {
      alert('Error Loading Tasks...');
    }
  });

  // Disables auto zoom o iOS devices
  $('input').on('focus', function(){
    // replace CSS font-size with 16px to disable auto zoom on iOS
    $(this).data('fontSize', $(this).css('font-size')).css('font-size', '16px');
  }).on('blur', function(){
    // put back the CSS font-size
    $(this).css('font-size', $(this).data('fontSize'));
  });

  // Close Edit Popup
  function closePopup() {
    $('#edit-bkg').fadeOut('fast');
    $('#editPopup').slideUp('fast');
    $('#edit-input').val('');
  }
  $('#edit-bkg').click(closePopup);
  $('#editPopup .closePopup').click(closePopup);

  // Edit task function
  function editTask() {
    var $toBeEdited = $(this).prev().prev();
    $('#edit-bkg').fadeIn('fast');
    $('#editPopup').slideDown('fast');
    $('#edit-input').focus();
    $('#edit-input').val($toBeEdited.text());
    $('#save').click(function() {
      var $editedText = $('#edit-input').val();
      if ($editedText) {
        $toBeEdited.text($editedText);
        $('#edit-bkg').fadeOut('fast');
        $('#editPopup').slideUp('fast');
      } else {
        $('#edit-input').css('border','0.5px solid red');
        setTimeout(function() {
          $('#edit-input').css('border','0.5px solid #e7a514');
        }, 1500);
      }
    });
  }

  // Adds Task from Input
  function addTheTask() {
    var $taskInput = $('#input');
    var $value = $taskInput.val();
    if ($value) {
      addTask($value);
    } else {
      $taskInput.css('border','1px solid red');
      setTimeout(function() {
        $taskInput.css('border','none');
      }, 1500);
    }
  }
  // Add task to list: click and enter
  $('#add-task').click(addTheTask);
  $("#input").keypress(function(e) {
    if (e.which == 13) {
      addTheTask();
    }
  });

  // Display options: Delete all and Sync
  // FIXME: Hide / Display when other elt is clicked
  $('#options-btn').click(function() {
    if ($('#option-holder').css("display") == "none") {
      $('#option-holder').css({display:'grid'});
    } else {
      $('#option-holder').css({display:'none'});
    }
  });
  // Click anywhere to hide menus
  $('body > :not(#option-holder)').click(function() {
    if ($('#option-holder').css("display") == "grid") {
      $('#option-holder').css({display:'none'});
    }
  });

  // Display Navigation
  $('#nav-icon').click(function() {
    if ($('#nav-menu').css("display") == "none") {
      $('#nav-menu').css({display:'inline-block'});
    } else {
      $('#nav-menu').css({display:'none'});
    }
  });
  // Click anywhere to hide navigation
  $('body > :not(#nav-menu)').click(function() {
    if ($('#nav-menu').css("display") == "inline-block") {
      $('#nav-menu').css({display:'none'});
    }
  });

  //adds a task to list
   function addTask(item) {
     // To do list
     var $todoList = $('#todo');

     // Task
     var $task = $("<li>", {
       class: "task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text(item);

     // Complete task button
     var $complete = $("<span>", {
       class: "check-task"
     });
     $complete.addClass("pull-left");
     $complete.click(completeTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to task
     $task.append($complete);
     $task.append($taskName);
     $task.append($remove);
     $task.append($edit);

     // Append task to todo list
     $todoList.append($task);
     // Clear input
     $("#input").val('');
   }

   // uncompletes a task
   function uncompleteTask() {
     var $todoList = $("#todo");
     var $taskTitle = $(this).next().text();

     // Task
     var $todoTask = $("<li>", {
       class: "task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text($taskTitle);

     // Completed task button
     var $complete = $("<span>", {
       class: "check-task"
     });
     $complete.addClass("pull-left");
     $complete.html(completeIcon);
     $complete.click(completeTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to done task
     $todoTask.append($complete);
     $todoTask.append($taskName);
     $todoTask.append($remove);
     $todoTask.append($edit);

     // Append task to the done list
     $todoList.prepend($todoTask);

     // Remove original element
     var $doneItem = $(this).parent();
     var $doneParent = $doneItem.parent();
     $doneItem.remove();

     // Task break display
     if (!$('#done').has('.done-task')) {
        $('#task-break').css('display','block');
     } else {
        $('#task-break').css('display','none');
     }

   }
   // completes a task
   function completeTask() {
     var $doneList = $("#done");
     var $taskTitle = $(this).next().text();

     // Task
     var $doneTask = $("<li>", {
       class: "done-task"
     });
     var $taskName = $("<span>", {
       class: "task-name"
     });
     $taskName.text($taskTitle);

     // Completed task button
     var $complete = $("<span>", {
       class: "checked-task"
     });
     $complete.addClass("pull-left");
     $complete.html(completeIcon);
     $complete.click(uncompleteTask);

     // Edit task button
     var $edit = $("<span>", {
       class: "edit-task"
     });
     $edit.addClass("task-options");
     $edit.html(editIcon);
     // Edit function
     $edit.click(editTask);

     // Delete task button
     var $remove = $("<span>", {
       class: "delete-task"
     });
     $remove.addClass("task-options");
     $remove.html(removeIcon);
     $remove.click(removeTask);

     // Append elements to done task
     $doneTask.append($complete);
     $doneTask.append($taskName);
     $doneTask.append($remove);
     $doneTask.append($edit);

     // Append task to the done list
     $doneList.prepend($doneTask);

     // Remove original element
     var $doneItem = $(this).parent();
     var $doneParent = $doneItem.parent();
     $doneItem.remove();

     // Task break display
     if ($doneList.has('.done-task')) {
        $('#task-break').css('display','block');
     } else {
        $('#task-break').css('display','none');
     }

   }

   // Removes a task from both lists
  function removeTask() {
      var $item = $(this).parent();
      $item.remove();

      // Task break display
      if (!$('#done').has('.done-task')) {
         $('#task-break').css('display','inline-block');
      } else {
         $('#task-break').css('display','none');
      }
  }

  // Removes All Done Tasks
  var $deleteAll = $('#del-all');
  $deleteAll.click(function() {
      $("#done").empty();
      $('#option-holder').css({display:"none"});
      // Task break display
      if (!$('#done').has('.done-task')) {
         $('#task-break').css('display','inline-block');
      } else {
         $('#task-break').css('display','none');
      }
  });

});
