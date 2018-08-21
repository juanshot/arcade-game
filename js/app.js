'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description Represents the game class
 */
var Game = function () {
    function Game() {
        var _this = this;

        _classCallCheck(this, Game);

        this.min = 0;
        this.sec = 0;
        this.lifes = 3;
        this.gems = 0;
        this.interval = null;
        // References of the html elements
        this.gameModal = document.querySelector('#initialModal');
        this.successModal = document.querySelector('#successModal');
        this.gameOverModal = document.querySelector('#gameOverModal');
        this.lifeElement = document.querySelector('.lifes');
        this.startBtns = document.querySelectorAll('.button-start');
        this.timer = document.querySelector('.timer');
        this.gemElement = document.querySelector('.gems');
        this.audio = document.querySelector('audio');
        this.resultElement = document.querySelector('result-stats');
        // adding listeners
        // Adding listener to start button in modals
        this.startBtns.forEach(function (startBtn) {
            startBtn.addEventListener('click', function () {
                _this.closeModal();
                _this.startClock();
            });
        });
        // CLose modal button listeners
        this.closeBtns = document.querySelectorAll('.close');
        this.closeBtns.forEach(function (closeBtn) {
            closeBtn.addEventListener('click', function () {
                _this.closeModal();
            });
        });
    }
    /**
     * @description starts the game enviroment
     */


    _createClass(Game, [{
        key: 'startClock',
        value: function startClock() {
            var _this2 = this;

            this.interval = setInterval(function () {
                if (_this2.sec === 60) {
                    _this2.min++;
                    _this2.sec = 0;
                } else {
                    _this2.sec++;
                    _this2.timer.textContent = _this2.min + ':' + (_this2.sec > 10 ? _this2.sec : '0'.concat(_this2.sec));
                }
            }, 1000);
            this.printLifes();
        }
        /**
         * @description adds a gem to the class and print it
         */

    }, {
        key: 'addGem',
        value: function addGem() {
            this.gems++;
            this.printGems();
        }
    }, {
        key: 'printGems',
        value: function printGems() {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < this.gems; i++) {
                var gemImg = document.createElement('img');
                gemImg.setAttribute('src', 'images/Gem Blue.png');
                gemImg.setAttribute('class', 'gem-img');
                gemImg.setAttribute('alt', 'Gem Image');
                fragment.appendChild(gemImg);
            }
            while (this.gemElement.firstChild) {
                this.gemElement.removeChild(this.gemElement.firstChild);
            }
            this.gemElement.appendChild(fragment);
            if (this.gems > 2) {
                this.finishGame('win');
            }
        }
        /**
         * @description remove a life and checks game over
         */

    }, {
        key: 'removeLife',
        value: function removeLife() {
            this.lifes--;
            this.printLifes();
            if (this.lifes === 0) {
                this.finishGame('lose');
            }
        }
        /**
         * @description add the heart icons to the dom
         */

    }, {
        key: 'printLifes',
        value: function printLifes() {
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < this.lifes; i++) {
                var lifeImg = document.createElement('img');
                lifeImg.setAttribute('src', 'images/Heart.png');
                lifeImg.setAttribute('class', 'life-img');
                lifeImg.setAttribute('alt', 'Life Image');
                fragment.appendChild(lifeImg);
            }
            while (this.lifeElement.firstChild) {
                this.lifeElement.removeChild(this.lifeElement.firstChild);
            }
            this.lifeElement.appendChild(fragment);
        }
        /**
         * @description plays effect sound of movement
         */

    }, {
        key: 'playSound',
        value: function playSound() {
            this.audio.play();
        }
        /**
         * @description closes the main modal
         */

    }, {
        key: 'openModal',
        value: function openModal(type) {
            if (type === 'initial') {
                this.gameModal.style.display = "block";
            } else if (type === 'success') {
                this.successModal.style.display = "block";
            } else if (type === 'gameOver') {
                this.gameOverModal.style.display = 'block';
            }
        }
        /**
         * @description closes the main modal
         */

    }, {
        key: 'closeModal',
        value: function closeModal() {
            var modals = document.querySelectorAll('.modal');
            modals.forEach(function (modal) {
                modal.style.display = 'none';
            });
        }
        /**
         * @description finishes the game
         * @param  {string} mode receives 'win' or 'lose' depending on results 
         */

    }, {
        key: 'finishGame',
        value: function finishGame(mode) {
            if (mode === 'win') {
                document.querySelector('.result-time').textContent = this.min + ':' + (this.sec > 10 ? this.sec : '0'.concat(this.sec));
                document.querySelector('.result-lifes').textContent = this.lifes;
                document.querySelector('.result-gems').textContent = this.gems;
                this.restartValues();
                this.openModal('success');
            } else {
                this.openModal('gameOver');
            }
        }
    }, {
        key: 'restartValues',
        value: function restartValues() {
            this.min = 0;
            this.sec = 0;
            this.lifes = 3;
            this.gems = 0;
            clearInterval(this.interval);
            this.printGems();
            this.printLifes();
        }
    }]);

    return Game;
}();
/**
* @description Represents a character of the game (main class)
* @constructor
* @param {number} x - Position x of the character
* @param {number} y - Position y of the character
* @param {string} img - image of the element
* @return {object} instance of character's class
*/


var Character = function () {
    function Character(x, y, img) {
        _classCallCheck(this, Character);

        this.x = x;
        this.y = y;
        this.sprite = img;
    }
    // render method for all characters


    _createClass(Character, [{
        key: 'render',
        value: function render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }]);

    return Character;
}();
/**
 * @description Represents the character our player must avoid (bugs)
 * @param {number} x - Position x of the character
 * @param {number} y - Position y of the character
 * @param {string} img - image of the element
 * * @return {object} instance of enemy class
 */


var Enemy = function (_Character) {
    _inherits(Enemy, _Character);

    function Enemy(x, y, img) {
        _classCallCheck(this, Enemy);

        // using properties inheritance
        return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, x, y, img));
    }
    // Update the enemy's position
    // (Delta time between ticks)
    /**
     * @param  {number} dt delta time between ticks
     */


    _createClass(Enemy, [{
        key: 'update',
        value: function update(dt) {
            if (dt >= 1) dt = 0.015;
            if (this.x >= initialEnemyX + 5 * 100) {
                // if the element moves off the canvas , starts at the left
                this.x = -100;
            } else {
                // applying movement
                this.x = this.x + 100 * dt;
            }
            if (parseInt(this.x) + 100 >= player.x && parseInt(this.x) <= player.x + 40 && this.y === player.y) {
                game.removeLife();
                player.resetPosition();
            }
        }
    }]);

    return Enemy;
}(Character);
/**
 * @description Represents the character our player must avoid (bugs)
 * @param {number} x - Position x of the character
 * @param {number} y - Position y of the character
 * @param {string} img - image of the element
 * @return {object} instance of player's class
 */


var Player = function (_Character2) {
    _inherits(Player, _Character2);

    function Player(x, y, img) {
        _classCallCheck(this, Player);

        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, img));
    }
    /**
     * @description updates the player's position
     */


    _createClass(Player, [{
        key: 'update',
        value: function update() {
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
    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            this.x = 200;
            this.y = 380;
        }
        /**
         * @param  {string} keyPress
         */

    }, {
        key: 'handleInput',
        value: function handleInput(keyPress) {
            switch (keyPress) {
                case 'left':
                    this.x = this.x - 100;
                    break;
                case 'up':
                    this.y = this.y - 85;
                    game.playSound();
                    break;
                case 'right':
                    this.x = this.x + 100;
                    break;
                case 'down':
                    this.y = this.y + 85;
                    break;
            }
        }
    }]);

    return Player;
}(Character);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player'


var initialEnemyX = 0;
var initialEnemyY = 125;
var allEnemies = [];
// initial point for bugs
var enemy1 = new Enemy(initialEnemyX, initialEnemyY, 'images/enemy-bug.png');
var enemy2 = new Enemy(100, initialEnemyY + 85, 'images/enemy-bug.png');
var enemy3 = new Enemy(300, initialEnemyY - 85, 'images/enemy-bug.png');
var enemy4 = new Enemy(400, initialEnemyY + 85, 'images/enemy-bug.png');
// adding enemies instances inside all enemies array
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
// instantiating player
var player = new Player(200, 380, 'images/char-boy.png');
var game = new Game();
game.openModal('initial');
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});