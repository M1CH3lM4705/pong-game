import createKeyboardListener from "./keyboard-listener.js";
import createGame from "./game.js";
import Canvas from "./render-screen.js";
let movePlayerId;
let moveBallId

const beginGame = () => {
    let isPaused = false;
    const screen = document.getElementById('screen');
    const body = document.querySelector('body');

    screen.width = body.clientWidth;
    screen.height = body.clientHeight;

    const game = createGame(screen)
    const {resizeCanvas} =  Canvas()

    game.addPlayer({playerId:'player1', playerX:0, playerY:0, w:20, h:150, score:0})
    game.addPlayer({playerId:'raquete2', playerX:screen.width - 20, playerY:0, w:20, h:150, score:0})

    const start = () => {

        resizeCanvas(screen, game, isPaused, requestAnimationFrame)

        const keyboardListener = createKeyboardListener()
        keyboardListener.subscribe(game.movePlayer)        
        
        movePlayerId = setInterval(game.moveBot, 10)
        moveBallId = setInterval(game.moveBall, 10)
        
        window.addEventListener('resize', () => resizeCanvas(screen, game, isPaused, requestAnimationFrame), false);
    }
    
    const pause = () => {
        isPaused = true
        resizeCanvas(screen, game, isPaused, requestAnimationFrame)
        clearInterval(moveBallId)
        clearInterval(movePlayerId)
    }

    const reset = () => {
        game.reset()
        clearInterval(moveBallId)
        clearInterval(movePlayerId)
    }

    return {
        start,
        pause,
        reset
    }
}

export default beginGame;