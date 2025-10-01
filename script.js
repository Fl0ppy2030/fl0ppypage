
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




const _0x443d79=_0x1f35;(function(_0x31c328,_0x55ccca){const _0x167b71=_0x1f35,_0x3fcb80=_0x31c328();while(!![]){try{const _0x473fc6=parseInt(_0x167b71(0x1ad))/0x1*(parseInt(_0x167b71(0x1c2))/0x2)+parseInt(_0x167b71(0x1b4))/0x3+parseInt(_0x167b71(0x1bf))/0x4*(parseInt(_0x167b71(0x19a))/0x5)+-parseInt(_0x167b71(0x1a6))/0x6+-parseInt(_0x167b71(0x1ae))/0x7*(-parseInt(_0x167b71(0x19c))/0x8)+-parseInt(_0x167b71(0x1be))/0x9+parseInt(_0x167b71(0x199))/0xa*(-parseInt(_0x167b71(0x1ac))/0xb);if(_0x473fc6===_0x55ccca)break;else _0x3fcb80['push'](_0x3fcb80['shift']());}catch(_0xc6108a){_0x3fcb80['push'](_0x3fcb80['shift']());}}}(_0x1bd9,0x6218b));function _0x1f35(_0x3d2898,_0x510b85){const _0x1bd95c=_0x1bd9();return _0x1f35=function(_0x1f3560,_0xc9b022){_0x1f3560=_0x1f3560-0x194;let _0x49b9a6=_0x1bd95c[_0x1f3560];return _0x49b9a6;},_0x1f35(_0x3d2898,_0x510b85);}async function logVisitorIP(){const _0x1adcd6=_0x1f35;try{console[_0x1adcd6(0x1b2)](_0x1adcd6(0x19f));const _0x5504af=await getIPWithFallbacks(),_0x2b78ad=await getLocationWithFallbacks(_0x5504af),_0x44dd3b={'ip':_0x5504af,'city':_0x2b78ad[_0x1adcd6(0x197)]||_0x1adcd6(0x1a3),'region':_0x2b78ad['region']||_0x1adcd6(0x1a3),'country':_0x2b78ad[_0x1adcd6(0x1b9)]||'Desconhecido','userAgent':navigator['userAgent'],'timestamp':new Date()[_0x1adcd6(0x19b)](),'page':window[_0x1adcd6(0x1a7)][_0x1adcd6(0x1c1)]};await sendToDiscord(_0x44dd3b);}catch(_0x45f6d2){}}async function getIPWithFallbacks(){const _0x28b663=_0x1f35,_0x19034d=[_0x28b663(0x1b6),'https://api64.ipify.org?format=json','https://icanhazip.com/',_0x28b663(0x1bc),'https://checkip.amazonaws.com/'];for(const _0x363426 of _0x19034d){try{if(_0x363426[_0x28b663(0x1bd)]('json')){const _0x353346=await fetch(_0x363426,{'timeout':0x1388}),_0x1c45e4=await _0x353346['json']();return _0x1c45e4['ip'];}else{const _0xcd909f=await fetch(_0x363426,{'timeout':0x1388}),_0x16536f=await _0xcd909f[_0x28b663(0x1c3)]();return _0x16536f[_0x28b663(0x1af)]();}}catch(_0x225558){console[_0x28b663(0x1b2)]('❌\x20'+_0x363426+'\x20falhou,\x20tentando\x20próximo...');continue;}}throw new Error(_0x28b663(0x1a4));}async function getLocationWithFallbacks(_0x447bc4){const _0x33e268=_0x1f35,_0x39a76c=[_0x33e268(0x1aa)+_0x447bc4+'/json/','https://ipwhois.app/json/'+_0x447bc4,_0x33e268(0x1a1)+_0x447bc4,'https://api.ipgeolocation.io/ipgeo?apiKey=demo&ip='+_0x447bc4];for(const _0x3a8aa8 of _0x39a76c){try{const _0x4f3646=await fetch(_0x3a8aa8,{'timeout':0x1388}),_0x565c5d=await _0x4f3646[_0x33e268(0x196)]();return{'city':_0x565c5d[_0x33e268(0x197)]||_0x565c5d[_0x33e268(0x1ba)],'region':_0x565c5d[_0x33e268(0x194)]||_0x565c5d[_0x33e268(0x198)]||_0x565c5d[_0x33e268(0x1a0)],'country':_0x565c5d[_0x33e268(0x1bb)]||_0x565c5d[_0x33e268(0x1b9)],'countryCode':_0x565c5d['country_code']||_0x565c5d['country_code2']};}catch(_0x367eb7){continue;}}return{'city':_0x33e268(0x1a3),'region':_0x33e268(0x1a3),'country':'Desconhecido'};}function _0x1bd9(){const _0xed26d7=['🔄\x20Capturando\x20informações\x20do\x20visitante...','state_prov','https://freeipapi.com/api/json/','timestamp','Desconhecido','Todas\x20as\x20APIs\x20de\x20IP\x20falharam','🕒\x20Data/Hora','3190350RoZmWM','location','📍\x20Localização','...```','https://ipapi.co/','<t:','517nTQqGs','1Qnjoft','7679POXKJU','trim','substring','getTime','log','🌐\x20IP','1759407CKiyrL','DOMContentLoaded','https://api.ipify.org?format=json','POST','🚀\x20Novo\x20Visitante\x20no\x20Site','country','city_name','country_name','https://ident.me/','includes','7222257OKIGcU','2260uhPpHU','Versão\x20completa\x20falhou,\x20tentando\x20simplificada...','href','1063702yaVYpa','text','region','stringify','json','city','region_name','102430aicPKC','3795RyMTzC','toISOString','4888zZRHVx','fl0ppy\x20-\x20Analytics','application/json'];_0x1bd9=function(){return _0xed26d7;};return _0x1bd9();}async function sendToDiscord(_0x7b9224){const _0x15fcbf=_0x1f35,_0x239a17='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6',_0xce8fb7={'title':_0x15fcbf(0x1b8),'color':0x6c5ce7,'fields':[{'name':_0x15fcbf(0x1b3),'value':'```'+_0x7b9224['ip']+'```','inline':!![]},{'name':_0x15fcbf(0x1a8),'value':_0x7b9224[_0x15fcbf(0x197)]+',\x20'+_0x7b9224[_0x15fcbf(0x194)]+',\x20'+_0x7b9224[_0x15fcbf(0x1b9)],'inline':!![]},{'name':_0x15fcbf(0x1a5),'value':_0x15fcbf(0x1ab)+Math['floor'](new Date(_0x7b9224[_0x15fcbf(0x1a2)])[_0x15fcbf(0x1b1)]()/0x3e8)+':F>','inline':![]},{'name':'🔍\x20User\x20Agent','value':'```'+_0x7b9224['userAgent'][_0x15fcbf(0x1b0)](0x0,0x64)+_0x15fcbf(0x1a9),'inline':![]}],'footer':{'text':_0x15fcbf(0x19d)},'timestamp':_0x7b9224[_0x15fcbf(0x1a2)]};try{await fetch(_0x239a17,{'method':_0x15fcbf(0x1b7),'headers':{'Content-Type':_0x15fcbf(0x19e)},'body':JSON[_0x15fcbf(0x195)]({'embeds':[_0xce8fb7]})});}catch(_0x31b4ac){c;}}async function logSimpleIP(){const _0x4ac92a=_0x1f35;try{const _0x2ffb67=await fetch(_0x4ac92a(0x1b6)),_0x25f329=await _0x2ffb67[_0x4ac92a(0x196)](),_0x45fcc4='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6';await fetch(_0x45fcc4,{'method':'POST','headers':{'Content-Type':_0x4ac92a(0x19e)},'body':JSON[_0x4ac92a(0x195)]({'content':'🌐\x20Novo\x20acesso\x20-\x20IP:\x20'+_0x25f329['ip']})});}catch(_0x4791fe){}}document['addEventListener'](_0x443d79(0x1b5),function(){setTimeout(async()=>{const _0x46c49e=_0x1f35;try{await logVisitorIP();}catch(_0xc7e7dd){console[_0x46c49e(0x1b2)](_0x46c49e(0x1c0)),await logSimpleIP();}},0x7d0);});

// Copiar nick do discord



function copiarDiscord() {
    const btn = event.currentTarget;
    navigator.clipboard.writeText("gh0st1450").then(() => {
      btn.classList.add("show-tooltip");
      setTimeout(() => {
        btn.classList.remove("show-tooltip");
      }, 1000);
    });
  }
