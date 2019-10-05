$(function(){
  // (document).on('turbolinks:load', 
  var search_list = $("#user-search-result");
  var member_list = $("#member-append");

  function appendUserSearchList(user){
    var html = 
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
          <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name=${user.name}>追加</div>
      </div>`
      search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = 
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${msg}</p>
      </div>`
      search_list.append(html);
  }

  function appendUser(user){
    var html = 
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${user.id}'>
        <p class='chat-group-user__name'>${user.name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`

      // console.log(html)
      member_list.append(html);
  }

  var usersname = [];

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    var group_id = $('chat__group_id').val();
        
    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input,groupId: group_id },
      dataType: 'json',
      contentType: false
    })

    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          console.log(user.name)
          var htmlnew = appendUserSearchList(user);
          if(usersname.indexOf(user.name) === -1){
          $("#user-search-result").append(htmlnew);
        }});
        if (input.length === 0) {
          $('#user-search-result').empty();
        };
      }
      else {
        var htmler = appendErrMsgToHTML("一致するユーザーが見つかりません");
        $("#user-search-result").append(htmler);
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
    return false;  
    });


  $(document).on('click','.user-search-add',function(e){
    e.preventDefault();
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    // console.log(id);
    // console.log(name);
    // appendUser(user_id, name);
    $(this).parent().remove();
    $.ajax({
      type: 'GET',
      url: '/users/new',
      // url: '/users',
      data: { key:{name: name, id: id} },
      dataType: 'json',
      contentType: false
    })

    .done(function(user){
      console.log(user.name);
      usersname.push(user.name)
      var htmlnew = appendUser(user);
      $("#chat-group-user").append(htmlnew);
    })
    .fail(function() {
      alert('error');
    });
    return false;  
    });

  $('#member-append').on('click','.user-search-remove',function(){
    var name = $(this).prev().text();
    for(i=0; i<usersname.length; i++){
      if(usersname[i] == name){
      usersname.splice(i,1);
      }
    }
    $(this).parent().remove();
  })
});