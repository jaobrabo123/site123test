
function enviarImagem() {
    const atributo = 'foto_perfil';
    const valor = document.querySelector('#inputFoto').value;
    const token = localStorage.getItem('token');

    if (token) {
        // Decodificar o payload do JWT para obter o ID do usuário
        const payload = JSON.parse(atob(token.split('.')[1]));
        const idusua = payload.id;

        fetch('/infoextra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ainda precisa do token no header
            },
            body: JSON.stringify({ atributo, valor, idusua })
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao enviar imagem");
            return response.text();
        })
        .then(() => {
            window.location.href = '/perfil.html'; // Redireciona após envio
        })
        .catch(err => alert('Erro: ' + err.message));
    } else {
        alert('Você precisa estar logado para enviar imagem.');
    }
}

function editarDescricao(){
    const descricao = document.querySelector("#descricaoDoPerfil")
    const descricaoAtual = descricao.textContent
    const inputDescricao = document.querySelector("#novaDescricao")
    const buttonSave = document.querySelector("#buttonSave")
    const buttonEditar = document.querySelector("#buttonEditar")
    const buttonCancel = document.querySelector("#buttonCancel")
    descricao.style.display = 'none'
    inputDescricao.style.display = 'flex'
    buttonSave.style.display = 'flex'
    buttonCancel.style.display = 'flex'
    buttonEditar.style.display = 'none'
    inputDescricao.value = `${descricaoAtual}`
}

function enviarDescricao(){
    const atributo = 'descricao';
    const valor = document.querySelector('#novaDescricao').value;
    const token = localStorage.getItem('token');

    if (token) {
        // Decodificar o payload do JWT para obter o ID do usuário
        const payload = JSON.parse(atob(token.split('.')[1]));
        const idusua = payload.id;

        fetch('/infoextra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // ainda precisa do token no header
            },
            body: JSON.stringify({ atributo, valor, idusua })
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao enviar imagem");
            return response.text();
        })
        .then(() => {
            window.location.href = '/perfil.html'; // Redireciona após envio
        })
        .catch(err => alert('Erro: ' + err.message));
    } else {
        alert('Você precisa estar logado para enviar descricao.');
    }
}

function cancelarDescricao(){
    const descricao = document.querySelector("#descricaoDoPerfil")
    const inputDescricao = document.querySelector("#novaDescricao")
    const buttonSave = document.querySelector("#buttonSave")
    const buttonEditar = document.querySelector("#buttonEditar")
    const buttonCancel = document.querySelector("#buttonCancel")
    descricao.style.display = 'flex'
    inputDescricao.style.display = 'none'
    buttonSave.style.display = 'none'
    buttonCancel.style.display = 'none'
    buttonEditar.style.display = 'flex'
}