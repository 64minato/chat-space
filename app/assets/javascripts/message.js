$(function(){

  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="up-message">
                    <p class="up-message__name">
                      ${message.user_name}
                    </p>
                    <p class="up-message__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="text-message">
                    <div class="text-message__comment">
                    ${content}
                    </div>
                    <div class="text-message__image">
                    ${img}
                    </div>
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  })

  
 
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){ 
        var href = 'api/messages#index {:format=>"json"}'
        last_message_id = $('.message:last').data("message-id");
        $.ajax({
          url: href,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
          })
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function () {
        });
      }
    }
    setInterval(reloadMessages, 1000);
});
