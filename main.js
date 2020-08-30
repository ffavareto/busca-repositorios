$("#btn_get_repos").click(function () {
  const user = $('#user').val()
  $.get({
    user: user,
    url: `https://api.github.com/users/${user}/repos`,
    dataType: "json",
    success: function (result) {
      clearRepos()
      for (let i in result) {
        const divRepos = $('#repo_list')
        const name = "<p>" + result[i].name + "</p>"
        const links = "<a href='" + result[i].html_url + "' target='_blank'>" + "Ir para o repositório" + "</a>"
        const repo = '<div id="repo">' + name + links + '</div>'
        divRepos.append(repo)
      }
      getFollowers(this.user)
      $('#user-infos').append(`<img src='${result[0].owner.avatar_url}'>`)
        .append(`<p id='user-name'>${result[0].owner.login}</p>`)
        .append(`<p id='repo_count'>${"Número total de repositórios: " + result.length}</p>`)
    },
    error: function (msg) {
      clearRepos()
      $('#repo_list').append(msg.status + ' ' + 'Page' + ' ' + msg.statusText)
    }
  })
})

function clearRepos() {
  $('#repo_list').html('')
  $("#repo_count").html('')
  $('#user-infos').html('')
}

function getFollowers(user) {
  $.get({
    url: `https://api.github.com/users/${user}/followers`,
    dataType: "json",
    success: function (resultFollowers) {
      const followers = '<p>' + resultFollowers.length + ' Seguidores' + '</p>'
      $('#user-infos').append(followers)
    }
  })
}