const casas = document.querySelectorAll(".casas")
const vez = document.querySelector("#vez")
const casa1 = document.querySelector("#casa1")
const casa2 = document.querySelector("#casa2")
const casa3 = document.querySelector("#casa3")
const casa4 = document.querySelector("#casa4")
const casa5 = document.querySelector("#casa5")
const casa6 = document.querySelector("#casa6")
const casa7 = document.querySelector("#casa7")
const casa8 = document.querySelector("#casa8")
const casa9 = document.querySelector("#casa9")
const resultado = document.querySelector("#resultado")
var pontuacaoX = 0
var pontuacaoO = 0
var jogoAtivo = true
var winner = ""

function jogar(casa) {
    if (!jogoAtivo) return;

    if (casas[casa].textContent !== ""){
        return;
    }
    
    var vezvalor = vez.textContent
    if (vezvalor === "Vez do X"){
        casas[casa].innerHTML = "X"
        winner = 'X'
        vez.innerHTML = "Vez do O"
    } else{
        casas[casa].innerHTML = "O"
        winner = 'O'
        vez.innerHTML = "Vez do X"
    }

    const poss1 = [casa1, casa2, casa3]
    const poss2 = [casa4, casa5, casa6]
    const poss3 = [casa7, casa8, casa9]
    const poss4 = [casa1, casa4, casa7]
    const poss5 = [casa2, casa5, casa8]
    const poss6 = [casa3, casa6, casa9]
    const poss7 = [casa1, casa5, casa9]
    const poss8 = [casa3, casa5, casa7]

    if(poss1[0].textContent !== "" && Array.from(poss1).every(guis => guis.textContent === poss1[0].textContent)){
        jogoAtivo = false
        poss1.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if(poss2[0].textContent !== "" && Array.from(poss2).every(casinha => casinha.textContent === poss2[0].textContent)){
        jogoAtivo = false
        poss2.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss3[0].textContent !== "" && Array.from(poss3).every(casinha => casinha.textContent === poss3[0].textContent)){
        jogoAtivo = false
        poss3.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss4[0].textContent !== "" && Array.from(poss4).every(casinha => casinha.textContent === poss4[0].textContent)){
        jogoAtivo = false
        poss4.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss5[0].textContent !== "" && Array.from(poss5).every(casinha => casinha.textContent === poss5[0].textContent)){
        jogoAtivo = false
        poss5.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss6[0].textContent !== "" && Array.from(poss6).every(casinha => casinha.textContent === poss6[0].textContent)){
        jogoAtivo = false
        poss6.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss7[0].textContent !== "" && Array.from(poss7).every(casinha => casinha.textContent === poss7[0].textContent)){
        jogoAtivo = false
        poss7.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (poss8[0].textContent !== "" && Array.from(poss8).every(casinha => casinha.textContent === poss8[0].textContent)){
        jogoAtivo = false
        poss8.forEach(element => {
            element.style.background = 'rgb(140, 255, 86)'
        })
        setTimeout(() => vitoria(winner),1000)
    } else if (Array.from(casas).every(casa => casa.textContent !== "")){
        jogoAtivo = false
        casas.forEach(gugu => {
            gugu.style.background = 'rgb(255, 55, 55)'
        })
        setTimeout(()=>{
            casas.forEach(element => {
            element.innerHTML = ''
            element.style.background = ''
            })
            if (winner === 'X'){
                vez.innerHTML = `Vez do O`
            }
            else{
                vez.innerHTML = `Vez do X`
            }
            resultado.innerHTML = "Deu velha!"
            jogoAtivo = true
            return;
        },1000)
    }
}

function vitoria(winner){
    var ganhador = winner
    if(ganhador == "X"){
        pontuacaoX++
    } else{
        pontuacaoO++
    }
    document.querySelector("#placar").innerHTML = `Placar: ${pontuacaoX} x ${pontuacaoO}`
    casas.forEach(guis => {
    guis.innerHTML = ''
    guis.style.background = ''
    })
    vez.innerHTML = `Vez do ${ganhador}`
    resultado.innerHTML = `"${ganhador}" ganhou!`
    jogoAtivo = true
    registrarPontuacao()
}

function registrarPontuacao() {
    const atributo = 'pontuacao_tictactoe';
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Você precisa estar logado para cadastrar a pontuação.');
        return;
    }

    // Decodificar o JWT para obter o idusua
    const payload = JSON.parse(atob(token.split('.')[1]));
    const idusua = payload.id;

    // Buscar info_extra atual
    fetch('/infoextra', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar info_extra');
        return response.json();
    })
    .then(data => {
        const valor = Number(data.pontuacao_tictactoe) + 1;

        // Atualizar a pontuação no backend
        return fetch('/infoextra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ atributo, valor, idusua }),
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao enviar pontuação");
            return response.text();
        })
        .then(() => {
            document.querySelector('#pontuacao').textContent = `Pontuação do ${data.nome_usuario}: ${valor}`;
        });
    })
    .catch(err => {
        alert('Erro ao registrar pontuação: ' + err.message);
    });
}
