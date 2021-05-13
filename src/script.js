import "babel-polyfill";
import Game from "./game.js";

window.onload = () => {  // window.onload => Permet de lancer la fonction lorsque la page sera chargé.

    let myGame = new Game();
    myGame.init();

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
                myGame.launch();
                return;
            default:
                return;
        }
        myGame.snakee.setDirection(newDirection);
    }


}