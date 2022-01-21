import src from 'src/game-data/text.png';
import { TLevelData } from 'src/main/LevelData';

export class TextRenderer {
  private ctx: CanvasRenderingContext2D;
  private readonly spriteSheet: HTMLImageElement;
  private readonly src: string;
  private readonly levelData: TLevelData;

  constructor(ctx: CanvasRenderingContext2D, levelData: TLevelData) {
    this.ctx = ctx;
    this.levelData = levelData;
    this.spriteSheet = new Image();
    this.src = src;
    console.log(src);
  }

  async init(): Promise<boolean> {
    this.spriteSheet.src = this.src;

    return new Promise((resolve) => {
      this.spriteSheet.onload = () => {
        resolve(true);
      };
    });
  }

  public drawNumber(n: number, x: number, y: number) {
    const stringNumber = String(n);
    for (let i = 0; i < stringNumber.length; i++) {
      this.drawDigit(Number(stringNumber[i]), x, y, i);
    }
  }

  public drawChar(char: string, x: number, y: number, index: number) {
    const sourceX = 15;
    const sourceY = 505;
    const sourceHeight = 60;
    const sourceWidth = 67;

    const chars = 'abcdefghiklmnoprstuvy';
    const indexOfChar = chars.indexOf(char);
    if (indexOfChar === -1) return;

    const destWidth = sourceWidth / 2;
    const destHeight = sourceHeight / 2;
    const destX = x * this.levelData.fieldSize.width + index * destWidth;
    const destY = y * this.levelData.fieldSize.height;

    this.ctx.drawImage(
      this.spriteSheet,
      sourceX + indexOfChar * sourceWidth,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX - index * 3,
      destY,
      destWidth,
      destHeight
    );
  }

  public drawText(text: string, x: number, y: number) {
    for (let i = 0; i < text.length; i++) {
      this.drawChar(text[i], x, y, i);
    }
  }

  private drawDigit(n: number, x: number, y: number, index: number) {
    const sourceX = 15;
    const sourceY = 405;
    const sourceHeight = 55;
    const sourceWidth = 66;

    const destWidth = sourceWidth / 2;
    const destHeight = sourceHeight / 2;
    const destX = x * this.levelData.fieldSize.width + index * destWidth;
    const destY = y * this.levelData.fieldSize.height;

    this.ctx.drawImage(
      this.spriteSheet,
      sourceX + n * sourceWidth,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX - index * 3,
      destY,
      destWidth,
      destHeight
    );
  }
}
