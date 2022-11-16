import beginGame from "../start.js";
import { renderTextButton } from "./render-button-controll.js";
const { pause } = beginGame()

const clickPause = () => {
    const button = document.querySelector(`[data-controll="pause"]`) || null
    const startText = 'start'

    const execute = () => {
        pause()
        renderTextButton(button, startText)
    }

    return {
        execute
    }
}

export default clickPause;