export default class Apple {
    constructor(position = [10,10]) {   // Valeur par défaut
        this.position = position;
    }

    setNewPosition(widthInBlocks, heightInBlocks){
        // l'objet Math et la fonction random permet de donner un chiffre aléatoire entre 0 et 1 sauf que moi je veux entre 0 et le nombre de block qu'il y a dans la largeur -1. Mais ça peut me donner un nombre à virgure et ça je ne veux pas, je veux des chiffres entier donc il faut utiliser l'objet Math et la fonction round
        const newX = Math.round(Math.random()*(widthInBlocks-1));
        const newY = Math.round(Math.random()*(heightInBlocks-1));
        this.position = [newX, newY];
    };
    isOnSnake(snakeToCheck){
        let isOnSnake = false;
        //for(let i = 0 ; i < snakeToCheck.body.length ; i++){  // utilisation du for normal
        for(let block of snakeToCheck.body){    // utilisation du for of
            //if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){ // Utilisation du for normal
            if(this.position[0] === block[0] && this.position[1] === block[1]){   // Utilisation du for of
                isOnSnake = true;
            }
        }
        return isOnSnake;
    };
}