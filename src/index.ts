import { Game } from './main/Game';

window.onload = () => {
  console.log('window onload');
  const game = new Game();
  game.start();
};
