class colissionSprite {
    constructor(gameScreen, position) {
        this.gameScreen = gameScreen
        this.position = position

        this.element = document.createElement('img')
        this.element.src = './img/collisionBlock.png'

        this.element.style.position = 'absolute'
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.height = `16px`
        this.element.style.width = `16px`


        this.gameScreen.appendChild(this.element)
    }
}