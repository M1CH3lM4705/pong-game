const createKeyboardListener = () => {

    const state = {
        observers:[],
        playerId:null
    }
    
    const subscribe = (observerFn) => state.observers.push(observerFn)
    const notifyAll = command => {
        console.log(`Notificando ${state.observers.length} observers`)

        state.observers.forEach(observer => observer(command))
    }

    const handleKeyDown = ({ key }) => {
        const keyPressed = key

        const command = {
            playerId: 'player1',
            keyPressed
        }
        
        notifyAll(command)
    }
    document.addEventListener('keydown', handleKeyDown)

    return {
        subscribe
    }
}

export default createKeyboardListener;