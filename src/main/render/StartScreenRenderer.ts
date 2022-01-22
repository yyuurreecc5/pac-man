import src from 'src/game-data/logo.png';
import { TLevelData } from 'src/main/LevelData';
import { SIDE_BAR_WIDTH } from 'src/main/render/GameRenderer';
import { Align, Color, TextRenderer } from 'src/main/render/TextRenderer';

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
    const x = SIDE_BAR_WIDTH / 2;
    this.textRenderer.draw('1up', 6, 2, { color: Color.RED });
    this.textRenderer.draw('hi-score', 16, 2, { color: Color.RED });
    this.textRenderer.draw('2up', 28, 2, { color: Color.RED });
    this.textRenderer.draw('00', 10, 3, { align: Align.RIGHT });
    this.textRenderer.draw('10000', 18, 3);
    this.textRenderer.draw('1000', 33, 3, { align: Align.RIGHT });
    this.textRenderer.draw('-', 15, 17);
    this.textRenderer.draw('1 player', 16, 17);
    this.textRenderer.draw('2 players', 16, 19);

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
}
