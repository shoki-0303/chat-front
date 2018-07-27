$(function() {

  function appendUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user.name}">追加</a>
     </div>`
     $('#user-search-result').append(html)
  };

  function appendNoUser(word) {
    var html =
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">一致するユーザーは存在しません</p>
     </div>`
     $('#user-search-result').append(html)
  }

  function appendUserResult(id, name) {
    var html =
    `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
     <input name='group[user_ids][]' type='hidden' value=${id}>
     <p class='chat-group-user__name'>${name}</p>
    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>`
    $('#chat-group-users').append(html);
  }



  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    if (input.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword:input },
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user)
          });
        } else {
          appendNoUser("一致するユーザーは存在しません")
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました")
      })
    } else {
      $('#user-search-result').empty();
    }
  });

  $('#user-search-result').on('click', '.chat-group-user__btn--add', function() {
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
    appendUserResult(userId, userName);
  });
  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});
