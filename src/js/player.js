const player = (playerId, pX, pY) => {
    const  w = 20, h = 150, pixel = 20;
    let playerX = pX, playerY = pY;
    let playerDirection = 0
    let velocityPlayerBot = 6
    let score = 0;

    const resetPlayer = () =>{
        score = 0;
        velocityPlayerBot = 6
        playerDirection = 0
    }

    const GreaterThenOrEqualZero = () => playerY - w >= 0
    const lessThenScreenHeight = screenHeight => playerY + h < screenHeight
    const playerDown = () => playerY += pixel
    const playerUp= () => playerY -= pixel
    const getPy = () => playerY
    
    return{
        playerId,
        playerX,
        playerY,
        getPy,
        resetPlayer,
        GreaterThenOrEqualZero,
        lessThenScreenHeight,
        playerDown,
        playerUp,
        score,
        w,
        h
    };
}

export default player;