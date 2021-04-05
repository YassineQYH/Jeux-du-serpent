window.onload = () => {  // window.onload => Permet de lancer la fonction lorsque la page sera chargé.
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30; // le block fait 30px sur 30px
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d'); 
    const widthInBlocks = canvasWidth/blockSize;
    const heightInBlocks = canvasHeight/blockSize;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    let delay;
    let snakee;
    let applee;
    let score;
    let timeout;


    const init = () => {
        /* const canvas = document.createElement('canvas'); */
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "30px solid grey";
        canvas.style.margin = "50px auto";
        canvas.style.display = "block";
        canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(canvas);  // document => c'est le document entier de la page html | il va prendre son body | appendChild => permet d'accrocher un tag à ce body
    
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
        launch();
    }

    const launch = () => {
        // Création du serpent qui possède un body
        snakee = new Snake([[6,4], [5,4], [4,4], [3,4], [2,4]], "right");

        // Création de la pomme
        applee = new Apple([10,10]);

        score = 0;
        clearTimeout(timeout);
        delay = 100;
        // A la fin de ma fonction init je veux appeler ma fonction refreshCanvas.
        refreshCanvas();
    }

    const refreshCanvas = () => {
        snakee.advance();
        if(snakee.checkCollision()){
            gameOver();
        } else {
            if(snakee.isEatingApple(applee)) {
                score++;
                snakee.eatApple = true;

                do {
                    applee.setNewPosition();
                } while(applee.isOnSnake(snakee)) // Si la nouvelle position est sur le serpent snakee, ça va renvoyer true et il va revenir au do et recréer une nouvelle position.

                if(score % 5 == 0){
                    speedUp();
                }
            }
            ctx.clearRect(0,0,canvasWidth, canvasHeight);
            drawScore();
            snakee.draw();
            applee.draw();
            timeout = setTimeout(refreshCanvas, delay); // Permet d'excecuter une certaine fonction à chaque qu'un certains délais est passé.
        }

    }

    const speedUp = () => {
        delay /= 1.3;
    }

    const gameOver = () => {
        ctx.save();

        ctx.font = "bold 70px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";        // Sinon il n'est pas vraiment au milieu car il prend le dessous du chiffre. La, il va l'afficher par rapport au milieu.
        ctx.strokeStyle = "white";          // Donne un style blanc autour du text.
        ctx.lineWidth = 5;                  // C'est l'épaisseur du strokeStyle.
        /* const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2; */

        ctx.strokeText("Game Over", centerX, centerY - 180); // Permet de remplir le stroke qu'on a renseigné plus haut pour le voir.
        ctx.fillText("Game Over", centerX, centerY - 180);   // la fonction fillText() => Permet d'écrire à l'écran. Il possède 2 arguments, le text et l'endroit.
        
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer", centerX, centerY - 120);

        ctx.restore();
    }

    const drawScore = () => {
        ctx.save();
        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "gray";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle"; 
        /* const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2; */
        ctx.fillText(score.toString(), centerX, centerY );
        ctx.restore();
    }

    const drawBlock = (ctx, position) => {
        const x = position[0] * blockSize;
        const y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction){       // Cette fonction prend le corp du serpent. | Ceci est le constructeur de la fonction
        this.body = body;       // Le serpent ç un corp qui prend le corp que je fournis à ma fonction constructeur.
        this.direction = direction;
        this.ateApple = false;

        this.draw = function(){  // Va déssiner le corp du serpent.
            ctx.save();         // Je sauvegarde son contenu de comme il était avant.
            ctx.fillStyle = "#ff0000";
            for(let i = 0; i < this.body.length; i++){
                drawBlock(ctx, this.body[i]); // Permet de déssiner un block. On lui donne le context du canvas sur lequel il doit déssiner et la position du block à déssiner.
            }
            ctx.restore();      // Permet de le remettre comme i létait avant.
        };

        this.advance = function(){
            const nextPosition = this.body[0].slice();    // Slice => permet de copier un élément
            switch(this.direction){
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                default:
                    throw("Invalid Direction");    // throw => fonction permet de dire qu'il y a une erreur et de donner un message d'erreur.
            }
            this.body.unshift(nextPosition); // unshift => permet dans un array de rajouter ce que je met entre () à la 1ere place.
            if(!this.eatApple)
                this.body.pop(); // pop => permet de supprimer le dernier élément d'un array
            else
                this.eatApple = false;
        };
        this.setDirection = function(newDirection){
            let allowedDirections;
            switch(this.direction){
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    throw("Invalid Direction");
            }
            if(allowedDirections.indexOf(newDirection) > -1){
                this.direction = newDirection;
            }
        };
        this.checkCollision = function(){
            let wallCollision = false;
            let snakeCollision = false;
            const head = this.body[0];
            const rest = this.body.slice(1);
            const snakeX = head[0];
            const snakeY = head[1];
            const minX = 0;
            const minY = 0;
            const maxX = widthInBlocks - 1;
            const maxY = heightInBlocks - 1;
            const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true;
            }

            for(let i = 0; i < rest.length; i++){
                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                    snakeCollision = true;
            }
            return wallCollision || snakeCollision;
        };
        this.isEatingApple = function(appleToEat){
            const head = this.body[0];
            if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
                return true;
            else
                return false;
        };
    }

    function Apple(position){
        this.position = position;

        this.draw = function(){
            const radius = blockSize/2;
            const x = this.position[0]*blockSize + radius;
            const y = this.position[1]*blockSize + radius;

            ctx.save();

            ctx.fillStyle = "#33cc33";
            ctx.beginPath();

            ctx.arc(x, y, radius, 0, Math.PI*2, true);  // Fonction qui permet de déssiner un cercle.
            ctx.fill(); // Ensuite on le rempli

            ctx.restore();
        };
        this.setNewPosition = function(){
            // l'objet Math et la fonction random permet de donner un chiffre aléatoire entre 0 et 1 sauf que moi je veux entre 0 et le nombre de block qu'il y a dans la largeur -1. Mais ça peut me donner un nombre à virgure et ça je ne veux pas, je veux des chiffres entier donc il faut utiliser l'objet Math et la fonction round
            const newX = Math.round(Math.random()*(widthInBlocks-1));
            const newY = Math.round(Math.random()*(heightInBlocks-1));
            this.position = [newX, newY];
        };
        this.isOnSnake = function(snakeToCheck){
            let isOnSnake = false;
            for(let i = 0 ; i < snakeToCheck.body.length ; i++){
                if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
                    isOnSnake = true;
                }
            }
            return isOnSnake;
        };
        
    }

    document.onkeydown = (e) => {
        const key = e.keyCode;
        let newDirection;
        switch(key)
        {
            case 81:
                newDirection = "left";
                break;
            case 90:
                newDirection = "up";
                break;
            case 68:
                newDirection = "right";
                break;
            case 83:
                newDirection = "down";
                break;
            case 32:
                launch();
                return;
            default:
                return;
        }
        snakee.setDirection(newDirection);
    }

    init();
}