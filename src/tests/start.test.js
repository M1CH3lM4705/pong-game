import {describe, expect, test} from '@jest/globals';
import beginGame from '../js/start.js';

const createMock = () => {
    const game = () => {
        console.log('[mock]...')
    }

    const keyboardListener = () => {
        console.log('[mock]...')
    }

    const resizeCanvas = () => {
        console.log('[mock]...')
    }

    return{
        game,
        keyboardListener,
        resizeCanvas
    }
}
const keyboardListenerMock = createMock()
const gameMock = createMock()
const resizeCanvasMock = createMock()

const {start} = beginGame({
    game:gameMock,
    keyboardListener:keyboardListenerMock,
    resizeCanvas: resizeCanvasMock
})
test('start call game', () => {
    expect(start).toBeCalledTimes();
})