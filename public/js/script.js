function logout() {
    localStorage.removeItem('token');
    alert('Você foi desconectado.');
    document.querySelector('#loginMenuItem').style.display = 'block';
    document.querySelector('#logoutMenuItem').style.display = 'none';
    document.querySelector('#welcomeMessage').style.display = 'block';
    document.querySelector('#nomeDoPerfil').innerHTML = `Você está desconectado! Clique <a href="./login.html">aqui</a> para Logar ou Cadastrar um conta!`;
    document.querySelector('#welcomeMessage').innerHTML = `Você está desconectado! Clique <a href="./login.html">aqui</a> para Logar ou Cadastrar um conta!`;
    document.querySelector('#dadosUsuarios').style.display = 'none';
    document.querySelector('#cat').style.display = 'flex';
    document.querySelector('#cat').innerHTML = `<img src="imgs/gato.png" alt="Gato">`
}