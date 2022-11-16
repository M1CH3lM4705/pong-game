import clickStart from './start-strategy.js'
import clickPause from './pause-strategy.js'
import clickReset from './reset-strategy.js'

const contenxtGame = () => {
    let strategy;

    const setStrategy = newStrategy => strategy = newStrategy
    const execute = () => {
        strategy.execute()
    }

    return {
        setStrategy,
        execute
    }
    
}

export const MAPPER_INIT_GAME = {
    start: clickStart,
    pause: clickPause,
    reset: clickReset
}

export default contenxtGame;