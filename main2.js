const repo = JSON.parse(localStorage.getItem('result'))

let nome = repo.owner.login
let foto = repo.owner.avatar_url
let desc = repo.description
let langs = `https://api.github.com/repos/${nome}/${repo.name}/languages`
const nullDesc = '<p>Descrição não informada</p>'
const nullLang = '<p>Linguagens não informadas</p>'

$('#icon').attr('src', foto)
$('#desc').append(desc)
$('#name').append(nome)

if (desc == null) {
  $('#desc').append(nullDesc)
}

$.get({
  url: langs,
  dataType: 'json',
  success: function (result) {
    for (let i in result) {
      $('#langs').append(`<p>${i}</p>`)
      if (i == null) {
        $('#langs').append(nullLang)
      }
    }
  }
})