import beginGame from "../start.js";
import { renderTextButton } from "./render-button-controll.js";

const { start, reset } = beginGame()

const clickReset = () => {
    const button = document.querySelector(`[data-controll="pause"]`)
    const pauseText = 'pause';
    if(!button) return;
    
    const execute = () => {
        reset()
        renderTextButton(button, pauseText)
        start()
    }

    return {
        execute
    }
}

export default clickReset