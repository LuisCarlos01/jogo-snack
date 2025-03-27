const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio("./assets/audio.mp3")
const audioEat = new Audio("./assets/eat.mp3")
const audioGameOver = new Audio("./assets/gameover.mp3")

const size = 30

const initialPosition = { x: 270, y: 240 }

let snake = [initialPosition]

const playAudio = (audioElement) => {
    try {
        audioElement.play().catch(error => {
            console.log("Erro ao reproduzir áudio:", error)
        })
    } catch (error) {
        console.log("Erro ao reproduzir áudio:", error)
    }
}

const incrementScore = () => {
    score.innerText = +score.innerText + 10
    playAudio(audioEat)
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId

const normalSpeed = 300
const boostSpeed = 100
let currentSpeed = normalSpeed
let isBoostActive = false

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
    ctx.fillRect(x, y, size, size)
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = isBoostActive ? "#00ff00" : "white"
        } else {
            ctx.fillStyle = isBoostActive ? "#006600" : "#ddd"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const chackEat = () => {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        incrementScore()
        snake.push(head)
        playAudio(audio)

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    if (head.x < 0) {
        snake[snake.length - 1] = { x: canvasLimit, y: head.y }
    } else if (head.x > canvasLimit) {
        snake[snake.length - 1] = { x: 0, y: head.y }
    }

    if (head.y < 0) {
        snake[snake.length - 1] = { y: canvasLimit, x: head.x }
    } else if (head.y > canvasLimit) {
        snake[snake.length - 1] = { y: 0, x: head.x }
    }

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (selfCollision) {
        gameOver()
    }
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    chackEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, currentSpeed)
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
        currentSpeed = boostSpeed
        isBoostActive = true
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
        currentSpeed = boostSpeed
        isBoostActive = true
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
        currentSpeed = boostSpeed
        isBoostActive = true
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
        currentSpeed = boostSpeed
        isBoostActive = true
    }
})

document.addEventListener("keyup", ({ key }) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)) {
        currentSpeed = normalSpeed
        isBoostActive = false
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"
    currentSpeed = normalSpeed
    isBoostActive = false

    snake = [initialPosition]
})

const gameOver = () => {
    direction = undefined
    currentSpeed = normalSpeed
    isBoostActive = false

    playAudio(audioGameOver)
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}
