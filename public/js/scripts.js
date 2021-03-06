$(function(){
  
  //JQUERY UI
    //Label Dialog
    $( "#dialog-1" ).dialog({
       autoOpen: false,
       title: "Create Label",
       closeText: "x",
       resizable: false 
    });
         
  //LABELS UI
    //add new label
  $('.btn-add').on('click', function(){
      $( "#dialog-1" ).dialog( "open" );
  });

  $('body').on('click', '.btn-create-label',function() {
    var askLabel = $('#askLabel').val();
    if(askLabel === "" || askLabel === null) {
      askLabel = "&nbsp";
    }
    var labelColor = $('input[name=labelColor]:checked').val();
    var newLabel = ('<button class="btn btn-blue btn-blue-new ' + labelColor +'">' + askLabel + '</button>');
    $('#askLabel').val('');
    $(newLabel).insertBefore('.btn-add');
    $("#dialog-1").dialog("close");
  })


    //Checklist Dialog
    $( "#dialog-2" ).dialog({
       autoOpen: false,
       title: "Add Checklist",
       closeText: "x",
       resizable: false ,
       position: {
        my: "right center",
        at: "right center"
       }
    });

    $('body').on('click','.new-checklist', function(e){
        e.preventDefault()
        $('#dialog-2').dialog('open');
        // $('.new-checklist').on('click', function(e){
    //   e.preventDefault();
    //   addNewChecklist();
    // });
      })

    $('body').on('click', '.btn-create-checklist', function(){
      addNewChecklist();
      $('#dialog-2').dialog('close');
    })


    //*************ADD-REMOVE DESCRIPTION
      //show description
  $('.btn-edit-description').on('click', function(){
    $(this).hide();
    $(".description").show(200);

  });
      //hide description
  $('.btn-close-description').on('click', function(){
      closeDescription();
  });    
      //on buton save
  $('.btn-save-description').on('click', function() {
      saveUserEntry();
  });
      //if user pres enter and textarea is open it saves user entered description
  $('.description-outter').keyup(function(event){
    if(event.keyCode == 13){
        saveUserEntry();
    }
});
      //function to save user entry
  function saveUserEntry() {
      checkUserDescription();
      var userDescription = $('.description-area').val();
      $('.description-entered').text(userDescription);
      $('.description-entered').show();
  };

      //check is user entered something in description
  function checkUserDescription() {
    if($('.description-area').val().replace(/^\s+/, "") === "") {
      closeDescription();
    } else {
      $('.description-outter').hide();
      $('.description-options').show();
      $('.description-entered').css("color", "#4d4d4d");

    }
  };
      //function to close description
  function closeDescription(){
    $('.description').hide(50);
    $('.btn-edit-description').show();
  };
      //when user pres edit or press directly on user desription textarea becomes visible
  $('.btn-edit-saved, .description-entered').on('click', function(){
    $('.description-entered').hide();
    $('.description-outter').show();
  });

  //CHECKLIST
    //add new checklist - appded from external html file.
    // $('.new-checklist').on('click', function(e){
    //   e.preventDefault();
    //   addNewChecklist();
    // });

    function addNewChecklist(){
      var chkListNewName = $('#askChecklist').val();
      var checklistTemplate = '<div class="checklist-all"><div class="checklist-header container"><div class="fixed"><img src="/img/checklist-ico.png" width="20.02px" height="20px"  class="section-ico" alt="checlist icon"></div>' +
      '<div class="flex-item"><h3 class="chk-list-name">' + chkListNewName + '</h3></div><div class="checklist-options"><span><u>Hide completed items</u></span><span>&nbsp;&nbsp;<u class="delete-checklist">Delete</u></span></div></div>' +
      '<div class="meter container"><label for="progress-bar" class="fixed progress-label">0%</label><progress value="0" max="100" id="progress-bar" class="flex-item"></progress></div>' +
      '<div class="checkbox"></div>' +
      '<div class="add-item"><div class="edit-checkbox-out"><textarea class="save-checkbox" rows="1" placeholder="Add an item"></textarea><button class="btn btn-save-checkbox">Add</button>' +
      '<button class="btn btn-close-checkbox"><i class="fa fa-times" aria-hidden="true"></i></button>' + 
      '</div><p class="add-checkbox">Add an item...</p></div></div>';
      $('.checklist').append(checklistTemplate);
    }


  //CHECKLIST OPTIONS
      //change checklist
      $('body').on('click','.chk-list-name', function(){
        var userChecklistName = prompt("Please enter new checklist name:");
        $(this).text(userChecklistName);
      })


      //add new checkbox
      var idCounter = 4;
      //if user press add item button it hides it and shows textarea to enter button name.
      
      $('body').on('click', '.add-item', function(){
        $(this).find('.add-checkbox').hide();
        $(this).find('.edit-checkbox-out').show();
      });
     

      //when user pres add button it saves text area value and adds checklist with that value
      $('body').on('click', '.btn-save-checkbox', function(){
        var checkBoxName = $('.save-checkbox').val();
        createCheckbox(checkBoxName);
        $(this).find('.save-checkbox').val("");
        countChecked();
      });

      $('.btn-close-checkbox').on('click', function(event){
        event.stopPropagation();
        $('.edit-checkbox-out').hide();
        $('.add-checkbox').show();
      });

      function createCheckbox(name) {
        //fallback if user didn't entered nothing or cancel prompt window.
        if (name === "" || name === null) {
          name = "&nbsp";
        }
        $('.checkbox').append('<div class="checkbox-check"><input id="check' + idCounter + '" type="checkbox" name="check"><label for="check' + idCounter + '"><span class="chk-name">' + name + '</span></label></div>');
        idCounter++;
      };

     

      //change checlist name
        //check through all active elements ?? how to check check box name 
      $('.checkbox').on('click', 'span', function(e){
          e.preventDefault();
          alert("How to change text? :/");
      });
      


      //dynamicly change checkbar depending of completed tasks
      var progressBar = function() {
        var n = $( "input:checked" ).length;
        var total = $("input[type=checkbox]").length;
        var pBar = Math.floor((n / total) * 100);
        $("#progress-bar").val(pBar);
        $(".progress-label").text(pBar + "%");
        
      };

      progressBar();
      $("body").on("click", "input[type=checkbox]", progressBar);

      //hide  tasks which is done
      var hideChecked = function() {
        var n = $("input:checked").length;
        var showHiddenCount = "Show checked items (" + n + ")";
        $(".hide-completed").hide();
        $(".show-completed").show();
        $(".show-completed").text(showHiddenCount);
        $("input:checked").hide();
        $("input:checked").next().hide();
      }

      $("body").on("click", ".hide-completed", hideChecked)

      var showChecked = function() {
        $(".hide-completed").show();
        $(".show-completed").hide()
        $("input:checked").next().show();

        
      }

      $("body").on("click", ".show-completed", showChecked);

      //delete checklist
      $(document).on("click", ".delete-checklist", function() {
        $(".checklist-all").hide();
        
      }); 

      // + bonus drag and drop item changing their place

  //COMMENTS BOX

      //Add comment to activity log
      $("body").on("click", ".btn-send-comment", function() {
        var comment = $(".comment-area").val();
        var commentTime = $.now();
        var userComment = '<div class="user-comment user-info"><h4>Eligijus</h4><p class="activity-comment-lg">' + comment + '</p>' +
          '<p class="activity-time">just now - <span><u>Edit</u> - <u class="delete-comment">Delete</u></p></div>';
        $(".user-comment-outter").prepend(userComment);
        $(".comment-area").val('');
      });
    
      //Dumy buttons on comment log. 
   





}); //END OF JQUERY