$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  return false;
  })
})