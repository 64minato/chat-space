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

  
  // var buildHTML = function(message) {
  //   if (message.content && message.image.url) {
  //     //data-idが反映されるようにしている
  //     var html = `<div class="message" data-id=` + message.id + `>` +
  //       `<div class="up-message">` +
  //         `<div class="up-message__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="up-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="text-message">` +
  //         `<p class="text-message__conmment">` +
  //           message.content +
  //         `</p>` +
  //         `<img src="` + message.image.url + `" class="text-message__image" >` +
  //       `</div>` +
  //     `</div>`
  //   } else if (message.content) {
  //     //同様に、data-idが反映されるようにしている
  //     var html = `<div class="message" data-id=` + message.id + `>` +
  //       `<div class="up-message">` +
  //         `<div class="upmessage__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="up-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="text-message">` +
  //         `<p class="text-message__comment">` +
  //           message.content +
  //         `</p>` +
  //       `</div>` +
  //     `</div>`
  //   } else if (message.image.url) {
  //     //同様に、data-idが反映されるようにしている
  //     var html = `<div class="message" data-id=` + message.id + `>` +
  //       `<div class="up-message">` +
  //         `<div class="up-message__user-name">` +
  //           message.user_name +
  //         `</div>` +
  //         `<div class="up-message__date">` +
  //           message.created_at +
  //         `</div>` +
  //       `</div>` +
  //       `<div class="text-message">` +
  //         `<img src="` + message.image.url + `" class="text-message__image" >` +
  //       `</div>` +
  //     `</div>`
  //   };
  //   return html;
  // };
    var reloadMessages = function() {
    // URLを取得、もしくは、設定するプロパティ。 group/:group_id/messagesというURLの時だけ、以降の記述が実行されます。
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
          console.log(last_message_id)        
          var insertHTML = '';
          console.log(messages)
          messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
          })
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function () {
          console.log('error');
        });
      }
    }
    setInterval(reloadMessages, 1000);
});


// var buildHTML =function(message) {
//   var img = message.image ? `<img class="text-message__image" src=${message.image} >` : " ";
//   var html = `<div class="message" data-message-id="${message.id}" >
//                 <div class="up-message">
//                   <p class="up-message__name">
//                     ${message.user_name}
//                   </p>
//                   <p class="up-message__date">
//                     ${message.date}
//                    </p>
//                  </div>
//                 <div class="text-message">
//                   <div class="text-message__comment">
//                     ${content}
//                   </div>
//                   <div class="text-message__image">
//                     ${img}
//                   </div>              
//                 </div>
//               </div>`
//                 return html;