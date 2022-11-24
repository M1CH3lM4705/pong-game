import player from './player.js'

const scorePlayer1 = document.querySelector('[data-score-player="player1"]')
const scorePlayer2 = document.querySelector('[data-score-player="player2"]')

const createGame = ({width, height}) => {
    let ballSpeed = 1
    let ballXDirection = 0
    let ballYDirection = 0
    let playerDirection = 0
    let velocityPlayerBot = 0

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
        scorePlayer1.innerText = player1.newPlayer.getScore()
        scorePlayer2.innerText = raquete2.newPlayer.getScore()
    }

    const reset = () => {
        ballSpeed = 1
        ballXDirection = 0
        ballYDirection = 0
        playerDirection = 0
        velocityPlayerBot = 0
        
        const {players:{player1, raquete2}, ball:{ballPong}} = state
        player1.newPlayer.resetPlayer()
        raquete2.newPlayer.resetPlayer()
        ballPong.w = width / 2
        ballPong.h = height / 2
        updateScores()
    }
    
    const addPlayer = command =>{
        const {playerId, playerX, playerY, w, h, score} = command
        const newPlayer = player(playerId, playerX, playerY)
        state.players[playerId] = {newPlayer}
    }
    
    const movePlayer = command => {
        console.log(`Movendo ${command.playerId} com ${command.keyPressed}`)
        const { newPlayer } = state.players[command.playerId]

        const keyPressed = command.keyPressed

        const acceptedMoves = {
            ArrowUp: (player) => {
                if (player.GreaterThenOrEqualZero()){
                    player.playerUp()
                }
                return;
            },
            ArrowDown: (player) => {
                if (player.lessThenScreenHeight(state.screen.height)){
                    player.playerDown()
                }
                    
                return
            }
        }

        const moveFunction = acceptedMoves[keyPressed]
        if(player && moveFunction){
            moveFunction(newPlayer)
        } 
    }

    const moveBot = () => {
        const {newPlayer} = state.players['raquete2']

        const ArrowDown = () => {
            if(newPlayer.lessThenScreenHeight(state.screen.height)){
                newPlayer.playerDown(velocityPlayerBot)
                return
            }
            playerDirection = state.screen.height
        }

        const ArrowUp = () => {
            if(newPlayer.GreaterThenOrEqualZero()){
                newPlayer.playerUp(velocityPlayerBot)
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
            player2.newPlayer.incrementScore()
            updateScores()
            createBall()
            
            return;  
        }

        if(ball.x >= state.screen.width){
            player1.newPlayer.incrementScore()
            velocityPlayerBot = 0
            updateScores()
            createBall()
            
            return;
        }

        if(ball.x <= (player1.newPlayer.playerX + player1.newPlayer.w + ball.raio) && 
            (ball.y > player1.newPlayer.getPy() && ball.y < player1.newPlayer.getPy() + player1.newPlayer.h)){
            ball.x = (player1.newPlayer.playerX + player1.newPlayer.w) + ball.raio
            ballXDirection *= -1
            ballSpeed +=1
        }

        if(ball.x >= (player2.newPlayer.playerX - ball.raio) && 
            (ball.y > player2.newPlayer.getPy() && ball.y < player2.newPlayer.getPy() + player2.newPlayer.h)){
                ball.x = player2.newPlayer.playerX - ball.raio
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