$('#user-search-field').on('keyup', function(e){
  var input = $("#user-search-field").val();

  $.ajax({
    type: 'GET',
    url:  '/users',
    data: { keyword: input},
    dataType: 'json'
  })

  .done(function(users){
    if (input.length === 0) {
        $('#user-search-result').empty();
    }

    else if (input.length !== 0){
        $('#user-search-result').empty();
        users.forEach(function(user){
            appendUser(user)
        });
    }

    else {
        $('#user-search-result').empty();
        appendErrMsgToHTML("一致するユーザーが見つかりません");
    }
  })

  .fail(function() {
    alert('ユーザー検索に失敗しました');
  });
});