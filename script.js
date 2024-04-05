const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector(".app__image")
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')
let tempoDecorridoEmSegundos = 5;
let intervaloId = null // Será usada na função iniciar 

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else {
        musica.pause();
    }
});

function iniciarOuPausar() {
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}

const contagemRegressiva = () => {
    iniciar()
    if(tempoDecorridoEmSegundos <= 0){
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoEmSegundos)
}

focoBt.addEventListener("click", ()=>{
    alterarContexto('foco')
    focoBt.classList.add('active')
});
curtoBt.addEventListener("click", ()=>{
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
});
longoBt.addEventListener("click", ()=>{
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
});
    
function alterarContexto(contexto){
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
})
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
        titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Uma pausa para relaxar,<br><strong class="app__title-strong">descanse um pouco, beba água!.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Agora, pare por um momento,<br><strong class="app__title-strong">alivie sua tensão</strong>`
            break;
        default:
            break;
    }
}
startPauseBt.addEventListener('click', contagemRegressiva)