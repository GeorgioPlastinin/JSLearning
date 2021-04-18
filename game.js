const settings = {
    rowCount: 10,
    colCount: 10,
    startPositionX: 0,
    startPositionY: 0,
    startDirection: 'rigth',
    stepsInSecond: 5,
    playerCellColor: '#AA3333',
    emptyCellColor: '#eee',
    score: 0,
    appleCellColor: '#0000ff',
    trashInterval: 0.1,
    trashCellColor: '#964b00'
}

const player = {
    x: null,
    y: null,
    direction: null,

    setDirection(direction) {
        this.direction = direction;
    },

    init(startX, startY, startDirection) {
        this.x = startX;
        this.y = startY;
        this.setDirection(startDirection);
    },

    makeStep() {
        const nextPoint = this.getNextStepPoint();

        this.x = nextPoint.x;
        this.y = nextPoint.y;

        if (this.x == apple.x && this.y == apple.y) {
            settings.score++
            var scoreContent = document.getElementById('score')
            scoreContent.innerHTML = 'Текущие очки: ' + settings.score
            apple.generateApplePosition()
        }

        else if (this.x == trash.x && this.y == trash.y) {
            alert('Игра окончена! Ваши очки: ' + settings.score)
            settings.score = 0
            var scoreContent = document.getElementById('score')
            scoreContent.innerHTML = 'Текущие очки: ' + settings.score
            player.x = null
            player.y = null
            player.direction = null
        }

    },

    getNextStepPoint() {
        const point = {
            x: this.x,
            y: this.y
        };

        switch (this.direction) {
            case 'up':              
                if (point.y <= 0) {
                    point.y = settings.rowCount
                }
                point.y--
                break;
            case 'right':
                if (point.x >= settings.colCount) {
                    point.x = -1
                }
                point.x++
                break;
            case 'down':
                if (point.y >= settings.rowCount) {
                    point.y = -1
                }
                point.y++
                break;
            case 'left':
                if (point.x <= 0){
                    point.x = settings.colCount
                }
                point.x--
                break;
        }
        return point;
    },
};


const apple = {
    x: null,
    y: null,
    
    generateApplePosition() {
        this.x = Math.floor(Math.random() * settings.rowCount)
        this.y = Math.floor(Math.random() * settings.colCount)
    }
};

const trash = {
    x: null,
    y: null,
    
    generateTrashPosition() {
            if (this.x != apple.x && this.y != apple.y || this.x != player.x && this.y != player.y) {
                this.x = Math.floor(Math.random() * settings.rowCount)
                this.y = Math.floor(Math.random() * settings.colCount)
        }
    },
};


const game = {
    player,
    settings,
    apple,
    trash,
    containerElement: null,
    cellElements: [],

    run() {
        this.init();
        this.render();
        this.apple.generateApplePosition();
        this.trash.generateTrashPosition();
        
        setInterval( () => {
                this.player.makeStep();
                this.render();
        }, 1000 / this.settings.stepsInSecond);

        setInterval ( () => {
            this.trash.generateTrashPosition();
        }, 1000 / this.settings.trashInterval);


    },
    

    init() {
        this.player.init(
            this.settings.startPositionX,
            this.settings.startPositionY,
            this.settings.startDirection);
        this.containerElement = document.getElementById('game');
        this.initCells();
        this.initEventHandlers();
    },

    initCells() {
        this.containerElement.innerHTML = '';
        this.cellElements = [];

        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);

            for (let col = 0; col < this.settings.colCount; col++) {
                const cell = document.createElement('td');
                trElem.appendChild(cell);

                this.cellElements.push(cell);
            }
        }
    },

    initEventHandlers() {
        document.addEventListener('keydown', (event) => {
            this.keyDownHandler(event);
        })
    },

    keyDownHandler(event) {
        //console.log(event)
        switch (event.code) {
            case 'keyW':
            case 'ArrowUp':
                this.player.setDirection('up')
                break;
            case 'keyD':
            case 'ArrowRight':
                this.player.setDirection('right')
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.player.setDirection('down');
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.player.setDirection('left');
                break;    
        }
    },

    render() {
        this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.emptyCellColor);
        
        const playerCell = document
            .querySelector(`tr:nth-child(${this.player.y + 1})`)
            .querySelector(`td:nth-child(${this.player.x + 1})`);

        const appleCell = document
            .querySelector(`tr:nth-child(${this.apple.y + 1})`)
            .querySelector(`td:nth-child(${this.apple.x + 1})`);

        const trashCell = document
            .querySelector(`tr:nth-child(${this.trash.y + 1})`)
            .querySelector(`td:nth-child(${this.trash.x + 1})`);

        playerCell.style.backgroundColor = this.settings.playerCellColor;
        appleCell.style.backgroundColor = this.settings.appleCellColor;
        trashCell.style.backgroundColor = this.settings.trashCellColor;
        
    },


    //canPlayerMakeStep() {
    //    const nextPoint = this.player.getNextStepPoint();

    //    return nextPoint.x >= 0 &&
    //        nextPoint.x < this.settings.colCount &&
    //        nextPoint.y < 0 &&
    //        nextPoint.y < this.settings.rowCount;
    //},
};

game.run();