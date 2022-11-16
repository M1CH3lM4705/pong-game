const scorePlayer1 = document.querySelector('[data-score-player="player1"]')
const scorePlayer2 = document.querySelector('[data-score-player="player2"]')

const createGame = ({width, height}) => {
    let ballSpeed = 1
    let ballXDirection = 0
    let ballYDirection = 0
    let playerDirection = 0
    let velocityPlayerBot = 6

    const state = {
        players: {},
        screen:{
            width:width || 500,
            height:height || 500
        },
        ball: {
            'ballPong': { 
                x: width / 2 , 
                y: height  / 2, 
                raio: 15, 
            }
        },
    }
    const updateScores = () => {
        const { player1, raquete2 } = state.players
        scorePlayer1.innerText = player1.score
        scorePlayer2.innerText = raquete2.score
    }

    const reset = () => {
        ballSpeed = 1
        ballXDirection = 0
        ballYDirection = 0
        playerDirection = 0
        velocityPlayerBot = 6
        
        const {players:{player1, raquete2}, ball:{ballPong}} = state
        player1.score = 0
        raquete2.score = 0
        ballPong.w = width / 2
        ballPong.h = height / 2
        updateScores()
    }
    
    const addPlayer = command =>{
        const {playerId, playerX, playerY, w, h, score} = command

        state.players[playerId] = {
            x:playerX,
            y:playerY,
            w,
            h,
            score
        }
    }
    
    const movePlayer = command => {
        console.log(`Movendo ${command.playerId} com ${command.keyPressed}`)
        const player = state.players[command.playerId]
        const keyPressed = command.keyPressed

        const acceptedMoves = {
            ArrowUp: (player) => {
                if (player.y - 20 >= 0)
                    player.y -= 20
                return;
            },
            ArrowDown: (player) => {
                if (player.y + player.h < state.screen.height)
                    player.y += 20
                return
            }
        }

        const moveFunction = acceptedMoves[keyPressed]
        if(player && moveFunction){
            moveFunction(player)
        } 
    }

    const moveBot = () => {
        const botPlayer = state.players['raquete2']

        const ArrowDown = () => {
            if(botPlayer.y + botPlayer.h < state.screen.height){
                botPlayer.y += 1 * velocityPlayerBot
                return
            }
            playerDirection = state.screen.height
        }

        const ArrowUp = () => {
            if(botPlayer.y >= 0){
                botPlayer.y -= 1 * velocityPlayerBot
                return
            }
            playerDirection = 0
        }
       if(playerDirection != state.screen.height){
            ArrowDown()
       }
       
       if(playerDirection != 0){
            ArrowUp()
       }
    }

    const createBall = () => {
        const { screen:{width, height}, ball:{ballPong}} = state
        ballSpeed = 1;

        Math.round(Math.random()) == 1 
            ? ballXDirection = 1
            : ballXDirection = -1

        Math.round(Math.random()) == 1
            ? ballYDirection = 1
            : ballYDirection = -1

        ballPong.x = width/2
        ballPong.y = height/2
    }

    const moveBall = () => {
        
        const ball = state.ball['ballPong']

        ball.x += (ballSpeed * ballXDirection)
        ball.y += (ballSpeed * ballYDirection)
        checkForBallCollision()
        
    }

    const checkForBallCollision = () => {
        const player1 = state.players['player1']
        const player2 = state.players['raquete2']

        const ball = state.ball['ballPong']
                
        if(ball.y <= 0 + ball.raio) ballYDirection *= -1

        if(ball.y >= state.screen.height - ball.raio) ballYDirection *= -1

        if(ball.x <= 0){
            player2.score += 1
            updateScores()
            createBall()
            
            return;  
        }

        if(ball.x >= state.screen.width){
            player1.score += 1
            updateScores()
            createBall()
            
            return;
        }

        if(ball.x <= (player1.x + player1.w + ball.raio) && 
            (ball.y > player1.y && ball.y < player1.y + player1.h)){
            ball.x = (player1.x + player1.w) + ball.raio
            ballXDirection *= -1
            ballSpeed +=1
        }

        if(ball.x >= (player2.x - ball.raio) && 
            (ball.y > player2.y && ball.y < player2.y + player2.h)){
                ball.x = player2.x - ball.raio
                ballXDirection *= -1
                ballSpeed +=1
                velocityPlayerBot += 1
        }
    } 

    return {
        addPlayer,
        moveBall,
        createBall,
        movePlayer,
        moveBot,
        reset,
        state
    }
}

export default createGame;