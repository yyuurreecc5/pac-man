import { Game } from 'src/main/Game';

window.onclick = () => {
  const game = new Game();
  void game.start();
};
