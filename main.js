const bgColorInput = document.querySelector('input.bg-color-input')
const textColorInput = document.querySelector('input.text-color-input')
const addButton = document.querySelector('button.add-button')
const items = document.querySelector('div.items')
const item = document.querySelector('div.item')
const helloWorld = document.querySelector('.hello-world')

function renderAdd(styleBgColor, innerTextColor) {
    const createdElementDiv = document.createElement('div')
    const createdElementSpan = document.createElement('span')
    const createdElementBtn = document.createElement('button')

    createdElementDiv.classList.add('item')
    createdElementSpan.classList.add('item-text')
    createdElementBtn.classList.add('delete-button')

    items.appendChild(createdElementDiv)
    createdElementDiv.appendChild(createdElementSpan)
    createdElementDiv.appendChild(createdElementBtn)

    createdElementSpan.innerText = innerTextColor
    createdElementBtn.innerText = 'X'

    createdElementDiv.style.backgroundColor = styleBgColor
    createdElementSpan.style.color = innerTextColor

    createdElementBtn.addEventListener('click', renderDelete)
    createdElementDiv.addEventListener('click', renderHelloWorld)


    function renderHelloWorld() {
        helloWorld.style.color = createdElementSpan.style.color
        document.body.style.backgroundColor = this.style.backgroundColor
        setTimeout(deleteHelloWorld, 500)
    }

    function deleteHelloWorld() {
        helloWorld.style.color = null
        document.body.style.backgroundColor = null
        createdElementDiv.style.border = null
    }
}

let readyColors = [
    { color: 'white', bgcolor: 'blue' },
    { color: 'black', bgcolor: 'lime' },
    { color: 'lime', bgcolor: 'black' }
]

function startRender() {
    readyColors.forEach((e) => renderAdd(e.bgcolor, e.color))
}
startRender()


addButton.addEventListener('click', addButtonFunc)

function addButtonFunc() {
    items.innerHTML = ''
    readyColors.push({ color: textColorInput.value, bgcolor: bgColorInput.value })
    bgColorInput.value = ''
    textColorInput.value = ''
    bgColorInput.style.borderColor = 'grey'
    textColorInput.style.borderColor = 'grey'
    addButton.setAttribute('disabled', '')
    addButton.setAttribute('id', 'disabled')

    startRender()
}

function renderDelete(event) {
    const itemDivAll = document.querySelectorAll('.item')
    const itemDivAllArr = Array.from(itemDivAll)
    const removedItem = itemDivAllArr.indexOf(this.parentElement)

    this.parentElement.remove()
    event.stopPropagation() // при клике на 'X', не срабатывает событие родителя
    readyColors.splice(removedItem, 1) // вырезаем из readyColors элемент, который удаляем.
}

let colorTimeout

bgColorInput.addEventListener('input', colorTimeoutFunc)
textColorInput.addEventListener('input', colorTimeoutFunc)

function colorTimeoutFunc(event) {
    clearTimeout(colorTimeout)
    colorTimeout = setTimeout(() => colorValid(event), 800)
}

function colorValid(event) {
    const checkValidColor = document.createElement('div')
    checkValidColor.style.color = event.target.value

    event.target.style.borderColor = checkValidColor.style.color ? 'lime' : 'red'
    if (bgColorInput.style.borderColor == 'lime' && textColorInput.style.borderColor == 'lime') {
        addButton.removeAttribute('disabled')
        addButton.removeAttribute('id')
    }
}