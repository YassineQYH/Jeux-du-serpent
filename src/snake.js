export default class Snake {
        //  ...body => utilisation du parametre Rest
    constructor(direction, ...body){   // Cette fonction prend le corp du serpent. | Ceci est le constructeur de la fonction
    this.body = body;       // Le serpent ç un corp qui prend le corp que je fournis à ma fonction constructeur.
    this.direction = direction;
    this.ateApple = false;
    }

    advance(){
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
    setDirection(newDirection){
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
    if(allowedDirections.includes(newDirection)){
    this.direction = newDirection;
    }
    };
    checkCollision(widthInBlocks, heightInBlocks){
    let wallCollision = false;
    let snakeCollision = false;
    // const head = this.body[0];  //Version 1
    // const rest = this.body.slice(1); // slice => permet de sauter le 1er élément et à partir de l'index 1 je prend tout ce qu'il y a dans le body.   //Version 1
    const [head,...rest] = this.body;     // Version avec destructuring et j'utilise les paramètres Rest avec : ...rest | attention l'array s'appelle aussi rest ici, ne pas confondre.
    // const snakeX = head[0];  //Version 1
    // const snakeY = head[1];  //Version 1
    const [snakeX,snakeY] = head;   //Version avec destructuring
    const minX = 0;
    const minY = 0;
    const maxX = widthInBlocks - 1;
    const maxY = heightInBlocks - 1;
    const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
    const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

    if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
    wallCollision = true;
    }

    //for(let i = 0; i < rest.length; i++){ // Utilisation du for normal
    for(let block of rest){   // Utilisation du for of
    //if(snakeX === rest[i][0] && snakeY === rest[i][1])    // Utilisation du for
    if(snakeX === block[0] && snakeY === block[1])  // Utilisation du for of
        snakeCollision = true;
    }
    return wallCollision || snakeCollision;
    };
    isEatingApple(appleToEat){
    const head = this.body[0];
    if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
    return true;
    else
    return false;
    };
}