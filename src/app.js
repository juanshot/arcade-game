/**
 * @description Represents the game class
 */
class Game {
    constructor () {
        this.min = 0;
        this.sec = 0;
        this.lifes = 3;
        this.gems = 0;
        this.interval = null;
        this.gameModal = document.querySelector('.modal');
        this.startBtn = document.querySelector('.button');
        this.timer = document.querySelector('.timer');
        this.gemElement = document.querySelector('.gems');
        this.lifeElement = document.querySelector('.lifes');
        this.startBtn.addEventListener('click', () => {
            this.startClock();
            this.closeModal();
        });
        this.closeBtn = document.querySelector('.close');
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });
    }
    /**
     * @description starts the game enviroment
     */
    startClock () {
        this.interval = setInterval(() => {
            if (this.sec === 60) {
                this.min++;
                this.sec = 0;
            } else {
                this.sec++
                this.timer.textContent = `${this.min}:${this.sec > 10 ? this.sec : '0'.concat(this.sec)}`;
            }
        }, 1000);
        this.printLifes();
    }
    /**
     * @description adds a gem to the class and print it
     */
    addGem () {      
        this.gems++
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < this.gems; i++) {
            let gemImg = document.createElement('img');
            gemImg.setAttribute('src', 'images/Gem Blue.png');
            gemImg.setAttribute('class', 'gem-img');
            gemImg.setAttribute('alt', 'Gem Image');
            fragment.appendChild(gemImg)
        }
        while(this.gemElement.firstChild) {
            this.gemElement.removeChild(this.gemElement.firstChild)
        }
        this.gemElement.appendChild(fragment);
        if (this.gems > 2) {
            this.finishGame('win');
        }
    }
    /**
     * @description remove a life and checks game over
     */
    removeLife () {
        this.lifes--;
        this.printLifes()
        if (this.lifes === 0) {
            this.finishGame('lose')
        }
    }
    /**
     * @description add the heart icons to the dom
     */
    printLifes () {
        let fragment = document.createDocumentFragment();
        for (let i = 0; i < this.lifes; i++) {
            let lifeImg = document.createElement('img');
            lifeImg.setAttribute('src', 'images/Heart.png');
            lifeImg.setAttribute('class', 'life-img');
            lifeImg.setAttribute('alt', 'Life Image');
            fragment.appendChild(lifeImg)
        }
        while(this.lifeElement.firstChild) {
            this.lifeElement.removeChild(this.lifeElement.firstChild)
        }
        this.lifeElement.appendChild(fragment);
    }
    /**
     * @description closes the main modal
     */
    openModal () {
        this.gameModal.style.display = "block";
    }
    /**
     * @description closes the main modal
     */
    closeModal () {
        this.gameModal.style.display = "none";
    }
    /**
     * @description finishes the game
     * @param  {string} mode receives 'win' or 'lose' depending on results 
     */
    finishGame (mode) {
        console.log(mode);   
    }
}
/**
* @description Represents a character of the game (main class)
* @constructor
* @param {number} x - Position x of the character
* @param {number} y - Position y of the character
* @param {string} img - image of the element
* @return {object} instance of character's class
*/
class Character {
    constructor (x, y , img) {
        this.x = x;
        this.y = y;
        this.sprite = img
    }
    // render method for all characters
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
/**
 * @description Represents the character our player must avoid (bugs)
 * @param {number} x - Position x of the character
 * @param {number} y - Position y of the character
 * @param {string} img - image of the element
 * * @return {object} instance of enemy class
 */
class Enemy extends Character {
    constructor( x, y, img) {
        // using properties inheritance
        super(x, y, img);
    }
    // Update the enemy's position
    // (Delta time between ticks)
    /**
     * @param  {number} dt delta time between ticks
     */
    update (dt) {
		if (dt >= 1)
			dt = 0.015;
		if (this.x >= (initialEnemyX + 5*100)){
		// if the element moves off the canvas , starts at the left
			this.x = -100;
		}
		else
		{
		// applying movement
			this.x = this.x + 100*dt;
        }
        if (parseInt(this.x)+ 100 >= player.x && parseInt(this.x) <= player.x + 40 && this.y === player.y){
            game.removeLife();
            player.resetPosition();
        }
    }
}
/**
 * @description Represents the character our player must avoid (bugs)
 * @param {number} x - Position x of the character
 * @param {number} y - Position y of the character
 * @param {string} img - image of the element
 * @return {object} instance of player's class
 */
class Player extends Character {
    constructor( x, y, img) {
        super(x, y, img);
    }
    /**
     * @description updates the player's position
     */
    update () {
        // Prevent player from moving beyond canvas wall boundaries
        if (this.y > 380) {
            this.y = 380;
        }
        if (this.x > 400) {
            this.x = 400;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        // Check id the player reaches the top
        if (this.y < 0) {
            game.addGem();
            this.x = 200;
            this.y = 380;
        }
    }
    resetPosition () {
        this.x = 200;
        this.y = 380;
    }
    /**
     * @param  {string} keyPress
     */
    handleInput (keyPress) {
        switch (keyPress) {
            case 'left':
                this.x = this.x - 100;
                break;
            case 'up':
                this.y = this.y - 85;
                break;
            case 'right':
                this.x = this.x + 100;
                break;
            case 'down':
                this.y = this.y + 85;
                break;
        }
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player'
const initialEnemyX= 0;
const initialEnemyY= 125;
const allEnemies = [];
// initial point for bugs
const enemy1 = new Enemy(initialEnemyX, initialEnemyY, 'images/enemy-bug.png');
const enemy2 = new Enemy(100, initialEnemyY+85,'images/enemy-bug.png');
const enemy3 = new Enemy(300, initialEnemyY-85,'images/enemy-bug.png');
const enemy4 = new Enemy(400, initialEnemyY+85,'images/enemy-bug.png');
// adding enemies instances inside all enemies array
allEnemies.push(enemy1, enemy2, enemy3, enemy4)
// instantiating player
const player = new Player(200, 380, 'images/char-boy.png');
const game = new Game();
game.openModal();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
