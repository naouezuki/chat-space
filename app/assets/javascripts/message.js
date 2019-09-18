//  メッセージ送信用のformタグに.js-formという名のクラスが適用されている前提
$('.js-form').on('submit', function(){
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
});