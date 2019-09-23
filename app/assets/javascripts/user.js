$(document).on('turbolinks:load', function(){

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

  function appendUser(user_id, name){
    var html = 
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${user_id}'>
        <p class='chat-group-user__name'>${name}</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
      </div>`
      member_list.append(html);
  }


  $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();
    

    $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $('#user-search-result').empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUserSearchList(user);
        });
      }

      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
    }
  })

  .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
  });

  $('#user-search-result').on('click','.user-search-add',function(){
    var user_id = $(this).data('user-id');
    var name = $(this).data('user-name');
    appendUser(user_id, name);
    $(this).parent().remove();
  })

  $('#member-append').on('click','.user-search-remove',function(){
    $('#member-append').empty();
  })
});