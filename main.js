$("#btn_get_repos").click(function () {
  const user = $('#user').val()
  $.get({
    user: user,
    url: `https://api.github.com/users/${user}/repos`,
    dataType: "json",
  })
    .done(function (result) {
      clearRepos()
      for (let i in result) {
        const divRepos = $('#repo_list')

        const name = `<p>${result[i].name}</p>`
        const links = `<a href='${result[i].html_url}' target='_blank'>Ir para o repositório</a>`
        const lang = `<img src='images/${result[i].language}.svg' id='lang' width='100'>`
        const infos = `<button onclick='envia(${JSON.stringify(result[i])})' id='btn-details'>Detalhes</button>`

        const repo =
          `<div id="repo">
            <div>${name}${links}${infos}</div>
            <div>${lang}</div>
          </div>`

        divRepos.append(repo)
      }

      getFollowers(this.user)

      $('#user-infos').append(`<img src='${result[0].owner.avatar_url}'>`)
        .append(`<p id='user-name'>${result[0].owner.login}</p>`)
        .append(`<p id='repo_count'>${"Número total de repositórios: " + result.length}</p>`)
    })

    .fail(function (result, textStatus, msg) {
      clearRepos()
      $('#repo_list').append(msg)
    })
})

function envia(result) {
  localStorage.result = JSON.stringify(result)
  window.open('repo-infos.html')
}

function clearRepos() {
  $('#repo_list').html('')
  $("#repo_count").html('')
  $('#user-infos').html('')
}

function getFollowers(user) {
  $.get({
    url: `https://api.github.com/users/${user}/followers`,
    dataType: "json",
  })
    .done(function (resultFollowers) {
      const followers = `<p>${resultFollowers.length} Seguidores</p>`
      $('#user-infos').append(followers)
    })
}