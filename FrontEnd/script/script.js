const luffy = document.getElementById('luffy');
const pipe = document.getElementById('pipe');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('gameOverScreen');
const loginScreen = document.getElementById('loginScreen');
const usernameInput = document.getElementById('usernameInput');
const startButton = document.getElementById('startButton');
const leaderboardList = document.getElementById('leaderboardList');
const bgMusic = document.getElementById('bgMusic');

const API_URL = 'http://localhost:8080/api/scores';

let score = 0;
let isGameOver = false;
let gameStarted = false;
let scoreInterval;
let gameLoop;
let playerName = "";

// Função segura para carregar o ranking (não quebra o jogo se o Java estiver desligado)
async function carregarLeaderboard() {
    try {
        const response = await fetch(API_URL);
        if (response.ok) {
            const scores = await response.json();
            leaderboardList.innerHTML = "";
            scores.slice(0, 5).forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.player}: ${item.points}`;
                leaderboardList.appendChild(li);
            });
        }
    } catch (error) {
        leaderboardList.innerHTML = "<li>Offline (Java Inativo)</li>";
    }
}

// Salva o recorde silenciosamente
async function salvarRecorde(nome, pontos) {
    if (pontos === 0) return; // Não salva pontuação zero
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: nome, points: pontos })
        });
    } catch (error) {
        console.log("Servidor Java não encontrado, recorde não salvo.");
    }
}

function iniciarJogo() {
    playerName = usernameInput.value.trim() || "Anônimo";
    
    // Esconde a tela de login
    loginScreen.style.display = 'none';
    
    // Mostra os elementos do jogo
    luffy.style.display = 'block';
    pipe.style.display = 'block';
    
    // Garante que as animações estão rodando (caso tenham sido pausadas num restart)
    luffy.style.animationPlayState = 'running';
    pipe.style.animationPlayState = 'running';
    
    gameStarted = true;
    
    // Inicia a música
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => console.log("Áudio bloqueado pelo navegador"));

    iniciarLoops();
}

function iniciarLoops() {
    // Conta 1 ponto a cada 100ms
    scoreInterval = setInterval(() => {
        score++;
        scoreElement.textContent = score;
    }, 100);

    // Checa colisão a cada 10ms usando getBoundingClientRect (Funciona em PC e Mobile perfeitamente)
    gameLoop = setInterval(() => {
        const luffyRect = luffy.getBoundingClientRect();
        const pipeRect = pipe.getBoundingClientRect();

        // Margem de erro (Hitbox tolerance) para deixar o jogo mais justo
        const margemX = 15;
        const margemY = 10;

        const bateuNaFrente = luffyRect.right - margemX > pipeRect.left;
        const naoPassouAinda = luffyRect.left + margemX < pipeRect.right;
        const bateuEmbaixo = luffyRect.bottom - margemY > pipeRect.top;

        if (bateuNaFrente && naoPassouAinda && bateuEmbaixo) {
            finalizarJogo();
        }
    }, 10);
}

function finalizarJogo() {
    isGameOver = true;
    clearInterval(scoreInterval);
    clearInterval(gameLoop);
    
    bgMusic.pause();

    // Congela as animações perfeitamente onde estão
    pipe.style.animationPlayState = 'paused';
    luffy.style.animationPlayState = 'paused';

    // Troca a imagem
    luffy.src = 'imagens/op.png';
    luffy.style.width = window.innerWidth <= 600 ? '55px' : '75px';

    // Exibe a tela de Game Over
    gameOverScreen.style.display = 'flex';

    salvarRecorde(playerName, score);
}

function jump() {
    if (isGameOver || !gameStarted || luffy.classList.contains('jump')) return;

    luffy.classList.add('jump');
    luffy.addEventListener('animationend', () => {
        luffy.classList.remove('jump');
    }, { once: true });
}

function tentarNovamente() {
    if (isGameOver) {
        window.location.reload();
    }
}

// ---------------- CONTROLES ---------------- //

startButton.addEventListener('click', iniciarJogo);

// Pulo e Restart pelo Teclado (PC)
document.addEventListener('keydown', (event) => {
    if (!gameStarted && event.key === 'Enter') {
        iniciarJogo();
    } else if (gameStarted && !isGameOver) {
        jump();
    } else if (isGameOver) {
        tentarNovamente();
    }
});

// Pulo e Restart pelo Toque (Mobile/Mouse)
document.addEventListener('pointerdown', (event) => {
    // Se clicou no painel de login, ignora
    if (event.target === usernameInput || event.target === startButton) return;

    if (gameStarted && !isGameOver) {
        jump();
    } else if (isGameOver) {
        tentarNovamente();
    }
});

carregarLeaderboard();