
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


