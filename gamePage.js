class gamePage {
    constructor() {
        this.board = document.getElementById('board');
        this.board.innerHTML = '';
    }

    createApple(apple) {
        const myApple = document.createElement("div");
        myApple.style.gridRowStart = apple.y;
        myApple.style.gridColumnStart = apple.x;
        myApple.classList.add("apple");
        board.appendChild(myApple);
    }

    createSnake(snake_body, board_size) {
        snake_body.forEach(my_position => {
            const mySnake = document.createElement("div");
            while (my_position.y < 0) {
                my_position.y += board_size + 1; //snake crossed top border
            }
            while (my_position.y > board_size) { //snake crossed bottom border
                my_position.y -= board_size;
            }

            while (my_position.x < 0) {
                my_position.x += board_size + 1; //snake crossed left border
            }
            while (my_position.x > board_size) { //crossed right border
                my_position.x -= board_size; 
            }

            mySnake.style.gridRowStart = my_position.y;
            mySnake.style.gridColumnStart = my_position.x;
            mySnake.classList.add("snake");
            board.appendChild(mySnake);
        });
    }
}
