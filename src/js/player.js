const player = (playerId, pX, pY) => {
    const  w = 20, h = 150, pixel = 20;
    let playerX = pX, playerY = pY;
    
    let score = 0;

    const resetPlayer = () =>{
        score = 0;
    }

    const GreaterThenOrEqualZero = () => playerY - w >= 0
    const lessThenScreenHeight = screenHeight => playerY + h < screenHeight
    const playerUp = (velocityPlayerBot = 0) => 
        !velocityPlayerBot 
        ? playerY -= pixel 
        : playerY -= pixel * velocityPlayerBot
    
    const playerDown = (velocityPlayerBot = 0) =>
        !velocityPlayerBot 
        ? playerY += pixel 
        : playerY += pixel * velocityPlayerBot

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
        incrementScore:() => score++,
        getScore:() => score,
        w,
        h
    };
}

export default player;