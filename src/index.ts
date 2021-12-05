import { Game } from 'src/main/Game';

window.onload = () => {
  console.log('window onload');
  const game = new Game();
  game.start();
};
