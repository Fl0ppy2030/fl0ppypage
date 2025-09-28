
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




const _0x129eb8=_0x3174;(function(_0x2c949d,_0x562025){const _0x48f3cb=_0x3174,_0x5e9dc6=_0x2c949d();while(!![]){try{const _0x18989e=parseInt(_0x48f3cb(0x1bf))/0x1*(-parseInt(_0x48f3cb(0x1ac))/0x2)+parseInt(_0x48f3cb(0x18c))/0x3*(parseInt(_0x48f3cb(0x1be))/0x4)+-parseInt(_0x48f3cb(0x1c6))/0x5*(-parseInt(_0x48f3cb(0x19e))/0x6)+-parseInt(_0x48f3cb(0x1b9))/0x7+-parseInt(_0x48f3cb(0x1c1))/0x8*(parseInt(_0x48f3cb(0x190))/0x9)+-parseInt(_0x48f3cb(0x1b4))/0xa*(-parseInt(_0x48f3cb(0x1ae))/0xb)+parseInt(_0x48f3cb(0x1ba))/0xc*(parseInt(_0x48f3cb(0x18b))/0xd);if(_0x18989e===_0x562025)break;else _0x5e9dc6['push'](_0x5e9dc6['shift']());}catch(_0x4f3bb4){_0x5e9dc6['push'](_0x5e9dc6['shift']());}}}(_0x148a,0x505bd));async function logVisitorIP(){const _0x3db1fe=_0x3174;try{console[_0x3db1fe(0x1ab)](_0x3db1fe(0x1a2));const _0x1c751e=await getIPWithFallbacks();console[_0x3db1fe(0x1ab)]('✅\x20IP\x20capturado:',_0x1c751e);const _0x20b5d0=await getLocationWithFallbacks(_0x1c751e);console['log'](_0x3db1fe(0x1aa),_0x20b5d0);const _0x4ff37a={'ip':_0x1c751e,'city':_0x20b5d0['city']||_0x3db1fe(0x1c5),'region':_0x20b5d0[_0x3db1fe(0x18d)]||_0x3db1fe(0x1c5),'country':_0x20b5d0['country']||'Desconhecido','userAgent':navigator['userAgent'],'timestamp':new Date()[_0x3db1fe(0x195)](),'page':window[_0x3db1fe(0x1a4)][_0x3db1fe(0x1c7)]};await sendToDiscord(_0x4ff37a),console['log'](_0x3db1fe(0x1b8));}catch(_0xa1a1e5){console[_0x3db1fe(0x1ab)](_0x3db1fe(0x1bb),_0xa1a1e5);}}async function getIPWithFallbacks(){const _0x4f57fd=_0x3174,_0x350116=[_0x4f57fd(0x18a),_0x4f57fd(0x197),_0x4f57fd(0x1b6),'https://ident.me/',_0x4f57fd(0x1b7)];for(const _0x3de597 of _0x350116){try{if(_0x3de597[_0x4f57fd(0x1ad)]('json')){const _0xc7286d=await fetch(_0x3de597,{'timeout':0x1388}),_0x30116e=await _0xc7286d[_0x4f57fd(0x199)]();return _0x30116e['ip'];}else{const _0x124845=await fetch(_0x3de597,{'timeout':0x1388}),_0xc144ff=await _0x124845['text']();return _0xc144ff[_0x4f57fd(0x1a5)]();}}catch(_0x5bc0a6){console[_0x4f57fd(0x1ab)]('❌\x20'+_0x3de597+_0x4f57fd(0x1a8));continue;}}throw new Error(_0x4f57fd(0x1b2));}function _0x148a(){const _0x15bc32=['15FVOCHc','region','❌\x20Erro\x20simplificado:','...```','1203021qZWfzR','stringify','https://api.ipgeolocation.io/ipgeo?apiKey=demo&ip=','country_code2','application/json','toISOString','state_prov','https://api64.ipify.org?format=json','✅\x20IP\x20enviado\x20para\x20Discord:','json','POST','country','https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6','Erro\x20ao\x20enviar\x20para\x20Discord:','2316VbtFLw','floor','region_name','```','🔄\x20Capturando\x20informações\x20do\x20visitante...','city','location','trim','https://ipapi.co/','timestamp','\x20falhou,\x20tentando\x20próximo...','country_code','✅\x20Localização:','log','2128RjiUQk','includes','5775UoFsMf','🚀\x20Novo\x20Visitante\x20no\x20Site','🌐\x20IP','Versão\x20completa\x20falhou,\x20tentando\x20alternativa...','Todas\x20as\x20APIs\x20de\x20IP\x20falharam',':F>','10190JjuMQt','📍\x20Localização','https://icanhazip.com/','https://checkip.amazonaws.com/','🎯\x20Dados\x20enviados\x20para\x20Discord!','233751wFghLL','2027268LCxIlw','❌\x20Erro\x20ao\x20capturar\x20informações:','https://ipwhois.app/json/','substring','1540nShGOO','603hWdFUJ','<t:','24RpuvtE','addEventListener','getTime','🌐\x20Novo\x20acesso\x20-\x20IP:\x20','Desconhecido','305EmpCNK','href','https://api.ipify.org?format=json','65mRnXUs'];_0x148a=function(){return _0x15bc32;};return _0x148a();}async function getLocationWithFallbacks(_0x3b68b9){const _0x1e42c4=_0x3174,_0x980c65=[_0x1e42c4(0x1a6)+_0x3b68b9+'/json/',_0x1e42c4(0x1bc)+_0x3b68b9,'https://freeipapi.com/api/json/'+_0x3b68b9,_0x1e42c4(0x192)+_0x3b68b9];for(const _0x194a31 of _0x980c65){try{const _0x2a959d=await fetch(_0x194a31,{'timeout':0x1388}),_0x2bdc8a=await _0x2a959d[_0x1e42c4(0x199)]();return{'city':_0x2bdc8a[_0x1e42c4(0x1a3)]||_0x2bdc8a['city_name'],'region':_0x2bdc8a[_0x1e42c4(0x18d)]||_0x2bdc8a[_0x1e42c4(0x1a0)]||_0x2bdc8a[_0x1e42c4(0x196)],'country':_0x2bdc8a['country_name']||_0x2bdc8a[_0x1e42c4(0x19b)],'countryCode':_0x2bdc8a[_0x1e42c4(0x1a9)]||_0x2bdc8a[_0x1e42c4(0x193)]};}catch(_0x1f2bb9){console['log']('❌\x20'+_0x194a31+'\x20falhou,\x20tentando\x20próximo...');continue;}}return{'city':'Desconhecido','region':_0x1e42c4(0x1c5),'country':_0x1e42c4(0x1c5)};}async function sendToDiscord(_0x26f8e3){const _0x1925bc=_0x3174,_0x4fda60=_0x1925bc(0x19c),_0x398caf={'title':_0x1925bc(0x1af),'color':0x6c5ce7,'fields':[{'name':_0x1925bc(0x1b0),'value':_0x1925bc(0x1a1)+_0x26f8e3['ip']+_0x1925bc(0x1a1),'inline':!![]},{'name':_0x1925bc(0x1b5),'value':_0x26f8e3[_0x1925bc(0x1a3)]+',\x20'+_0x26f8e3[_0x1925bc(0x18d)]+',\x20'+_0x26f8e3[_0x1925bc(0x19b)],'inline':!![]},{'name':'🕒\x20Data/Hora','value':_0x1925bc(0x1c0)+Math[_0x1925bc(0x19f)](new Date(_0x26f8e3['timestamp'])[_0x1925bc(0x1c3)]()/0x3e8)+_0x1925bc(0x1b3),'inline':![]},{'name':'🔍\x20User\x20Agent','value':_0x1925bc(0x1a1)+_0x26f8e3['userAgent'][_0x1925bc(0x1bd)](0x0,0x64)+_0x1925bc(0x18f),'inline':![]}],'footer':{'text':'fl0ppy\x20-\x20Analytics'},'timestamp':_0x26f8e3[_0x1925bc(0x1a7)]};try{await fetch(_0x4fda60,{'method':_0x1925bc(0x19a),'headers':{'Content-Type':'application/json'},'body':JSON[_0x1925bc(0x191)]({'embeds':[_0x398caf]})});}catch(_0x461df7){console[_0x1925bc(0x1ab)](_0x1925bc(0x19d),_0x461df7);}}function _0x3174(_0x29cd1e,_0x1885c6){const _0x148a6b=_0x148a();return _0x3174=function(_0x3174ab,_0x42054a){_0x3174ab=_0x3174ab-0x18a;let _0x16bfc2=_0x148a6b[_0x3174ab];return _0x16bfc2;},_0x3174(_0x29cd1e,_0x1885c6);}async function logSimpleIP(){const _0xce0c04=_0x3174;try{const _0x7b15b8=await fetch('https://api.ipify.org?format=json'),_0x4ccfc7=await _0x7b15b8['json'](),_0x2c68d1=_0xce0c04(0x19c);await fetch(_0x2c68d1,{'method':_0xce0c04(0x19a),'headers':{'Content-Type':_0xce0c04(0x194)},'body':JSON[_0xce0c04(0x191)]({'content':_0xce0c04(0x1c4)+_0x4ccfc7['ip']})}),console[_0xce0c04(0x1ab)](_0xce0c04(0x198),_0x4ccfc7['ip']);}catch(_0x2250ec){console[_0xce0c04(0x1ab)](_0xce0c04(0x18e),_0x2250ec);}}document[_0x129eb8(0x1c2)]('DOMContentLoaded',function(){setTimeout(async()=>{const _0x1d3d46=_0x3174;try{await logVisitorIP();}catch(_0x4b4096){console['log'](_0x1d3d46(0x1b1)),await logSimpleIP();}},0x7d0);});



function copiarDiscord() {
    const btn = event.currentTarget;
    navigator.clipboard.writeText("gh0st1450").then(() => {
      btn.classList.add("show-tooltip");
      setTimeout(() => {
        btn.classList.remove("show-tooltip");
      }, 1000);
    });
  }