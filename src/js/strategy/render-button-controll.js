export const renderTextButton = (btn, text) => {
    const newText = text === 'start' ? 'play' : text
    const iconPlay = `<i class="fa-solid fa-${newText}"></i>`
    btn.dataset.controll = text
    btn.innerHTML =`${text.toUpperCase()} ${iconPlay}`
}