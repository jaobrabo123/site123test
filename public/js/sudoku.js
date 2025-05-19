const lista = [1,2,3,4,5,6,7,8,9]

const colunas = [
[0,9,18,27,36,45,54,63,72],
[1,10,19,28,37,46,55,64,73],
[2,11,20,29,38,47,56,65,74],
[3,12,21,30,39,48,57,66,75],
[4,13,22,31,40,49,58,67,76],
[5,14,23,32,41,50,59,68,77],
[6,15,24,33,42,51,60,69,78],
[7,16,25,34,43,52,61,70,79],
[8,17,26,35,44,53,62,71,80]
]

const linhas = [
[0,1,2,3,4,5,6,7,8],
[9,10,11,12,13,14,15,16,17],
[18,19,20,21,22,23,24,25,26],
[27,28,29,30,31,32,33,34,35],
[36,37,38,39,40,41,42,43,44],
[45,46,47,48,49,50,51,52,53],
[54,55,56,57,58,59,60,61,62],
[63,64,65,66,67,68,69,70,71],
[72,73,74,75,76,77,78,79,80]
]

const subgrades = [
[0,1,2,9,10,11,18,19,20],
[3,4,5,12,13,14,21,22,23],
[6,7,8,15,16,17,24,25,26],
[27,28,29,36,37,38,45,46,47],
[30,31,32,39,40,41,48,49,50],
[33,34,35,42,43,44,51,52,53],
[54,55,56,63,64,65,72,73,74],
[57,58,59,66,67,68,75,76,77],
[60,61,62,69,70,71,78,79,80]
]

var jogoativo = true

var intervalo
var nums = []
var casais = []
var vidas = 0

function gerarTabuleiro() {
    jogoativo = true
    vidas = 10
    const dificuldade = document.querySelector("#dificuldade");
    if (dificuldade.value === "4") {
        vidas = Number(document.querySelector("#vidasPersona").value)
        if (!vidas){
            vidas=1
        }
    }
    const cronometro = document.querySelector("#cronometro")
    const textin = document.querySelector("#textin")
    const tabuleiro = document.querySelector("#tabuleiro")
    const tab2 = document.querySelector("#tab2")
    const opcao = document.querySelector("#opcao")
    tab2.remove()
    const botao = document.querySelector("#button")
    const newtab2 = document.createElement("div")
    newtab2.id = 'tab2'
    tabuleiro.appendChild(newtab2)
    cronometro.style.display = 'flex'
    textin.innerHTML = `Vidas: ${vidas}`
    textin.style.display = 'flex'
    opcao.style.display = 'flex'
    tabuleiro.style.display = 'flex'
    casais = []
    for (let i = 0; i < 81; i++) {
        const novaDiv = document.createElement("div")
        novaDiv.className = 'casas'
        novaDiv.id = `casa${i}` 
        newtab2.appendChild(novaDiv)
        novaDiv.addEventListener('click', () => tentativa(novaDiv))
        casais.push(novaDiv.id)
    }
    botao.innerHTML = `Desistir`
    gerarNumeros()
    clearInterval(intervalo)
    cronometru()
}

function tentativa(casa){
    if (jogoativo == false){
        return
    }
    var skibi = document.querySelector('input[name="numSelec"]:checked')
    if (!skibi){
        alert("Selecione uma opção!")
        return
    }

    if (casa.innerHTML != ''){
        return
    }
    const textin = document.querySelector("#textin")
    const botao = document.querySelector("#button")
    const skibiNum = skibi.value
    const casaid = casa.id

    const casinha = document.getElementById(casaid)
    const skibidi = casais.indexOf(casaid)

    if (nums[skibidi] == skibiNum){
        casinha.style.background = "wheat"
        casinha.innerHTML = `${skibiNum}`
        const casinhas = document.querySelectorAll(".casas")
        const ganhouSera = Array.from(casinhas).every(guis => guis.innerHTML !== '')
        if (ganhouSera){
            casinhas.forEach(casa => {
                casa.style.background = "rgb(215, 255, 183)"
            })
            botao.innerHTML = "Vitória!"
            clearInterval(intervalo)
            jogoativo = false
        }
    } else{
        vidas = vidas-1
        if(vidas==0){
            textin.innerHTML = `Vidas: ${vidas}`
            alert("Você Perdeu todas as vidas! :(")
            botao.innerHTML = "Reiniciar"
            clearInterval(intervalo)
            jogoativo = false
        }
        else{
            textin.innerHTML = `Vidas: ${vidas}`
            alert("Tentativa incorreta")
        }
    }
    console.log(`casa e número selecionado: `+ skibidi, skibiNum)
}

function gerarNumeros() {
    var casas = document.querySelectorAll(".casas")
    let tentativas = 0;
    let sucesso = false;
    const dificuldade = document.querySelector('#dificuldade')
    var dificuldadeSelecionada = Number(dificuldade.value)
    var numdificuldade = 0
    switch (dificuldadeSelecionada){
        case 1:
            numdificuldade = 20
            break;
        case 2:
            numdificuldade = 39
            break;
        case 3:
            numdificuldade = 45
            break;
        case 4:
            numdificuldade = Number(document.querySelector("#casasEscondidas").value)
            if(!numdificuldade){
                numdificuldade = 1
            } else if(numdificuldade>81){
                numdificuldade = 81
            }
            break;
    }

    while (!sucesso && tentativas < 1000) {
        tentativas++;

        var numlinhas = [[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista]] //Array.from({length: 9}, () => [...lista])
        var numcolunas = [[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista]]
        var numsubgrades = [[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista],[...lista]]
        nums = []
        
        sucesso = true

        for (let i = 0; i < 81; i++) {
            let coluna = colunas.findIndex(alec => alec.includes(i));
            let linha = linhas.findIndex(guis => guis.includes(i));
            let subgrade = subgrades.findIndex(guis => guis.includes(i));

            let numposslinha = numlinhas[linha];
            let numposscoluna = numcolunas[coluna];
            let numposssubgrade = numsubgrades[subgrade];

            let comuns = numposslinha.filter(
                num => numposscoluna.includes(num) && numposssubgrade.includes(num)
            );

            if (comuns.length === 0) {
                sucesso = false
                break;
            }

            let numaleatorio = comuns[Math.floor(Math.random() * comuns.length)];

            numlinhas[linha].splice(numposslinha.indexOf(numaleatorio), 1);
            numcolunas[coluna].splice(numposscoluna.indexOf(numaleatorio), 1);
            numsubgrades[subgrade].splice(numposssubgrade.indexOf(numaleatorio), 1);
            nums.push(numaleatorio)
            casas[i].innerHTML = numaleatorio.toString();
        }
        
    }
    var casaprasumir = []
    console.log(`Todos números da grade: ${nums}`)
    console.log(`Número de tentativas: ${tentativas}`)
    
    for (let i=0; i<numdificuldade; i++){
        let idAleatorio = casais[Math.floor(Math.random() * casais.length)]
        while (casaprasumir.includes(idAleatorio)){
            idAleatorio = casais[Math.floor(Math.random() * casais.length)]
        }
        casaprasumir.push(idAleatorio)
        const casa = document.getElementById(idAleatorio)
        casa.innerHTML = ''
    }
    console.log(`Casas pra sumir: ${casaprasumir}`)

    if (!sucesso) {
        alert("Falha ao gerar tabuleiro. Tente novamente.")
        const botao = document.querySelector("#button")
        botao.innerHTML = "Jogar"
        cronometro.style.display = 'none'
        textin.style.display = 'none'
        opcao.style.display = 'none'
        tabuleiro.style.display = 'none'
        return
    }
}

function destacar(radio) {
    const casas = document.querySelectorAll(".casas")
    var casasID = []
    casas.forEach(element => {
        casasID.push(element.id)
        document.getElementById(element.id).style.background = ""
    })

    const casasDestacadas = casasID.filter(guis => document.getElementById(guis).innerHTML === (radio.value).toString())
    casasDestacadas.forEach(element => {
        document.getElementById(element).style.background = "wheat"
    });
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

function verificaOpcao(select) {
    const personalizadu = document.querySelector("#personalizado");
    if (select.value === "4") {
        personalizadu.style.display = "flex";
    } else {
        personalizadu.style.display = "none";
    }
}

function personalizado() {
    const personalizadu = document.querySelector("#personalizado")
    personalizadu.style.display = "flex"
}