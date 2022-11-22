let raFId;
const renderScreen = (screen, game, paused, requestAnimationFrame) => {
    const ctx = screen.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.clearRect(0, 0, screen.width, screen.height)
    
    
    drawPlayers(ctx, game)
    drawBall(ctx, game)
    if(!paused)
        raFId = requestAnimationFrame(() => renderScreen(screen, game, paused, requestAnimationFrame))
    else{
        cancelAnimationFrame(raFId)
    }
}

const drawPlayers = (ctx, game) => {
    ctx.beginPath()


    for (const playerId in game.state.players) {
        const { newPlayer } = game.state.players[playerId]

        ctx.fillStyle = 'blue'
        ctx.fillRect(newPlayer.playerX, newPlayer.getPy(), newPlayer.w, newPlayer.h)

    }
}

const drawBall = (ctx, game) => {
    const ball = game.state.ball['ballPong']
    ctx.beginPath()
    ctx.fillStyle = 'yellow'
    ctx.arc(ball.x, ball.y, ball.raio, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
}



const Canvas = () => {
    const resizeCanvas = (screen, game, paused, requestAnimationFrame) => {
        renderScreen(screen, game, paused, requestAnimationFrame)
        if(!paused) game.createBall()
    }

    return {resizeCanvas}
}

export default Canvas;