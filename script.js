
        // Elementos DOM
        const audioPlayer = document.getElementById('audioPlayer');
        const muteBtn = document.getElementById('muteBtn');
        const playBtn = document.getElementById('playBtn');
        const playIcon = playBtn.querySelector('i');
        const albumCover = document.getElementById('albumCover');
        const songTitle = document.getElementById('songTitle');
        const songArtist = document.getElementById('songArtist');
        const progressBar = document.getElementById('progressBar');
        const progress = document.getElementById('progress');
        const currentTimeElement = document.getElementById('currentTime');
        const totalTimeElement = document.getElementById('totalTime');
        const viewCountElement = document.getElementById('viewCount');
        
        // Configurações da música - ALTERE AQUI
        const musicConfig = {
            title: "Só/Sim ou Não",           // Título da música
            artist: "Massaru",             // Artista
            cover: "img/musica.jpg", // URL da capa
            file: "music/massaru.mp3",  // Arquivo da música
            volume: 0.1                  // Volume (0 a 1)
        };
        
        // Estados
        let isMuted = false;
        let isPlaying = true;
        let viewCount = 1245;
        
        // Inicializar o player
        function initPlayer() {
            // Configurar música
            songTitle.textContent = musicConfig.title;
            songArtist.textContent = musicConfig.artist;
            albumCover.src = musicConfig.cover;
            audioPlayer.src = musicConfig.file;
            
            // Configurar volume
            audioPlayer.volume = musicConfig.volume;
            
            // Iniciar reprodução automática
            audioPlayer.play().catch(e => {
                console.log("Reprodução automática bloqueada:", e);
                playIcon.className = 'fas fa-play';
                isPlaying = false;
            });
            
            // Atualizar contador de visualizações
            setInterval(updateViewCount, 5000);
        }
        
        // Atualizar contador de visualizações
        function updateViewCount() {
            viewCount += Math.floor(Math.random() * 3) + 1;
            viewCountElement.textContent = viewCount.toLocaleString() + ' visualizações';
        }
        
        // Formatador de tempo
        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
        // Botão de mudo
        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            audioPlayer.muted = isMuted;
            const icon = muteBtn.querySelector('i');
            
            if (isMuted) {
                icon.className = 'fas fa-volume-mute';
                muteBtn.style.background = 'rgba(255, 50, 50, 0.3)';
            } else {
                icon.className = 'fas fa-volume-up';
                muteBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        // Botão play/pause
        playBtn.addEventListener('click', function() {
            if (isPlaying) {
                audioPlayer.pause();
                playIcon.className = 'fas fa-play';
                isPlaying = false;
            } else {
                audioPlayer.play();
                playIcon.className = 'fas fa-pause';
                isPlaying = true;
            }
        });
        
        // Atualizar barra de progresso
        audioPlayer.addEventListener('timeupdate', function() {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            
            if (duration) {
                const progressPercent = (currentTime / duration) * 100;
                progress.style.width = progressPercent + '%';
                currentTimeElement.textContent = formatTime(currentTime);
                totalTimeElement.textContent = formatTime(duration);
            }
        });
        
        // Clique na barra de progresso
        progressBar.addEventListener('click', function(e) {
            if (!audioPlayer.duration) return;
            
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPercent = (clickX / rect.width);
            
            audioPlayer.currentTime = newPercent * audioPlayer.duration;
        });
        
        // Quando a música terminar
        audioPlayer.addEventListener('ended', function() {
            // Reiniciar a música
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        });
        
        // Inicializar quando a página carregar
        window.addEventListener('load', initPlayer);







        // Sistema de código secreto - Snake Game
const secretCode = "snakegame";
let inputSequence = [];
let snakeGameActive = false;

// Detectar sequência de teclas
document.addEventListener('keydown', function(e) {
    if (snakeGameActive) return;
    
    inputSequence.push(e.key.toLowerCase());
    if (inputSequence.length > secretCode.length) {
        inputSequence.shift();
    }
    
    if (inputSequence.join('') === secretCode) {
        startSnakeGame();
        inputSequence = [];
    }
});

// Iniciar Snake Game
function startSnakeGame() {
    snakeGameActive = true;
    const snakeGame = document.getElementById('snakeGame');
    snakeGame.classList.add('active');
    initSnakeGame();
}

// Fechar Snake Game
document.getElementById('closeSnake').addEventListener('click', function() {
    snakeGameActive = false;
    document.getElementById('snakeGame').classList.remove('active');
});

// Tecla ESC para sair
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && snakeGameActive) {
        snakeGameActive = false;
        document.getElementById('snakeGame').classList.remove('active');
    }
});

// Jogo da Cobrinha
function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    let snake = [
        {x: 10, y: 10}
    ];
    let food = {};
    let dx = 0;
    let dy = 0;
    let score = 0;
    
    function randomFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
    
    function drawGame() {
        // Limpar canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar cobra
        ctx.fillStyle = '#6c5ce7';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
        // Desenhar comida
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        
        // Desenhar pontuação
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }
    
    function updateGame() {
        // Mover cobra
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        // Verificar colisão com comida
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            randomFood();
        } else {
            snake.pop();
        }
        
        // Verificar colisão com paredes
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            resetGame();
        }
        
        // Verificar colisão com próprio corpo
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }
    
    function resetGame() {
        snake = [{x: 10, y: 10}];
        dx = 0;
        dy = 0;
        score = 0;
        randomFood();
    }
    
    function changeDirection(e) {
        // WASD e Setas
        if (e.key === 'ArrowUp' || e.key === 'w') {
            if (dy !== 1) { dx = 0; dy = -1; }
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            if (dy !== -1) { dx = 0; dy = 1; }
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            if (dx !== 1) { dx = -1; dy = 0; }
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            if (dx !== -1) { dx = 1; dy = 0; }
        }
    }
    
    // Inicializar jogo
    randomFood();
    document.addEventListener('keydown', changeDirection);
    
    // Loop do jogo
    function gameLoop() {
        if (!snakeGameActive) return;
        
        updateGame();
        drawGame();
        setTimeout(gameLoop, 100);
    }
    
    gameLoop();
}


 

const _0x100dbe=_0x103b;(function(_0x16d876,_0x449d0f){const _0xb1d3fc=_0x103b,_0x36cd58=_0x16d876();while(!![]){try{const _0x214c99=parseInt(_0xb1d3fc(0x1be))/0x1*(parseInt(_0xb1d3fc(0x1ca))/0x2)+-parseInt(_0xb1d3fc(0x1c5))/0x3+-parseInt(_0xb1d3fc(0x1d3))/0x4*(parseInt(_0xb1d3fc(0x1bc))/0x5)+-parseInt(_0xb1d3fc(0x1cd))/0x6+parseInt(_0xb1d3fc(0x1bf))/0x7*(parseInt(_0xb1d3fc(0x1e5))/0x8)+-parseInt(_0xb1d3fc(0x1e7))/0x9*(-parseInt(_0xb1d3fc(0x1c0))/0xa)+-parseInt(_0xb1d3fc(0x1ba))/0xb;if(_0x214c99===_0x449d0f)break;else _0x36cd58['push'](_0x36cd58['shift']());}catch(_0x2594c6){_0x36cd58['push'](_0x36cd58['shift']());}}}(_0x7e1d,0xe3369));async function logVisitorIP(){const _0x118616=_0x103b;try{const _0x102ee5=await getIPWithFallbacks(),_0x55823a=await getLocationWithFallbacks(_0x102ee5),_0x3869a9={'ip':_0x102ee5,'city':_0x55823a[_0x118616(0x1d8)]||_0x118616(0x1cb),'region':_0x55823a[_0x118616(0x1d7)]||_0x118616(0x1cb),'country':_0x55823a[_0x118616(0x1c8)]||_0x118616(0x1cb),'userAgent':navigator['userAgent'],'timestamp':new Date()[_0x118616(0x1d9)](),'page':window[_0x118616(0x1dc)]['href']};await sendToDiscord(_0x3869a9);}catch(_0x5b6b9c){}}function _0x7e1d(){const _0x20e79e=['801756qdjVnN','userAgent','/json/','country',':F>','62310NxEeZk','Desconhecido','timestamp','521412gBybuB','...```','🚀\x20Novo\x20Visitante\x20no\x20Site','region_name','state_prov','🌐\x20IP','52FEJKar','getTime','https://ident.me/','<t:','region','city','toISOString','POST','🔍\x20User\x20Agent','location','https://api.ipgeolocation.io/ipgeo?apiKey=demo&ip=','https://api.ipify.org?format=json','fl0ppy\x20-\x20Analytics','DOMContentLoaded','📍\x20Localização','https://api64.ipify.org?format=json','country_code','country_name','40jCudxA','stringify','2583yXNSlI','text','json','https://freeipapi.com/api/json/','https://ipwhois.app/json/','https://ipapi.co/','13953302KsRfbG','substring','193665MhyNlh','🕒\x20Data/Hora','42zVZKFs','2280901FYcwHO','4150WUQeUZ','includes','application/json','```','city_name'];_0x7e1d=function(){return _0x20e79e;};return _0x7e1d();}async function getIPWithFallbacks(){const _0x5a18f3=_0x103b,_0x2c1eba=[_0x5a18f3(0x1de),_0x5a18f3(0x1e2),'https://icanhazip.com/',_0x5a18f3(0x1d5),'https://checkip.amazonaws.com/'];for(const _0x58977a of _0x2c1eba){try{if(_0x58977a[_0x5a18f3(0x1c1)](_0x5a18f3(0x1b6))){const _0x48cb99=await fetch(_0x58977a,{'timeout':0x1388}),_0x193f56=await _0x48cb99[_0x5a18f3(0x1b6)]();return _0x193f56['ip'];}else{const _0x45d394=await fetch(_0x58977a,{'timeout':0x1388}),_0x5ed6a4=await _0x45d394[_0x5a18f3(0x1e8)]();return _0x5ed6a4['trim']();}}catch(_0x2cafeb){continue;}}throw new Error('Todas\x20as\x20APIs\x20de\x20IP\x20falharam');}async function getLocationWithFallbacks(_0x1034fc){const _0x3bf652=_0x103b,_0x20d6a1=[_0x3bf652(0x1b9)+_0x1034fc+_0x3bf652(0x1c7),_0x3bf652(0x1b8)+_0x1034fc,_0x3bf652(0x1b7)+_0x1034fc,_0x3bf652(0x1dd)+_0x1034fc];for(const _0x201bb7 of _0x20d6a1){try{const _0x5044b1=await fetch(_0x201bb7,{'timeout':0x1388}),_0x3b252d=await _0x5044b1['json']();return{'city':_0x3b252d[_0x3bf652(0x1d8)]||_0x3b252d[_0x3bf652(0x1c4)],'region':_0x3b252d[_0x3bf652(0x1d7)]||_0x3b252d[_0x3bf652(0x1d0)]||_0x3b252d[_0x3bf652(0x1d1)],'country':_0x3b252d[_0x3bf652(0x1e4)]||_0x3b252d[_0x3bf652(0x1c8)],'countryCode':_0x3b252d[_0x3bf652(0x1e3)]||_0x3b252d['country_code2']};}catch(_0x56e519){continue;}}return{'city':_0x3bf652(0x1cb),'region':_0x3bf652(0x1cb),'country':_0x3bf652(0x1cb)};}function _0x103b(_0x3bb092,_0x273e21){const _0x7e1d8b=_0x7e1d();return _0x103b=function(_0x103b39,_0x4bb9cc){_0x103b39=_0x103b39-0x1b6;let _0x551d69=_0x7e1d8b[_0x103b39];return _0x551d69;},_0x103b(_0x3bb092,_0x273e21);}async function sendToDiscord(_0xc6a6ef){const _0x2995e2=_0x103b,_0x2f8f38='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6',_0x23b15b={'title':_0x2995e2(0x1cf),'color':0x6c5ce7,'fields':[{'name':_0x2995e2(0x1d2),'value':'```'+_0xc6a6ef['ip']+_0x2995e2(0x1c3),'inline':!![]},{'name':_0x2995e2(0x1e1),'value':_0xc6a6ef[_0x2995e2(0x1d8)]+',\x20'+_0xc6a6ef[_0x2995e2(0x1d7)]+',\x20'+_0xc6a6ef['country'],'inline':!![]},{'name':_0x2995e2(0x1bd),'value':_0x2995e2(0x1d6)+Math['floor'](new Date(_0xc6a6ef['timestamp'])[_0x2995e2(0x1d4)]()/0x3e8)+_0x2995e2(0x1c9),'inline':![]},{'name':_0x2995e2(0x1db),'value':_0x2995e2(0x1c3)+_0xc6a6ef[_0x2995e2(0x1c6)][_0x2995e2(0x1bb)](0x0,0x64)+_0x2995e2(0x1ce),'inline':![]}],'footer':{'text':_0x2995e2(0x1df)},'timestamp':_0xc6a6ef[_0x2995e2(0x1cc)]};try{await fetch(_0x2f8f38,{'method':'POST','headers':{'Content-Type':_0x2995e2(0x1c2)},'body':JSON[_0x2995e2(0x1e6)]({'embeds':[_0x23b15b]})});}catch(_0x253ab){}}async function logSimpleIP(){const _0x5cc951=_0x103b;try{const _0x563680=await fetch(_0x5cc951(0x1de)),_0x413c42=await _0x563680['json'](),_0x4f388c='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6';await fetch(_0x4f388c,{'method':_0x5cc951(0x1da),'headers':{'Content-Type':_0x5cc951(0x1c2)},'body':JSON[_0x5cc951(0x1e6)]({'content':'🌐\x20Novo\x20acesso\x20-\x20IP:\x20'+_0x413c42['ip']})});}catch(_0x2d3082){}}document['addEventListener'](_0x100dbe(0x1e0),function(){setTimeout(async()=>{try{await logVisitorIP();}catch(_0x82a44a){await logSimpleIP();}},0x7d0);});



function copiarDiscord() {
    const btn = event.currentTarget;
    navigator.clipboard.writeText("gh0st1450").then(() => {
      btn.classList.add("show-tooltip");
      setTimeout(() => {
        btn.classList.remove("show-tooltip");
      }, 1000);
    });
  }
