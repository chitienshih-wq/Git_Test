// 遊戲配置
const COLS = 10;
const ROWS = 20;
let BLOCK_SIZE = 30;
const COLORS = [
    null,
    '#06b6d4', // I - 青藍色 (Aquatic Awe)
    '#a78bfa', // O - 紫色 (Future Dusk)
    '#ec4899', // T - 粉紅色 (Transcendent Pink)
    '#10b981', // S - 綠色
    '#f59e0b', // Z - 琥珀色
    '#3b82f6', // J - 藍色
    '#8b5cf6'  // L - 紫藍色
];

// 方塊形狀定義
const PIECES = [
    // I
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    // O
    [
        [2, 2],
        [2, 2]
    ],
    // T
    [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0]
    ],
    // S
    [
        [0, 4, 4],
        [4, 4, 0],
        [0, 0, 0]
    ],
    // Z
    [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0]
    ],
    // J
    [
        [6, 0, 0],
        [6, 6, 6],
        [0, 0, 0]
    ],
    // L
    [
        [0, 0, 7],
        [7, 7, 7],
        [0, 0, 0]
    ]
];

// 遊戲狀態
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let level = 1;
let lines = 0;
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let gamePaused = false;
let gameOver = false;

// 粒子系統（用於爆炸特效）
let particles = [];
let clearingLines = false;
let linesToClear = [];

// Canvas 元素
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextCanvas');
const nextCtx = nextCanvas.getContext('2d');

// 初始化遊戲板
function initBoard() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
}

// 創建新方塊
function createPiece() {
    const type = Math.floor(Math.random() * PIECES.length);
    const piece = PIECES[type].map(row => [...row]);
    return {
        matrix: piece,
        pos: { x: Math.floor(COLS / 2) - Math.floor(piece[0].length / 2), y: 0 },
        type: type + 1
    };
}

// 繪製方塊（立體效果）
function drawBlock(ctx, x, y, color) {
    const blockX = x * BLOCK_SIZE;
    const blockY = y * BLOCK_SIZE;
    const size = BLOCK_SIZE;
    
    // 繪製底部陰影（更明顯的立體感）
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(blockX + 3, blockY + 3, size, size);
    
    // 繪製主體背景（稍暗的顏色）
    ctx.fillStyle = color;
    ctx.fillRect(blockX, blockY, size, size);
    
    // 繪製3D頂部高光（模擬光照從左上角來）
    const topGradient = ctx.createLinearGradient(blockX, blockY, blockX, blockY + size * 0.4);
    topGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    topGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = topGradient;
    ctx.fillRect(blockX, blockY, size, size * 0.4);
    
    // 繪製左側高光
    const leftGradient = ctx.createLinearGradient(blockX, blockY, blockX + size * 0.3, blockY);
    leftGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
    leftGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = leftGradient;
    ctx.fillRect(blockX, blockY, size * 0.3, size);
    
    // 繪製底部和右側陰影（模擬立體邊緣）
    const bottomGradient = ctx.createLinearGradient(blockX, blockY + size * 0.6, blockX, blockY + size);
    bottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    bottomGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = bottomGradient;
    ctx.fillRect(blockX, blockY + size * 0.6, size, size * 0.4);
    
    const rightGradient = ctx.createLinearGradient(blockX + size * 0.7, blockY, blockX + size, blockY);
    rightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    rightGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = rightGradient;
    ctx.fillRect(blockX + size * 0.7, blockY, size * 0.3, size);
    
    // 繪製3D邊框效果
    // 頂部和左側（亮邊）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(blockX, blockY + size);
    ctx.lineTo(blockX, blockY);
    ctx.lineTo(blockX + size, blockY);
    ctx.stroke();
    
    // 底部和右側（暗邊）
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(blockX + size, blockY);
    ctx.lineTo(blockX + size, blockY + size);
    ctx.lineTo(blockX, blockY + size);
    ctx.stroke();
    
    // 添加內部高光線（增強立體感）
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(blockX + 2, blockY + 2);
    ctx.lineTo(blockX + size * 0.3, blockY + 2);
    ctx.moveTo(blockX + 2, blockY + 2);
    ctx.lineTo(blockX + 2, blockY + size * 0.3);
    ctx.stroke();
}

// 創建爆炸粒子
function createExplosionParticles(row, color) {
    const particleCount = 20;
    const centerX = (COLS * BLOCK_SIZE) / 2;
    const centerY = row * BLOCK_SIZE + BLOCK_SIZE / 2;
    
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = 2 + Math.random() * 4;
        const size = 3 + Math.random() * 4;
        
        particles.push({
            x: centerX + (Math.random() - 0.5) * COLS * BLOCK_SIZE,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            size: size,
            color: color,
            life: 1.0,
            decay: 0.02 + Math.random() * 0.02
        });
    }
    
    // 為每個方塊創建額外粒子
    for (let x = 0; x < COLS; x++) {
        const blockX = x * BLOCK_SIZE + BLOCK_SIZE / 2;
        const blockY = row * BLOCK_SIZE + BLOCK_SIZE / 2;
        
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            
            particles.push({
                x: blockX,
                y: blockY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                size: 2 + Math.random() * 3,
                color: color,
                life: 1.0,
                decay: 0.015 + Math.random() * 0.015
            });
        }
    }
}

// 更新粒子
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // 更新位置
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // 重力
        
        // 更新生命值
        p.life -= p.decay;
        
        // 移除死亡粒子
        if (p.life <= 0 || p.y > canvas.height + 50) {
            particles.splice(i, 1);
        }
    }
}

// 繪製粒子
function drawParticles() {
    for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加光暈效果
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
    }
}

// 繪製遊戲板
function drawBoard() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 繪製網格線
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.15)';
    ctx.lineWidth = 0.5;
    
    // 繪製垂直線
    for (let x = 0; x <= COLS; x++) {
        ctx.beginPath();
        ctx.moveTo(x * BLOCK_SIZE, 0);
        ctx.lineTo(x * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx.stroke();
    }
    
    // 繪製水平線
    for (let y = 0; y <= ROWS; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.stroke();
    }
    
    // 繪製已放置的方塊（跳過正在清除的行）
    for (let y = 0; y < ROWS; y++) {
        if (!linesToClear.includes(y)) {
            for (let x = 0; x < COLS; x++) {
                if (board[y][x]) {
                    drawBlock(ctx, x, y, COLORS[board[y][x]]);
                }
            }
        }
    }
    
    // 繪製 Ghost Piece（預覽落地位置）
    if (currentPiece) {
        const ghostPos = { ...currentPiece.pos };
        // 計算方塊能下落的最遠位置
        while (!collide(board, currentPiece, { x: ghostPos.x, y: ghostPos.y + 1 })) {
            ghostPos.y++;
        }
        
        // 只在 ghost 位置與當前位置不同時繪製
        if (ghostPos.y !== currentPiece.pos.y) {
            ctx.save();
            ctx.globalAlpha = 0.3;
            for (let y = 0; y < currentPiece.matrix.length; y++) {
                for (let x = 0; x < currentPiece.matrix[y].length; x++) {
                    if (currentPiece.matrix[y][x]) {
                        const posX = ghostPos.x + x;
                        const posY = ghostPos.y + y;
                        if (posY >= 0 && !linesToClear.includes(posY)) {
                            const color = COLORS[currentPiece.matrix[y][x]];
                            // 繪製半透明的方塊輪廓
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(
                                posX * BLOCK_SIZE + 2,
                                posY * BLOCK_SIZE + 2,
                                BLOCK_SIZE - 4,
                                BLOCK_SIZE - 4
                            );
                        }
                    }
                }
            }
            ctx.restore();
        }
    }
    
    // 繪製當前方塊
    if (currentPiece) {
        for (let y = 0; y < currentPiece.matrix.length; y++) {
            for (let x = 0; x < currentPiece.matrix[y].length; x++) {
                if (currentPiece.matrix[y][x]) {
                    const posX = currentPiece.pos.x + x;
                    const posY = currentPiece.pos.y + y;
                    if (posY >= 0 && !linesToClear.includes(posY)) {
                        drawBlock(ctx, posX, posY, COLORS[currentPiece.matrix[y][x]]);
                    }
                }
            }
        }
    }
    
    // 繪製粒子（爆炸特效）
    drawParticles();
}

// 繪製下一個方塊
function drawNextPiece() {
    nextCtx.fillStyle = '#020617';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (nextPiece) {
        const offsetX = (nextCanvas.width / BLOCK_SIZE - nextPiece.matrix[0].length) / 2;
        const offsetY = (nextCanvas.height / BLOCK_SIZE - nextPiece.matrix.length) / 2;
        
        for (let y = 0; y < nextPiece.matrix.length; y++) {
            for (let x = 0; x < nextPiece.matrix[y].length; x++) {
                if (nextPiece.matrix[y][x]) {
                    const blockX = (offsetX + x) * BLOCK_SIZE;
                    const blockY = (offsetY + y) * BLOCK_SIZE;
                    const color = COLORS[nextPiece.matrix[y][x]];
                    const size = BLOCK_SIZE;
                    
                    // 繪製底部陰影
                    nextCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    nextCtx.fillRect(blockX + 3, blockY + 3, size, size);
                    
                    // 繪製主體背景
                    nextCtx.fillStyle = color;
                    nextCtx.fillRect(blockX, blockY, size, size);
                    
                    // 繪製3D頂部高光
                    const topGradient = nextCtx.createLinearGradient(blockX, blockY, blockX, blockY + size * 0.4);
                    topGradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
                    topGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    nextCtx.fillStyle = topGradient;
                    nextCtx.fillRect(blockX, blockY, size, size * 0.4);
                    
                    // 繪製左側高光
                    const leftGradient = nextCtx.createLinearGradient(blockX, blockY, blockX + size * 0.3, blockY);
                    leftGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
                    leftGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                    nextCtx.fillStyle = leftGradient;
                    nextCtx.fillRect(blockX, blockY, size * 0.3, size);
                    
                    // 繪製底部和右側陰影
                    const bottomGradient = nextCtx.createLinearGradient(blockX, blockY + size * 0.6, blockX, blockY + size);
                    bottomGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                    bottomGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
                    nextCtx.fillStyle = bottomGradient;
                    nextCtx.fillRect(blockX, blockY + size * 0.6, size, size * 0.4);
                    
                    const rightGradient = nextCtx.createLinearGradient(blockX + size * 0.7, blockY, blockX + size, blockY);
                    rightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                    rightGradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
                    nextCtx.fillStyle = rightGradient;
                    nextCtx.fillRect(blockX + size * 0.7, blockY, size * 0.3, size);
                    
                    // 繪製3D邊框效果
                    // 頂部和左側（亮邊）
                    nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                    nextCtx.lineWidth = 1.5;
                    nextCtx.beginPath();
                    nextCtx.moveTo(blockX, blockY + size);
                    nextCtx.lineTo(blockX, blockY);
                    nextCtx.lineTo(blockX + size, blockY);
                    nextCtx.stroke();
                    
                    // 底部和右側（暗邊）
                    nextCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
                    nextCtx.lineWidth = 1.5;
                    nextCtx.beginPath();
                    nextCtx.moveTo(blockX + size, blockY);
                    nextCtx.lineTo(blockX + size, blockY + size);
                    nextCtx.lineTo(blockX, blockY + size);
                    nextCtx.stroke();
                    
                    // 添加內部高光線
                    nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    nextCtx.lineWidth = 1;
                    nextCtx.beginPath();
                    nextCtx.moveTo(blockX + 2, blockY + 2);
                    nextCtx.lineTo(blockX + size * 0.3, blockY + 2);
                    nextCtx.moveTo(blockX + 2, blockY + 2);
                    nextCtx.lineTo(blockX + 2, blockY + size * 0.3);
                    nextCtx.stroke();
                }
            }
        }
    }
}

// 檢查碰撞
function collide(board, piece, pos) {
    const m = piece.matrix;
    const o = pos;
    
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0) {
                const newX = o.x + x;
                const newY = o.y + y;
                
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }
                
                if (newY >= 0 && board[newY][newX] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 旋轉方塊
function rotate(matrix) {
    const N = matrix.length;
    const rotated = Array(N).fill(null).map(() => Array(N).fill(0));
    
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            rotated[x][N - 1 - y] = matrix[y][x];
        }
    }
    
    return rotated;
}

// 合併方塊到遊戲板
function merge(board, piece) {
    for (let y = 0; y < piece.matrix.length; y++) {
        for (let x = 0; x < piece.matrix[y].length; x++) {
            if (piece.matrix[y][x] !== 0) {
                const boardY = piece.pos.y + y;
                const boardX = piece.pos.x + x;
                if (boardY >= 0) {
                    board[boardY][boardX] = piece.matrix[y][x];
                }
            }
        }
    }
}

// 讓方塊下落（物理效果）
function applyGravity() {
    let moved = false;
    
    // 從下往上檢查每一行
    for (let y = ROWS - 2; y >= 0; y--) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x] !== 0) {
                // 檢查這個方塊下方是否為空
                let fallDistance = 0;
                for (let checkY = y + 1; checkY < ROWS; checkY++) {
                    if (board[checkY][x] === 0) {
                        fallDistance++;
                    } else {
                        break;
                    }
                }
                
                // 如果下方有空位，讓方塊下落
                if (fallDistance > 0) {
                    board[y + fallDistance][x] = board[y][x];
                    board[y][x] = 0;
                    moved = true;
                }
            }
        }
    }
    
    return moved;
}

// 清除完整行
function clearLines() {
    linesToClear = [];
    let linesCleared = 0;
    
    // 找出要清除的行
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            linesToClear.push(y);
            linesCleared++;
        }
    }
    
    if (linesCleared > 0) {
        clearingLines = true;
        
        // 為每行創建爆炸粒子
        for (const row of linesToClear) {
            // 獲取該行的主要顏色（使用第一個非零方塊的顏色）
            const rowColor = COLORS[board[row][0]] || '#FFFFFF';
            createExplosionParticles(row, rowColor);
        }
        
        // 延遲清除行，讓爆炸效果先顯示
        setTimeout(() => {
            // 實際清除行
            for (let y = ROWS - 1; y >= 0; y--) {
                if (board[y].every(cell => cell !== 0)) {
                    board.splice(y, 1);
                    board.unshift(Array(COLS).fill(0));
                    y++; // 重新檢查同一行
                }
            }
            
            lines += linesCleared;
            // 分數計算：單行 100，雙行 300，三行 500，四行 800
            const points = [0, 100, 300, 500, 800];
            score += points[linesCleared] * level;
            
            // 每清除 10 行提升一級
            level = Math.floor(lines / 10) + 1;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
            
            updateScore();
            
            // 重置清除狀態
            linesToClear = [];
            clearingLines = false;
        }, 300); // 300ms 的爆炸動畫時間
    }
}

// 更新分數顯示
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
    document.getElementById('lines').textContent = lines;
}

// 移動方塊
function movePiece(dir) {
    if (!currentPiece || gamePaused || gameOver) return;
    
    const newPos = {
        x: currentPiece.pos.x + dir.x,
        y: currentPiece.pos.y + dir.y
    };
    
    if (!collide(board, currentPiece, newPos)) {
        currentPiece.pos = newPos;
        return true;
    }
    return false;
}

// 旋轉當前方塊
function rotatePiece() {
    if (!currentPiece || gamePaused || gameOver) return;
    
    const rotated = rotate(currentPiece.matrix);
    const original = currentPiece.matrix;
    currentPiece.matrix = rotated;
    
    if (collide(board, currentPiece, currentPiece.pos)) {
        // 嘗試牆踢（wall kick）
        const kicks = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: -2, y: 0 },
            { x: 2, y: 0 }
        ];
        
        let kicked = false;
        for (const kick of kicks) {
            const newPos = {
                x: currentPiece.pos.x + kick.x,
                y: currentPiece.pos.y + kick.y
            };
            if (!collide(board, currentPiece, newPos)) {
                currentPiece.pos = newPos;
                kicked = true;
                break;
            }
        }
        
        if (!kicked) {
            currentPiece.matrix = original;
        }
    }
}

// 硬降（直接落到底部）
function hardDrop() {
    if (!currentPiece || gamePaused || gameOver) return;
    
    while (movePiece({ x: 0, y: 1 })) {
        score += 2; // 硬降獎勵
    }
    dropPiece();
}

// 方塊下降
function dropPiece() {
    if (!currentPiece || gamePaused || gameOver) return;
    
    if (!movePiece({ x: 0, y: 1 })) {
        merge(board, currentPiece);
        clearLines();
        currentPiece = nextPiece;
        nextPiece = createPiece();
        
        if (collide(board, currentPiece, currentPiece.pos)) {
            gameOver = true;
            showOverlay('遊戲結束', '按重新開始按鈕再來一局');
        }
    }
}

// 顯示/隱藏覆蓋層
function showOverlay(title, message) {
    document.getElementById('overlayTitle').textContent = title;
    document.getElementById('overlayMessage').textContent = message;
    document.getElementById('gameOverlay').classList.add('show');
}

function hideOverlay() {
    document.getElementById('gameOverlay').classList.remove('show');
}

// 暫停/繼續遊戲
function togglePause() {
    if (gameOver) return;
    
    gamePaused = !gamePaused;
    if (gamePaused) {
        showOverlay('遊戲暫停', '按 P 鍵繼續');
    } else {
        hideOverlay();
    }
}

// 重新開始遊戲
function resetGame() {
    initBoard();
    currentPiece = createPiece();
    nextPiece = createPiece();
    score = 0;
    level = 1;
    lines = 0;
    dropCounter = 0;
    dropInterval = 1000;
    gamePaused = false;
    gameOver = false;
    particles = [];
    clearingLines = false;
    linesToClear = [];
    updateScore();
    hideOverlay();
}

// 鍵盤控制
document.addEventListener('keydown', (e) => {
    if (gameOver && e.code !== 'KeyR') return;
    
    switch (e.code) {
        case 'ArrowLeft':
            e.preventDefault();
            movePiece({ x: -1, y: 0 });
            break;
        case 'ArrowRight':
            e.preventDefault();
            movePiece({ x: 1, y: 0 });
            break;
        case 'ArrowDown':
            e.preventDefault();
            hardDrop();
            break;
        case 'ArrowUp':
            e.preventDefault();
            rotatePiece();
            break;
        case 'Space':
            e.preventDefault();
            rotatePiece();
            break;
        case 'KeyP':
            e.preventDefault();
            togglePause();
            break;
    }
});

// 重新開始按鈕
document.getElementById('restartBtn').addEventListener('click', resetGame);

// 遊戲主循環
function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    if (!gamePaused && !gameOver) {
        // 更新粒子
        updateParticles();
        
        // 只有在沒有清除動畫時才讓方塊下降
        if (!clearingLines) {
            dropCounter += deltaTime;
            if (dropCounter > dropInterval) {
                dropPiece();
                dropCounter = 0;
            }
        }
    } else {
        // 暫停時也更新粒子（讓爆炸繼續）
        updateParticles();
    }
    
    drawBoard();
    drawNextPiece();
    requestAnimationFrame(gameLoop);
}

// 計算並設置 canvas 大小
function resizeCanvas() {
    const mainBoard = document.querySelector('.main-board');
    const availableHeight = mainBoard.clientHeight - 20; // 減去 padding
    const availableWidth = mainBoard.clientWidth - 20;
    
    // 根據高度計算 BLOCK_SIZE
    const heightBasedSize = Math.floor(availableHeight / ROWS);
    // 根據寬度計算 BLOCK_SIZE
    const widthBasedSize = Math.floor(availableWidth / COLS);
    
    // 取較小值以確保完整顯示
    BLOCK_SIZE = Math.min(heightBasedSize, widthBasedSize);
    
    // 設置主遊戲 canvas 實際大小
    canvas.width = COLS * BLOCK_SIZE;
    canvas.height = ROWS * BLOCK_SIZE;
    
    // 設置主遊戲 canvas 顯示大小（CSS）
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    
    // 設置下一個方塊預覽 canvas 大小（至少容納 4x4 方塊，加上一些邊距）
    const nextPieceContainer = document.querySelector('.next-piece');
    if (nextPieceContainer) {
        const containerWidth = nextPieceContainer.clientWidth - 40; // 減去 padding
        const containerHeight = nextPieceContainer.clientHeight - 60; // 減去 padding 和標題高度
        
        // 計算能容納的最大方塊數（至少 4x4）
        const maxBlocksX = Math.floor(containerWidth / BLOCK_SIZE);
        const maxBlocksY = Math.floor(containerHeight / BLOCK_SIZE);
        
        // 確保至少能容納 4x4 的方塊
        const minBlocks = 4;
        const blocksX = Math.max(minBlocks, maxBlocksX);
        const blocksY = Math.max(minBlocks, maxBlocksY);
        
        // 設置 nextCanvas 大小
        nextCanvas.width = blocksX * BLOCK_SIZE;
        nextCanvas.height = blocksY * BLOCK_SIZE;
        
        // 設置 nextCanvas 顯示大小（CSS）
        nextCanvas.style.width = nextCanvas.width + 'px';
        nextCanvas.style.height = nextCanvas.height + 'px';
    }
}

// 視窗大小改變時重新調整
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
        drawBoard();
        drawNextPiece();
    }, 100);
});

// 初始化遊戲
function init() {
    // 等待 DOM 完全載入後再計算大小
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            resizeCanvas();
            initBoard();
            currentPiece = createPiece();
            nextPiece = createPiece();
            updateScore();
            gameLoop();
        });
    } else {
        resizeCanvas();
        initBoard();
        currentPiece = createPiece();
        nextPiece = createPiece();
        updateScore();
        gameLoop();
    }
}

// 啟動遊戲
init();

