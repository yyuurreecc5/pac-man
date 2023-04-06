import src from 'src/game-data/logo.png';
import { startLevel } from 'src/main/Main';
import { levelData, TLevelData } from 'src/main/LevelData';
import { SIDE_BAR_WIDTH } from 'src/main/render/GameRenderer';
import { Align, Color, TextRenderer } from 'src/main/render/TextRenderer';

const SCROLL_SPEED = 3;

let topCoordinate = levelData.gridSize.height * levelData.fieldSize.height;
export function startScreenResponder(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    if (topCoordinate !== 0) {
      topCoordinate = 0;
    } else {
      void startLevel();
    }
  }
}

export class StartScreenRenderer {
  private ctx: CanvasRenderingContext2D;
  private readonly image: HTMLImageElement;
  private readonly src: string;
  private readonly levelData: TLevelData;
  private readonly textRenderer: TextRenderer;
  constructor(ctx: CanvasRenderingContext2D, levelData: TLevelData, textRenderer: TextRenderer) {
    this.ctx = ctx;
    this.levelData = levelData;
    this.image = new Image();
    this.src = src;
    this.textRenderer = textRenderer;
  }

  async init(): Promise<boolean> {
    this.image.src = this.src;

    return new Promise((resolve) => {
      this.image.onload = () => {
        resolve(true);
      };
    });
  }

  draw() {
    if (topCoordinate === 0) {
      this.staticDraw();
    } else {
      this.scrollDraw();
    }
  }

  private drawLogo() {
    const ratio = this.image.naturalHeight / this.image.naturalWidth;
    const width = this.levelData.gridSize.width * this.levelData.fieldSize.width;
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.image.naturalWidth,
      this.image.naturalHeight,
      SIDE_BAR_WIDTH / 2,
      6 * this.levelData.fieldSize.height,
      width,
      width * ratio
    );
  }

  private scrollDraw() {
    this.ctx.save();
    const newCoordinate = topCoordinate - SCROLL_SPEED;
    topCoordinate = Math.max(newCoordinate, 0);
    this.ctx.translate(0, topCoordinate);
    this.staticDraw();
    this.ctx.restore();
  }

  private staticDraw() {
    this.textRenderer.draw('1up', 6, 2, { color: Color.RED });
    this.textRenderer.draw('hi-score', 15, 2, { color: Color.RED });
    this.textRenderer.draw('2up', 29, 2, { color: Color.RED });
    this.textRenderer.draw('00', 10, 3, { align: Align.RIGHT });
    this.textRenderer.draw('10000', 17, 3);
    this.textRenderer.draw('00', 33, 3, { align: Align.RIGHT });
    this.textRenderer.draw('-', 14, 17);
    this.drawLogo();
    this.textRenderer.draw('1 player', 15, 17);
    this.textRenderer.draw('2 players', 15, 19);
    this.textRenderer.drawNamcoLogo(17, 22);
    this.textRenderer.draw('@ 1980 1984 namco ltd', 9, 25);
    this.textRenderer.draw('all rights reserved', 10, 27);
  }
}
