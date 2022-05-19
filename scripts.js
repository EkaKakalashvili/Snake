class Game {
    constructor() {
        this.input_key = new Input();
        this.input_key.changeDirection();
        this.new_section = 0;      
        this.board_size = 20;
        this.grow_by = 1;
        this.SPEED = 10;
        this.last_function_call = 0;
        this.game_over = false;
        this.snake_body = [
            {x: 16, y: 20},
            {x: 17, y: 20},
            {x: 18, y: 20},
            {x: 19, y: 20}
        ];
        this.apple = this.random_position();
    }



    getlast_function_call() {
        return this.last_function_call;
    }

    setlast_function_call(val) {
        this.last_function_call = val;
    }

    getSpeed() {
        return this.SPEED;
    }

    getResult() {
        return this.game_over;
    }


    
    //new game
    game_cleanUp() {
        this.updateApple();
        this.updateSnake();
        this.checkGame();
    }
    //get all element onscreen
    drawGame(){
        let myGUI = new gamePage();
        myGUI.createSnake(this.snake_body, this.board_size);
        myGUI.createApple(this.apple, this.board_size);
    }
    //if snake bit itself
    checkGame() {
        this.game_over = this.snakeIntersection();
    }

    
    //Snake attributes and properties

    updateSnake() {
        this.addnew_section();
        const direction = this.input_key.getDirection();
    
        // Moving body
        for (let i = this.snake_body.length - 2; i>= 0; i--) {
            this.snake_body[i + 1]= {...this.snake_body[i]}
        }
    
        // Snake's head
        this.snake_body[0].x += direction.x;
        this.snake_body[0].y += direction.y;   
    }

    addnew_section() {
        for (let i = 0; i < this.new_section; i++) {
            this.snake_body.push({...this.snake_body[this.snake_body.length - 1]});
        }

        this.new_section = 0;
    }

    growSnake(cellAmount) {
        this.new_section += cellAmount;
    }
//https://stackoverflow.com/questions/50776164/javascript-snake-collision-understanding
    elementOnSnake(pos, {ignoreHead = false} = {}) {
        return this.snake_body.some((my_position, index) => {
            if(ignoreHead && index === 0) return false;
            return (my_position.x === pos.x && my_position.y === pos.y);
        })
    }

    getHead() {
        return this.snake_body[0];
    }

    snakeIntersection() {
        return this.elementOnSnake(this.snake_body[0], {ignoreHead: true})
    }

    //#endregion


    //#region Apple's properties

    updateApple(){
        if(this.elementOnSnake(this.apple)){
            this.growSnake(this.grow_by);
            this.apple = this.random_position();
        }
    }

    random_position() {
        let applePos = this.randomPosition();
        while(applePos === null || this.elementOnSnake(applePos)) {
            applePos = this.randomPosition();
        }
        return applePos;
    }

    //#endregion

    
    randomPosition() {
        return {
            x: Math.floor(Math.random() * this.board_size) + 1 ,
            y: Math.floor(Math.random() * this.board_size) + 1 
        }
    }
    
}


class Input{ 
    constructor(){
        this.Direction={
            Up: { x: 0, y: -1 },
            Down: { x: 0, y: 1 },
            Left: { x: -1, y: 0 },
            Right: { x: 1, y: 0 }
        }
        this.inpDirection = this.Direction.Left; 
    }

    changeDirection() {  
        console.log(window)
        window.addEventListener('keydown', e => {
            switch(e.key){
                case 'ArrowUp':
                        this.inpDirection = this.Direction.Up;
                    break
                case 'ArrowDown':
                        this.inpDirection = this.Direction.Down;
                    break
                case 'ArrowLeft':
                        this.inpDirection = this.Direction.Left;
                    break
                case 'ArrowRight':
                        this.inpDirection = this.Direction.Right;
                    break
            }
        });
    }
    
    getDirection() {
        this.prevDirection = this.inpDirection;
        return this.inpDirection;
    }

}



const myGame = new Game();

function main(currentTime) {
    if(myGame.getResult()) {
        if(confirm("GAME OVER!")){
            location.reload();
        }
        return;
    }

    // Creating infinite main loop for game
    window.requestAnimationFrame(main);
    
    // Converting to ms
    const callingInterval = (currentTime - myGame.getlast_function_call()) / 1000;

    // Check if time intrval is good 
    if(callingInterval < 1 / myGame.getSpeed()) return;

    // Updating last call
    myGame.setlast_function_call(currentTime);

    
    myGame.game_cleanUp();
    myGame.drawGame();

}

window.requestAnimationFrame(main);
