// Função para enviar o recorde para o servidor Java
async function salvarRecorde(nomeJogador, pontuacaoAlcancada) {
    try {
        const response = await fetch('http://localhost:8080/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                player: nomeJogador,
                points: pontuacaoAlcancada
            })
        });

        if (response.ok) {
            console.log('Recorde salvo com sucesso!');
        } else {
            console.error('Erro ao salvar recorde.');
        }
    } catch (error) {
        console.error('Não foi possível conectar ao servidor Java:', error);
    }
}

// Dentro do seu gameLoop existente, onde acontece a colisão:
if (pipePosition <= 130 && pipePosition > 50 && luffyPosition < 80) {
    // ... (seu código existente de parar animações)
    
    isGameOver = true;
    gameOverScreen.style.display = 'flex';
    clearInterval(scoreInterval);
    clearInterval(gameLoop);

    // DISPARO PARA O BACK-END:
    // Pede o nome do jogador e envia para o Java
    const nome = prompt("Game Over! Qual seu nome para o ranking?") || "Anonymous";
    salvarRecorde(nome, score); 
}


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


    