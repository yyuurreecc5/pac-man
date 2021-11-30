import Game from "./Game/Game";

window.onload = () => {
    console.log('window onload');
    const game = new Game();
    game.start();
}