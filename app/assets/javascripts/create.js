$(function() {

  function scroll() {
    $('.content').animate({scrollTop: $('.content')[0].scrollHeight});
  }

  function appendHTML(json) {
    var image_url = (json.image_url) ? `<img src=${json.image_url} class="content__message__image" >` : "";
    var html =`<ul class="content__message">
    <li class="content__message__name">
    ${ json.user_name }
    </li>
    <li class="content__message__date">
    ${ json.created_at }
    </li>
    <li class="content__message__text">
    ${ json.content }
    </li>
    ${ image_url }
    </ul>`
    $('.content').append(html);
  }

  $('#message__form-js').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      appendHTML(data);
      $('#message__form-js')[0].reset();
      scroll();
      $('.form__send').prop("disabled", false);
    })
    .fail(function(data){
      alert('非同期通信に失敗しました');
    })
  });
});
