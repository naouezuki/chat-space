$(function(){ 
  function buildMessageHTML(message){
    var addImage = (message.image.url) ? `<img class = "image_size", src="${message.image.url}">` : ''
     var html =
      `<div class="message" data-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${addImage}
        </div>
      </div>`
    return html;
  };

$('.js-form').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildMessageHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
  });

  var reloadMessages = function() {
    var group_id = $(".current-group").data("group-id");
    if(url == '/groups/' + group_id + '/api/messages'){
      var last_message_id = $('.message').last().data("id");
      $.ajax({
        url: '/groups/' + group_id + '/api/messages'
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildMessageHTML(message);
        $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});
