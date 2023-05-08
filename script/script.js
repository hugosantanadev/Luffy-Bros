
const player = document.querySelector('.player')
const obstaculo = document.querySelector('.obstaculo')


const jump = () => {
    player.classList.add('jump')

    setTimeout(
        () => {
            player.classList.remove('jump')
        }
    , 500)
    }

const  loop = setInterval(()=> {

const obsposition = obstaculo.offsetLeft
const playerposition = +window.getComputedStyle(player).bottom.replace('px', '')

if(obsposition <= 110 && obsposition >= 0 && playerposition <= 70){
    obstaculo.style.animation = 'none'
    obstaculo.style.left = `${obsposition}px`

    player.style.animation = 'none'
    player.style.bottom = `${playerposition}px`
document.getElementById('pontuacao').innerHTML = 'clique para recomeçar'
    clearInterval(loop)
}

if(obsposition <= 110 && obsposition >= 0 && playerposition <= 70)document.addEventListener('click',function(event){
    location.reload()
    
})

}, 10)





var pontuacao = 1
//
document.addEventListener('keydown',function(event){pontuacao++
    document.getElementById('pontuacao').innerHTML = 'Pontuação: ' + pontuacao
})
document.addEventListener('click',function(event){pontuacao++
    document.getElementById('pontuacao').innerHTML = 'Pontuação: ' + pontuacao
})

document.addEventListener('keydown', jump)

document.addEventListener('click', jump)


//toda que clicar adicionar mais um ponto


    