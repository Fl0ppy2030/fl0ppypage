
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
        
        // Trocar musica
        const musicConfig = {
            title: "Só/Sim ou Não",           // Título da música
            artist: "Massaru",             // Artista
            cover: "img/musica.jpg", // URL da capa
            file: "music/massaru.mp3",  // Arquivo da música
            volume: 0.1                  // Volume (0 a 1)
        };
        
   
        let isMuted = false;
        let isPlaying = true;
        let viewCount = 1245;
        
 
        function initPlayer() {
       
            songTitle.textContent = musicConfig.title;
            songArtist.textContent = musicConfig.artist;
            albumCover.src = musicConfig.cover;
            audioPlayer.src = musicConfig.file;
            
         
            audioPlayer.volume = musicConfig.volume;
            
      
            audioPlayer.play().catch(e => {
                console.log("Reprodução automática bloqueada:", e);
                playIcon.className = 'fas fa-play';
                isPlaying = false;
            });
            
        
            setInterval(updateViewCount, 5000);
        }
        
     
        function updateViewCount() {
            viewCount += Math.floor(Math.random() * 3) + 1;
            viewCountElement.textContent = viewCount.toLocaleString() + ' visualizações';
        }
        
     
        function formatTime(seconds) {
            if (isNaN(seconds)) return "0:00";
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
        
     
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
        
    
        progressBar.addEventListener('click', function(e) {
            if (!audioPlayer.duration) return;
            
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newPercent = (clickX / rect.width);
            
            audioPlayer.currentTime = newPercent * audioPlayer.duration;
        });
        
      
        audioPlayer.addEventListener('ended', function() {
            // Reiniciar a música
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        });
        
        
        window.addEventListener('load', initPlayer);







    
const secretCode = "snakegame";
let inputSequence = [];
let snakeGameActive = false;


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


function startSnakeGame() {
    snakeGameActive = true;
    const snakeGame = document.getElementById('snakeGame');
    snakeGame.classList.add('active');
    initSnakeGame();
}


document.getElementById('closeSnake').addEventListener('click', function() {
    snakeGameActive = false;
    document.getElementById('snakeGame').classList.remove('active');
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && snakeGameActive) {
        snakeGameActive = false;
        document.getElementById('snakeGame').classList.remove('active');
    }
});


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
      
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
     
        ctx.fillStyle = '#6c5ce7';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
        
      
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        
      
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);
    }
    
    function updateGame() {
     
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
       
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            randomFood();
        } else {
            snake.pop();
        }
        
       
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            resetGame();
        }
        
       
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
    
  
    randomFood();
    document.addEventListener('keydown', changeDirection);
    
    
    function gameLoop() {
        if (!snakeGameActive) return;
        
        updateGame();
        drawGame();
        setTimeout(gameLoop, 100);
    }
    
    gameLoop();
}




const _0x26e9d8=_0x42bf;(function(_0x546e72,_0x2cb253){const _0x4a3fbb=_0x42bf,_0xf518a6=_0x546e72();while(!![]){try{const _0x4b494f=-parseInt(_0x4a3fbb(0x102))/0x1+-parseInt(_0x4a3fbb(0x115))/0x2*(parseInt(_0x4a3fbb(0x10e))/0x3)+-parseInt(_0x4a3fbb(0x111))/0x4+-parseInt(_0x4a3fbb(0x118))/0x5+-parseInt(_0x4a3fbb(0x119))/0x6+parseInt(_0x4a3fbb(0x117))/0x7*(-parseInt(_0x4a3fbb(0xfe))/0x8)+parseInt(_0x4a3fbb(0x11c))/0x9;if(_0x4b494f===_0x2cb253)break;else _0xf518a6['push'](_0xf518a6['shift']());}catch(_0x15b24a){_0xf518a6['push'](_0xf518a6['shift']());}}}(_0x177d,0x4a995));function _0x42bf(_0x241ab4,_0x1e4bb6){const _0x177d2c=_0x177d();return _0x42bf=function(_0x42bf3a,_0x37c14f){_0x42bf3a=_0x42bf3a-0xed;let _0x1491d2=_0x177d2c[_0x42bf3a];return _0x1491d2;},_0x42bf(_0x241ab4,_0x1e4bb6);}async function logVisitorIP(){const _0x233fa=_0x42bf;try{const _0x1a55fa=await getIPWithFallbacks(),_0x3f81aa=await getLocationWithFallbacks(_0x1a55fa),_0x916636={'ip':_0x1a55fa,'city':_0x3f81aa[_0x233fa(0x107)]||_0x233fa(0xfb),'region':_0x3f81aa['region']||_0x233fa(0xfb),'country':_0x3f81aa[_0x233fa(0x11f)]||_0x233fa(0xfb),'userAgent':navigator[_0x233fa(0xfa)],'timestamp':new Date()[_0x233fa(0x121)](),'page':window[_0x233fa(0x105)][_0x233fa(0x112)]};await sendToDiscord(_0x916636);}catch(_0x3411e7){}}function _0x177d(){const _0xee9e0d=['country_code','\x20falhou,\x20tentando\x20próximo...','48wbalbT','country_code2','city_name','🌐\x20IP','39268TylXJB','https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6','fl0ppy\x20-\x20Analytics','location','timestamp','city','floor','Todas\x20as\x20APIs\x20de\x20IP\x20falharam','POST','https://api.ipgeolocation.io/ipgeo?apiKey=demo&ip=','Versão\x20completa\x20falhou,\x20tentando\x20simplificada...','log','5583NIgikX','📍\x20Localização','https://api64.ipify.org?format=json','204236tWdnUg','href','https://icanhazip.com/','getTime','302NpRFPD','stringify','230342wjGmjj','2776850jOjamE','1468698NUwyrk','text','https://ident.me/','15070356PjWrxh','substring','state_prov','country','application/json','toISOString','includes','region','country_name','https://api.ipify.org?format=json','json','trim','https://checkip.amazonaws.com/','/json/',':F>','🕒\x20Data/Hora','🚀\x20Novo\x20Visitante\x20no\x20Site','```','addEventListener','DOMContentLoaded','userAgent','Desconhecido'];_0x177d=function(){return _0xee9e0d;};return _0x177d();}async function getIPWithFallbacks(){const _0x1eeb63=_0x42bf,_0x450e60=['https://api.ipify.org?format=json',_0x1eeb63(0x110),_0x1eeb63(0x113),_0x1eeb63(0x11b),_0x1eeb63(0xf2)];for(const _0x5e8c18 of _0x450e60){try{if(_0x5e8c18[_0x1eeb63(0x122)](_0x1eeb63(0xf0))){const _0x2aa540=await fetch(_0x5e8c18,{'timeout':0x1388}),_0x58941b=await _0x2aa540['json']();return _0x58941b['ip'];}else{const _0x8452a2=await fetch(_0x5e8c18,{'timeout':0x1388}),_0x568be3=await _0x8452a2[_0x1eeb63(0x11a)]();return _0x568be3[_0x1eeb63(0xf1)]();}}catch(_0x1ca0ce){console[_0x1eeb63(0x10d)]('❌\x20'+_0x5e8c18+_0x1eeb63(0xfd));continue;}}throw new Error(_0x1eeb63(0x109));}async function getLocationWithFallbacks(_0x1d025){const _0x321a95=_0x42bf,_0x3f49c2=['https://ipapi.co/'+_0x1d025+_0x321a95(0xf3),'https://ipwhois.app/json/'+_0x1d025,'https://freeipapi.com/api/json/'+_0x1d025,_0x321a95(0x10b)+_0x1d025];for(const _0x57c275 of _0x3f49c2){try{const _0x1a32d5=await fetch(_0x57c275,{'timeout':0x1388}),_0x9a8dcf=await _0x1a32d5[_0x321a95(0xf0)]();return{'city':_0x9a8dcf[_0x321a95(0x107)]||_0x9a8dcf[_0x321a95(0x100)],'region':_0x9a8dcf[_0x321a95(0xed)]||_0x9a8dcf['region_name']||_0x9a8dcf[_0x321a95(0x11e)],'country':_0x9a8dcf[_0x321a95(0xee)]||_0x9a8dcf[_0x321a95(0x11f)],'countryCode':_0x9a8dcf[_0x321a95(0xfc)]||_0x9a8dcf[_0x321a95(0xff)]};}catch(_0x119bfc){continue;}}return{'city':_0x321a95(0xfb),'region':_0x321a95(0xfb),'country':_0x321a95(0xfb)};}async function sendToDiscord(_0x344aff){const _0x3b7b9d=_0x42bf,_0x1d4c92=_0x3b7b9d(0x103),_0x11888d={'title':_0x3b7b9d(0xf6),'color':0x6c5ce7,'fields':[{'name':_0x3b7b9d(0x101),'value':'```'+_0x344aff['ip']+_0x3b7b9d(0xf7),'inline':!![]},{'name':_0x3b7b9d(0x10f),'value':_0x344aff['city']+',\x20'+_0x344aff['region']+',\x20'+_0x344aff[_0x3b7b9d(0x11f)],'inline':!![]},{'name':_0x3b7b9d(0xf5),'value':'<t:'+Math[_0x3b7b9d(0x108)](new Date(_0x344aff['timestamp'])[_0x3b7b9d(0x114)]()/0x3e8)+_0x3b7b9d(0xf4),'inline':![]},{'name':'🔍\x20User\x20Agent','value':'```'+_0x344aff[_0x3b7b9d(0xfa)][_0x3b7b9d(0x11d)](0x0,0x64)+'...```','inline':![]}],'footer':{'text':_0x3b7b9d(0x104)},'timestamp':_0x344aff[_0x3b7b9d(0x106)]};try{await fetch(_0x1d4c92,{'method':_0x3b7b9d(0x10a),'headers':{'Content-Type':'application/json'},'body':JSON[_0x3b7b9d(0x116)]({'embeds':[_0x11888d]})});}catch(_0x4da528){c;}}async function logSimpleIP(){const _0x40dd51=_0x42bf;try{const _0x24fb45=await fetch(_0x40dd51(0xef)),_0x3839af=await _0x24fb45[_0x40dd51(0xf0)](),_0x1fe701='https://discord.com/api/webhooks/1421905203082559488/vJ5-Yi3ojBbRAjVNQXDfJl63aEvintamvbyFGDKXnKKP-AjWNNNJxYwO7Nsue4ha8jP6';await fetch(_0x1fe701,{'method':_0x40dd51(0x10a),'headers':{'Content-Type':_0x40dd51(0x120)},'body':JSON['stringify']({'content':'🌐\x20Novo\x20acesso\x20-\x20IP:\x20'+_0x3839af['ip']})});}catch(_0x606f31){}}document[_0x26e9d8(0xf8)](_0x26e9d8(0xf9),function(){setTimeout(async()=>{const _0x4c95ac=_0x42bf;try{await logVisitorIP();}catch(_0x2eb26b){console[_0x4c95ac(0x10d)](_0x4c95ac(0x10c)),await logSimpleIP();}},0x7d0);});




function copiarDiscord() {
    const btn = event.currentTarget;
    navigator.clipboard.writeText("gh0st1450").then(() => {
      btn.classList.add("show-tooltip");
      setTimeout(() => {
        btn.classList.remove("show-tooltip");
      }, 1000);
    });
  }



document.getElementById("currentYear").textContent = new Date().getFullYear();

