import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";

export default class Game {

    constructor(canvasWidth = 900, canvasHeight = 600) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 30; // le block fait 30px sur 30px
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d'); 
        this.widthInBlocks = this.canvasWidth/this.blockSize;
        this.heightInBlocks = this.canvasHeight/this.blockSize;
        this.centerX = this.canvasWidth / 2;
        this.centerY = this.canvasHeight / 2;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeout;
    }

    init() {
        /* const canvas = document.createElement('canvas'); */
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "30px solid grey";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(this.canvas);  // document => c'est le document entier de la page html | il va prendre son body | appendChild => permet d'accrocher un tag à ce body
    
        // Comment "dessiner" dans ce canvas. On va essayer de faire un rectangle.
        // Pour dessiner dans le canvas on à besoin d'utiliser le context
        // Pour l'utiliser, on va créer une variable et je vais attraper le context de notre canvas qu'on vient de mettre.
        // Il y a plusieurs façon de dessiner dans un canvas, la on va déssiner en 2D.
        /* ctx = canvas.getContext('2d');  */ 

        // Création du serpent qui possède un body
        /* snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right"); */

        // Création de la pomme
        /* applee = new Apple([10,10]);

        score = 0; */

        // A la fin de ma fonction init je veux appeler ma fonction refreshCanvas.
        /* refreshCanvas(); */
        this.launch();
    }

    launch() {
        // Création du serpent qui possède un body
        this.snakee = new Snake("right", [6,4], [5,4], [4,4], [3,4], [2,4]);

        // Création de la pomme
        this.applee = new Apple();

        this.score = 0;
        clearTimeout(this.timeout);
        this.delay = 100;
        // A la fin de ma fonction init je veux appeler ma fonction refreshCanvas.
        this.refreshCanvas();
    }

    refreshCanvas() {
        this.snakee.advance();
        if(this.snakee.checkCollision(this.widthInBlocks, this.heightInBlocks)){
            Drawing.gameOver(this.ctx, this.centerX, this.centerY);
        } else {
            if(this.snakee.isEatingApple(this.applee)) {
                this.score++;
                this.snakee.eatApple = true;

                do {
                    this.applee.setNewPosition(this.widthInBlocks, this.heightInBlocks);
                } while(this.applee.isOnSnake(this.snakee)) // Si la nouvelle position est sur le serpent snakee, ça va renvoyer true et il va revenir au do et recréer une nouvelle position.

                if(this.score % 5 == 0){
                    this.speedUp();
                }
            }
            this.ctx.clearRect(0,0,this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx, this.centerX, this.centerY, this.score);
            Drawing.drawSnake(this.ctx, this.blockSize, this.snakee);
            Drawing.drawApple(this.ctx, this.blockSize, this.applee);
            this.timeout = setTimeout(this.refreshCanvas.bind(this), this.delay); // Permet d'excecuter une certaine fonction à chaque qu'un certains délais est passé.
        }

    }

    speedUp() {
        this.delay /= 1.3;
    }

}