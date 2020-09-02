const repo = JSON.parse(localStorage.getItem('result'))

let nome = repo.owner.login
let nomeRepo = `<a href='${repo.html_url}' target='_blank'>${repo.full_name}<a>`
let foto = repo.owner.avatar_url
let desc = repo.description
let langs = `https://api.github.com/repos/${nome}/${repo.name}/languages`
const nullDesc = ''
const nullLang = ''

$('#icon').attr('src', foto)
$('#desc').append(desc)
$('#name').append(nomeRepo)

if (desc == null) {
  $('#desc').html(nullDesc)
}

$.get({
  url: langs,
  dataType: 'json',
})
  .done(function (result) {
    for (let i in result) {
      if (i == null) {
        $('#langs').append(nullLang)
      }
      if (i.length > 1) {
        $('#langs').append(`<span id="lang">${i}</span>` + ' ')
      }
    }
  })