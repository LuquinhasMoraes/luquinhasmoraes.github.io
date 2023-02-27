
class SnakeGame {
  currentObstacleX = -1
  speed = 1
  speedX = 0
  speedY = 0
  positionX = 10
  positionY = 15
  obstacleX = 20
  obstacleY = 20
  lengthPart = 20
  qtdPart = 30
  appleX = 10
  appleY = 10
  trail = []
  tail = 5
  score = 0
  highscore = 0
  context = document.getElementById('game').getContext('2d')

  constructor() {
    let highscore = localStorage.getItem('highscore')

    document.getElementById('highscore').innerHTML = highscore ? highscore : 0
  }

  drawMap(context) {
    context.fillStyle = 'pink'
    context.fillRect(0, 0, 600, 600)
  }

  drawRandomApple() {
    let X = Math.floor(Math.random() * this.lengthPart)
    let Y = Math.floor(Math.random() * this.lengthPart)

    const conflit = this.trail.filter(t => t.x === X && t.y === Y).length > 0

    if(!conflit) {
      this.appleX = X
      this.appleY = Y
    } else {
      this.drawRandomApple()
    }

  }

  drawObstacles(context) {
    const image = document.getElementById("image")
    context.fillStyle = 'brown'
    context.drawImage(image, this.obstacleX * this.lengthPart, this.obstacleY * this.lengthPart, 40, 40);
  }

  drawApple(context) {
    context.fillStyle = 'rgb(244, 58, 89)'
    context.fillRect(this.appleX * this.lengthPart, this.appleY * this.lengthPart, this.lengthPart - 1, this.lengthPart - 1)
  }

  drawSnake(context) {
    for (let i = 0; i < this.trail.length; i++) {
      context.fillStyle = 'rgb(61, 34, 34)'
      context.fillRect(this.trail[i].x * this.lengthPart, this.trail[i].y * this.lengthPart, this.lengthPart - 1, this.lengthPart - 1)      
      this.verifyGameOver(this.trail[i].x, this.trail[i].y)
    }
    
    this.trail.push({x: this.positionX, y: this.positionY})

    while(this.trail.length > this.tail) {
      this.trail.shift()
    }

    if(this.positionX == this.appleX && this.positionY == this.appleY ) {
      this.tail++
      this.drawRandomApple()
      this.setScore()
      // this.obstacleX = Math.floor(Math.random() * this.lengthPart)
      // this.obstacleY = Math.floor(Math.random() * this.lengthPart)
    }
  }

  setHighScore() {
    if(this.score > this.highscore) {
      localStorage.setItem('highscore', this.score)
      document.getElementById('highscore').innerHTML = this.score
      this.score = 0
    }
  }

  setScore() {
    this.score++
    console.log(this.score);
    document.getElementById('score').innerHTML = this.score
  }

  verifyGameOver(trailX, trailY) {
    if(this.positionX == trailX && this.positionY == trailY && this.tail > 5) {
    // if((this.positionX == trailX && this.positionY == trailY && this.tail > 5) || (this.positionX >= this.obstacleX && this.positionX < this.obstacleX + 2 && this.positionY >= this.obstacleY && this.positionY < this.obstacleY + 2)) {
      if(this.speedX > 0) {
        this.positionX--
      } else if (this.speedX < 0) {
        this.positionX++
      } else if (this.speedY > 0) {
        this.positionY--
      } else if (this.speedY < 0) {
        this.positionY++
      }
      this.tail = 5
      this.speedX = 0
      this.speedY = 0
      this.setHighScore()
      console.log('Game over!')
    }
  }

  changeDirection() {
    if (this.positionX < 0) {
      this.positionX = this.qtdPart - 1
    }
    if (this.positionX > this.qtdPart - 1) {
      this.positionX = 0
    }
    if (this.positionY < 0) {
      this.positionY = this.qtdPart - 1
    }
    if (this.positionY > this.qtdPart - 1) {
      this.positionY = 0
    }
  }

  init() {
    this.positionX += this.speedX
    this.positionY += this.speedY

    this.changeDirection()
    this.drawMap(this.context)
    this.drawApple(this.context)
    // this.drawObstacles(this.context)
    this.drawSnake(this.context)
  }

  start() {
    setInterval(this.init.bind(this), 60)
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowDown':
          if(this.speedY == 0) {
            this.speedX = 0
            this.speedY = this.speed
          }
          break;
        case 'ArrowUp':
            if(this.speedY == 0) {
              this.speedX = 0
              this.speedY = -this.speed
            }
            break;
        case 'ArrowRight':
          if(this.speedX == 0) {
            this.speedX = this.speed
            this.speedY = 0
          }
          break;
        case 'ArrowLeft':
          if(this.speedX == 0) {
            this.speedX = -this.speed
            this.speedY = 0
          }
          break;
        default:
          break;
      }
    })
  }
}

let snakeGame = new SnakeGame()
snakeGame.start()