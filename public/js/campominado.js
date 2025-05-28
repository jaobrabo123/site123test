//Variáveis globais
var casasID = []
var gerarBombas = true
var botarBandeira = false
var tentativaAllow = true
var totBombs = 0
var flags = 0
var valores = []
var bordaDireita = []
var bordaEsquerda = []
var removerDireita = [7,4,2]
var removerEsquerda = [5,3,0]
var intervalo

//Função pra gerar o mapa na dificuldade facil ao abrir o site
document.addEventListener("DOMContentLoaded", function () {
    const areaCampo = document.querySelector("#areaCampo")
    const campo = document.querySelector("#campo")
    areaCampo.appendChild(campo)
    campo.style.gridTemplateColumns = `repeat(16, 30px)`;
    campo.style.gridTemplateRows = `repeat(16, 30px)`;
    for (let i = 0; i < 256; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        campo.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => bombas(256,novaDiv.id))
        novaDiv.addEventListener('contextmenu', (alec) => {
            alec.preventDefault();
            bandeira(novaDiv);
        });
        casasID.push(novaDiv.id)
    }
});

//verifica a opção selecionada ao alterar o select pra gerar o mapa
function verificaOpcao(select){
    clearInterval(intervalo)
    tentativaAllow = true
    const areaCampo = document.querySelector("#areaCampo")
    const campo = document.querySelector("#campo")
    const contador = document.querySelector("#contador")
    campo.remove()
    const newCampo = document.createElement("div")
    newCampo.id = "campo"
    areaCampo.appendChild(newCampo)
    const dif = Number(select.value)
    var numCasas = 0
    botarBandeira = false
    switch (dif) {
        case 1:
            numCasas = 81
            newCampo.style.gridTemplateColumns = `repeat(9, 30px)`
            newCampo.style.gridTemplateRows = `repeat(9, 30px)`
            contador.textContent = `Bombas: 10`
            break;
        case 2:
            numCasas = 256
            newCampo.style.gridTemplateColumns = `repeat(16, 30px)`;
            newCampo.style.gridTemplateRows = `repeat(16, 30px)`;
            contador.textContent = `Bombas: 40`
            break;
        case 3:
            numCasas = 480
            newCampo.style.gridTemplateColumns = `repeat(30, 30px)`;
            newCampo.style.gridTemplateRows = `repeat(16, 30px)`;
            contador.textContent = `Bombas: 99`
            break;
    }
    
    casasID = []
    gerarBombas = true
    for (let i = 0; i < numCasas; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        newCampo.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => bombas(numCasas,novaDiv.id))
        novaDiv.addEventListener('contextmenu', (alec) => {
            alec.preventDefault();
            bandeira(novaDiv);
        });
        casasID.push(novaDiv.id)
    }
}

//Funcao pra resetar o mapa (puxa a verificaOpcao pra gerar o mapa baseado na dificuldade)
function reset(){
    verificaOpcao(document.querySelector("#dificuldade"))
    tentativaAllow = true
}

//Funcao pra botar e tirar as bandeiras
function bandeira(casa){
    if(!botarBandeira){
        return
    }
    const contador = document.querySelector("#contador")
    const casas = document.querySelectorAll(".casas")
    if (casa.innerHTML == `<i class="fa-solid fa-flag"></i>`) {
        casa.innerHTML = "";
        flags++
        contador.textContent = `Bombas: ${flags}`
    } else if (casa.innerHTML == ""){
        flags--
        if (flags<0){
            flags++
            return;
        }
        
        casa.innerHTML = `<i class="fa-solid fa-flag"></i>`;
        var revelations = 0
        casas.forEach(element => {
            if (element.innerHTML!=''){
                revelations++
            }
        });
        if (revelations==casas.length){
            tentativaAllow = false
            clearInterval(intervalo)
            registrarPontuacao()
            alert("Você ganhou")
        }
        contador.textContent = `Bombas: ${flags}`
    }
}

var emvolta = []
//Funcao pra gerar as posições das bombas
function bombas(numCasas, casablock){
    if(!gerarBombas){
        tentativa(casablock)
        return
    }
    
    const tipo = document.querySelector('input[name="bombBand"]:checked')

    if (tipo.value == 2){
        bandeira(document.querySelector(`#${casablock}`))
        return
    }

    clearInterval(intervalo)
    cronometru()
    gerarBombas = false
    botarBandeira = true
    const casas = document.querySelectorAll(".casas")
    emvolta = []
    totBombs = 0
    valores = Array(casasID.length).fill(0);
    switch (numCasas) {
        case 81:
            totBombs = 10
            emvolta = [
                -10,-9,-8,
                -1,1,
                8,9,10
            ] //Casas em volta pra verificar quantas bombas tem perto
            bordaDireita = [
                8,17,26,
                35,44,53,
                62,71,80
            ]
            bordaEsquerda = [
                0,9,18,
                27,36,45,
                54,63,72
            ]
            break;
        case 256:
            totBombs = 40
            emvolta = [
                -17,-16,-15,
                -1,1,
                15,16,17
            ] //Casas em volta pra verificar quantas bombas tem perto
            bordaDireita = [
                15,31,47,63,
                79,95,111,127,
                143,159,175,191,
                207,223,239,255
            ]
            bordaEsquerda = [
                0,16,32,48,
                64,80,96,112,
                128,144,160,176,
                192,208,224,240
            ]
            break;
        case 480:
            totBombs = 99
            emvolta = [
                -31,-30,-29,
                -1,1,
                29,30,31
            ] //Casas em volta pra verificar quantas bombas tem perto
            bordaDireita = [
                29,59,89,119,
                149,179,209,239,
                269,299,329,359,
                389,419,449,479
            ]
            bordaEsquerda = [
                0,30,60,90,
                120,150,180,210,
                240,270,300,330,
                360,390,420,450
            ]
            break;
    }
    flags = totBombs
    nums = []
    var casasGuisBlock = [] //casasID[casablock]
    emvolta.forEach(gugu => {
        casasGuisBlock.push(casasID[casasID.indexOf(casablock)+gugu])
    });
    
    for (let i = 0; i < totBombs; i++) {
        let numaleatorio = casasID[Math.floor(Math.random() * numCasas)];
        while (nums.includes(numaleatorio)||numaleatorio==casablock||casasGuisBlock.includes(numaleatorio)){
            numaleatorio = casasID[Math.floor(Math.random() * numCasas)]
        }
        nums.push(numaleatorio)
    }
    nums.forEach(casaId => {
        const index = casasID.indexOf(casaId);
        valores[index] = 10;
    })
    
    for(let i = 0; i<casas.length; i++){
        if (valores[i]!==10){
            var bombasEmVolta = 0
            var emvolta2 = [...emvolta]
            
            if (bordaDireita.includes(i)){
                removerDireita.forEach(element => {
                    emvolta2.splice(element,1)
                });
            } else if (bordaEsquerda.includes(i)){
                removerEsquerda.forEach(element => {
                    emvolta2.splice(element,1)
                });
            }
            emvolta2.forEach(element => {
                if(valores[i+element]==10){
                    bombasEmVolta++
                }
            })
            valores[i] = bombasEmVolta
        }
    }
    console.log(valores)
    tentativa(casablock)
}

function tentativa(casa){
    var revelar = casasID.indexOf(casa)
    const casas = document.querySelectorAll(".casas")
    const tipo = document.querySelector('input[name="bombBand"]:checked')
    
    if (tentativaAllow == false){
        return
    }
    
    if (tipo.value == 2){
        bandeira(document.querySelector(`#${casa}`))
        return
    }

    if (document.querySelector(`#${casa}`).innerHTML == `<i class="fa-solid fa-flag"></i>`){
        return
    }

    if (valores[revelar]==0){
        var revelarEmVolta = []
        var emvolta2 = [...emvolta]
        document.querySelector(`#${casa}`).innerHTML = '.'
        document.querySelector(`#${casa}`).color = 'white'
        document.querySelector(`#${casa}`).background = 'white'
        if (bordaDireita.includes(revelar)){
            removerDireita.forEach(element => {
                emvolta2.splice(element,1)
            });
        } else if (bordaEsquerda.includes(revelar)){
            removerEsquerda.forEach(element => {
                emvolta2.splice(element,1)
            });
        }
        emvolta2.forEach(element => {
            revelarEmVolta.push(revelar+element)
        });
        revelarEmVolta.forEach(element => {
            const casaElemento = document.querySelector(`#casa${element}`);
            if (casaElemento && casaElemento.style.background !== 'white') {
                if (valores[element]==0){
                    casaElemento.innerHTML = '.'
                    casaElemento.style.color = 'white'
                    casaElemento.style.background = 'white'
                }else{
                    casaElemento.innerHTML = valores[element];
                    casaElemento.style.background = 'white';
                }
                tentativa(`casa${element}`);
            }
        });

    }
    if (valores[revelar]==10){
        valores.forEach((valor, indice) => {
            if(valor==10){
                document.querySelector(`#casa${indice}`).innerHTML = `<i class="fa-solid fa-bomb" style="color: black;"></i>`
                
            }
        });
        tentativaAllow = false
        clearInterval(intervalo)
        alert("Você perdeu")
        return
    }
    switch(valores[revelar]){
        case 1:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'blue'
            break;
        case 2:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'green'
            break;
        case 3:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'red'
            break;
        case 4:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'purple'
            break;
        case 5:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'rgb(2, 0, 133)'
            break;
        case 6:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'orange'
            break;
        case 7:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'rgb(255, 0, 221)'
            break;
        case 8:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'black'
            break;
        case 0:
            document.querySelector(`#${casa}`).innerHTML = valores[revelar]
            document.querySelector(`#${casa}`).style.background = 'white'
            document.querySelector(`#${casa}`).style.color = 'white'
            break;
    }
    
    var revelations = 0
    casas.forEach(element => {
        if (element.innerHTML!=''){
            revelations++
        }
    });
    if (revelations==casas.length){
        tentativaAllow = false
        clearInterval(intervalo)
        registrarPontuacao()
        alert("Você ganhou")
    }
}

function cronometru(){
    var segundos = 0  
    intervalo = setInterval(() => {
        segundos++;
        var minutos = (Math.floor((segundos/60))).toString().padStart(2, '0')
        var seconds = (segundos%60).toString().padStart(2, '0')
        atualizarCronometro(minutos, seconds);
    }, 1000);
}

function atualizarCronometro(minutos, seconds) {
    document.querySelector("#cronometro").innerHTML = `Tempo: ${minutos}:${seconds}`
}

function registrarPontuacao() {
    var valorDif
    const dificuldade = document.querySelector("#dificuldade");
    if(dificuldade.value === "1"){
        valorDif = 10
    }else if(dificuldade.value === "2"){
        valorDif = 30
    }else if(dificuldade.value === "3"){
        valorDif = 50
    }
    const atributo = 'pontuacao_minado';
    const token = localStorage.getItem('token');

    if (!token) {
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
        const valor = Number(data.pontuacao_minado) + valorDif;

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