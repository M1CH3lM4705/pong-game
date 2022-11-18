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

    const clickedOnPressed = () => {
        let isHeld = false
        let activePressedTimeouId = null
        const arrayEventsIn = ["mousedown", "touchstart"]
        const arrayEventsOut = [
            "mouseup",
            "mouseleave",
            "mouseout",
            "touchend",
            "touchcancel"
        ]

        const onPressedStart = (e, callback) =>{
            isHeld = true

           activePressedTimeouId = setInterval(() => {
                if(isHeld) callback(e)
            },50)
        }

        const onPressedEnd = () => {
            isHeld = false;
            clearInterval(activePressedTimeouId)
        }

        const apply = (target, callback) => {
            console.log(target)
            arrayEventsIn.forEach(type => {
                target.addEventListener(type, e => onPressedStart(e, callback))
            });

            arrayEventsOut.forEach(type => {
                target.addEventListener(type, onPressedEnd)
            })
        }

        return { apply }
    }

    document.addEventListener('keydown', handleKeyDown)

    const {clickedButton} = isMobile() ? activeMobileButtons() : () =>{}
    
    clickedOnPressed().apply(btnMobile, clickedButton)

    return {
        subscribe
    }
}

export default createKeyboardListener;