$(document).on('turbolinks:load', function(){ 
  function buildMessageHTML(message){
    var addImage = (message.image!== null) ? `<img class = "lower-message__image", src="${message.image}">` : ''
     var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
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

$('#js-form').on('submit', function(e){
  console.log("test");
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
    console.log(data);
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
    
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        url:'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log(messages);
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
      return false;
    }
  }
  setInterval(reloadMessages, 5000);
});



  
