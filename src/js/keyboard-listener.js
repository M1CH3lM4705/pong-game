const createKeyboardListener = () => {
    const btnMobile = document.querySelector('[data-move="move"]')
    
    const state = {
        observers:[],
        playerId:null
    }

    const activeMobileButtons = () => {       
        btnMobile.classList.add('visible')

        const clickedButton = ({ target }) => {
            const clickedMove = target.dataset.clickMove

            handleKeyDown({key:clickedMove})
        }

        return {
            clickedButton
        }
    }

    const isMobile = () => {
        const match = window.matchMedia('(pointer:coarse)');

        return (match && match.matches)
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

    const {clickedButton} = isMobile() ? activeMobileButtons() : () =>{}
    
    btnMobile.addEventListener('mousedown', clickedButton)

    return {
        subscribe
    }
}

export default createKeyboardListener;