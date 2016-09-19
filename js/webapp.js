$(document).ready(function(){
  
  // On page load: datatable
  var table_victims = $('#table_victims').dataTable({
    "ajax": "data.php?job=get_victims",
    "columns": [
      { "data": "no" },
      { "data": "name",   "sClass": "name" },
      { "data": "gender" },
      { "data": "address"},
      { "data": "mobile"},
      { "data": "location"},
      { "data": "date"},
      { "data": "status" },
      { "data": "functions",      "sClass": "functions" }
    ],
    "aoColumnDefs": [
      { "bSortable": false, "aTargets": [-1] }
    ],
    "lengthMenu": [[5,10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
    "oLanguage": {
      "oPaginate": {
        "sFirst":       " ",  
        "sPrevious":    " ",
        "sNext":        " ",
        "sLast":        " ",
      },
      "sLengthMenu":    "Records per page: _MENU_",
      "sInfo":          "Total of _TOTAL_ records (showing _START_ to _END_)",
      "sInfoFiltered":  "(filtered from _MAX_ total records)"
    }
  });
  
  // On page load: form validation
  jQuery.validator.setDefaults({
    success: 'valid',
    errorPlacement: function(error, element){
      error.insertBefore(element);
    },
    highlight: function(element){
      $(element).parent('.field_container').removeClass('valid').addClass('error');
    },
    unhighlight: function(element){
      $(element).parent('.field_container').addClass('valid').removeClass('error');
    }
  });

  // debugger;
  var form_victim = $('#form_victim');
  form_victim.validate();

  // Show message
  function show_message(message_text, message_type){
    $('#message').html('<p>' + message_text + '</p>').attr('class', message_type);
    $('#message_container').show();
    if (typeof timeout_message !== 'undefined'){
      window.clearTimeout(timeout_message);
    }
    timeout_message = setTimeout(function(){
      hide_message();
    }, 8000);
  }
  // Hide message
  function hide_message(){
    $('#message').html('').attr('class', '');
    $('#message_container').hide();
  }

  // Show loading message
  function show_loading_message(){
    $('#loading_container').show();
  }
  // Hide loading message
  function hide_loading_message(){
    $('#loading_container').hide();
  }

  // Show lightbox
  function show_lightbox(){
    $('.lightbox_bg').show();
    $('.lightbox_container').show();
  }
  // Hide lightbox
  function hide_lightbox(){
    $('.lightbox_bg').hide();
    $('.lightbox_container').hide();
  }
  // Lightbox background
  $(document).on('click', '.lightbox_bg', function(){
    hide_lightbox();
  });
  // Lightbox close button
  $(document).on('click', '.lightbox_close', function(){
    hide_lightbox();
  });
  // Escape keyboard key
  $(document).keyup(function(e){
    if (e.keyCode == 27){
      hide_lightbox();
    }
  });
  
  // Hide iPad keyboard
  function hide_ipad_keyboard(){
    document.activeElement.blur();
    $('input').blur();
  }

  // Add victim button
  $(document).on('click', '#add_victim', function(e){
    e.preventDefault();
    $('.lightbox_content h2').text('Add victim');
    $('#form_victim button').text('Add victim');
    $('#form_victim').attr('class', 'form add');
    $('#form_victim').attr('data-id', '');
    $('#form_victim .field_container label.error').hide();
    $('#form_victim .field_container').removeClass('valid').removeClass('error');
    $('#form_victim #no').val('');
    $('#form_victim #name').val('');
    $('#form_victim #gender').val('');
    $('#form_victim #address').val('');
    $('#form_victim #mobile').val('');
    $('#form_victim #employees').val('');
    $('#form_victim #location').val('');
    $('#form_victim #status').val('');
    show_lightbox();
  });

  // Add victim submit form
  $(document).on('submit', '#form_victim.add', function(e){

    e.preventDefault();
    // Validate form
    if (form_victim.valid() == true){
      // Send victim information to database
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var form_data = $('#form_victim').serialize();
      var request   = $.ajax({
        url:          'data.php?job=add_victim',
        cache:        false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_victims.api().ajax.reload(function(){
            hide_loading_message();
            var name = $('#name').val();
            show_message("victim '" + name + "' added successfully.", 'success');
          }, true);
        } else {
          hide_loading_message();
          show_message('Add request failed', 'error');
        }
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Add request failed: ' + textStatus, 'error');
      });
    }
  });

  // Edit victim button
  $(document).on('click', '.function_edit a', function(e){
    e.preventDefault();
    // Get victim information from database
    show_loading_message();
    var id      = $(this).data('id');
    var request = $.ajax({
      url:          'data.php?job=get_victim',
      cache:        false,
      data:         'id=' + id,
      dataType:     'json',
      contentType:  'application/json; charset=utf-8',
      type:         'get'
    });
    request.done(function(output){
      if (output.result == 'success'){
        $('.lightbox_content h2').text('Edit victim');
        $('#form_victim button').text('Edit victim');
        $('#form_victim').attr('class', 'form edit');
        $('#form_victim').attr('data-id', id);
        $('#form_victim .field_container label.error').hide();
        $('#form_victim .field_container').removeClass('valid').removeClass('error');
        $('#form_victim #no').val(output.data[0].no);
        $('#form_victim #name').val(output.data[0].name);
        $('#form_victim #gender').val(output.data[0].gender);
        $('#form_victim #address').val(output.data[0].address);
        $('#form_victim #mobile').val(output.data[0].mobile);
        $('#form_victim #employees').val(output.data[0].employees);
        $('#form_victim #location').val(output.data[0].location);
        $('#form_victim #status').val(output.data[0].status);
        hide_loading_message();
        show_lightbox();
      } else {
        hide_loading_message();
        show_message('Information request failed', 'error');
      }
    });
    request.fail(function(jqXHR, textStatus){
      hide_loading_message();
      show_message('Information request failed: ' + textStatus, 'error');
    });
  });
  
  // Edit victim submit form
  $(document).on('submit', '#form_victim.edit', function(e){
    e.preventDefault();
    // Validate form
    if (form_victim.valid() == true){
      // Send victim information to database
      hide_ipad_keyboard();
      hide_lightbox();
      show_loading_message();
      var id        = $('#form_victim').attr('data-id');
      var form_data = $('#form_victim').serialize();
      var request   = $.ajax({
        url:          'data.php?job=edit_victim&id=' + id,
        cache:        false,
        data:         form_data,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_victims.api().ajax.reload(function(){
            hide_loading_message();
            var name = $('#name').val();
            show_message("victim '" + name + "' edited successfully.", 'success');
          }, true);
        } else {
          hide_loading_message();
          show_message('Edit request failed', 'error');
        }
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Edit request failed: ' + textStatus, 'error');
      });
    }
  });
  
  // Delete victim
  $(document).on('click', '.function_delete a', function(e){
    e.preventDefault();
    var name = $(this).data('name');
    if (confirm("Are you sure you want to delete '" + name + "'?")){
      show_loading_message();
      var id      = $(this).data('id');
      var request = $.ajax({
        url:          'data.php?job=delete_victim&id=' + id,
        cache:        false,
        dataType:     'json',
        contentType:  'application/json; charset=utf-8',
        type:         'get'
      });
      request.done(function(output){
        if (output.result == 'success'){
          // Reload datable
          table_victims.api().ajax.reload(function(){
            hide_loading_message();
            show_message("victim '" + name + "' deleted successfully.", 'success');
          }, true);
        } else {
          hide_loading_message();
          show_message('Delete request failed', 'error');
        }
      });
      request.fail(function(jqXHR, textStatus){
        hide_loading_message();
        show_message('Delete request failed: ' + textStatus, 'error');
      });
    }
  });

});