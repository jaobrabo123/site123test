function mostrarLogin() {
    document.getElementById('cadastroForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'flex';
}

function mostrarCadastro() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('cadastroForm').style.display = 'flex';
}

function ocultar() {
    const senha = document.querySelector("#senha")
    const olhinho = document.querySelector("#olhinho")
    if (senha.type === 'password'){
        senha.type = 'text'
        olhinho.src = './imgs/eye.png'
    }else{
        senha.type = 'password'
        olhinho.src = './imgs/eye-closed.png'
    }
}

function ocultar2() {
    const senha = document.querySelector("#loginSenha")
    const olhinho = document.querySelector("#olhinho2")
    if (senha.type === 'password'){
        senha.type = 'text'
        olhinho.src = './imgs/eye.png'
    }else{
        senha.type = 'password'
        olhinho.src = './imgs/eye-closed.png'
    }
}