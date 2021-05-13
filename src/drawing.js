export default class Drawing {

    static gameOver(ctx, centerX, centerY) {
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

    static drawScore(ctx, centerX, centerY, score) {
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

    static drawSnake(ctx, blockSize, snake){  // Va déssiner le corp du serpent.
        ctx.save();         // Je sauvegarde son contenu de comme il était avant.
        ctx.fillStyle = "#ff0000";
        //  for(let i = 0; i < this.body.length; i++){ // Utilisation du for normal
        for (let block of snake.body) {   // Utilisation du for of
            // drawBlock(ctx, this.body[i]); // Permet de déssiner un block. On lui donne le context du canvas sur lequel il doit déssiner et la position du block à déssiner.
            this.drawBlock(ctx, block, blockSize);  // Nouvelle version suite au for of
        }
        ctx.restore();      // Permet de le remettre comme il était avant.
    };

    static drawApple(ctx, blockSize, apple){
        const radius = blockSize/2;
        const x = apple.position[0]*blockSize + radius;
        const y = apple.position[1]*blockSize + radius;

        ctx.save();

        ctx.fillStyle = "#33cc33";
        ctx.beginPath();

        ctx.arc(x, y, radius, 0, Math.PI*2, true);  // Fonction qui permet de déssiner un cercle.
        ctx.fill(); // Ensuite on le rempli

        ctx.restore();
    };
    
    static drawBlock(ctx, position, blockSize) {
        // 1ere version
        // const x = position[0] * blockSize;
        // const y = position[1] * blockSize;
        // ctx.fillRect(x, y, blockSize, blockSize);

        // Version avec le Destructuring
        const [x,y] = position;
        ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
    }
}