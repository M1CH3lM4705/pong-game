import beginGame from "../start.js";
import { renderTextButton } from "./render-button-controll.js";

const { start } = beginGame()

const clickStart = () => {
    const button = document.querySelector(`[data-controll="start"]`)
    const pauseText = 'pause';
    
    const execute = () => {
        renderTextButton(button, pauseText)
        start()
    }
    
    return{
        execute
    }
}

export default clickStart;