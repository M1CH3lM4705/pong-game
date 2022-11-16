import contenxtGame, { MAPPER_INIT_GAME } from "./strategy/context-stategy.js";

const buttonClick = document.querySelector('[data-controlls="controlls"]')

const clickedPongGame = e => {
    e.preventDefault()
    const { target } = e
   
    const newStrategy = target.dataset.controll
    
    const context = contenxtGame()
    const strategy = MAPPER_INIT_GAME[newStrategy]()

    context.setStrategy(strategy)
    context.execute()

}

buttonClick.addEventListener('click', clickedPongGame)

