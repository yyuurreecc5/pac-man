import src from 'src/game-data/text.png';
import { TLevelData } from 'src/main/LevelData';

const signs = ['-', '.', '>', '@', '!'] as const;
type TSign = typeof signs[number];

function isSign(char: string): char is TSign {
  return signs.includes(char as TSign);
}

const CHAR_WIDTH = 33;
const CHAR_HEIGHT = 30;
export enum Align {
  RIGHT = 'right',
  LEFT = 'left',
}

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

  draw(text: string | number, x: number, y: number, align: Align = Align.LEFT): void {
    text = String(text);

    for (let i = 0, j = 0 - text.length + 1; i < text.length; i++, j++) {
      const char = text[i];
      const index = align === Align.LEFT ? i : j;
      if (isSign(char)) {
        this.drawSign(char, x, y, index);
      } else if (Number.isNaN(parseInt(char))) {
        this.drawChar(char, x, y, index);
      } else {
        this.drawDigit(Number(char), x, y, index);
      }
    }
  }

  private drawChar(char: string, x: number, y: number, index: number) {
    const sourceX = 15;
    const sourceY = 505;
    const sourceHeight = 60;
    const sourceWidth = 67;

    const chars = 'abcdefghiklmnoprstuvy';
    const indexOfChar = chars.indexOf(char);
    if (indexOfChar === -1) return;

    const destX = x * this.levelData.fieldSize.width + index * CHAR_WIDTH;
    const destY = y * this.levelData.fieldSize.height;

    this.ctx.drawImage(
      this.spriteSheet,
      sourceX + indexOfChar * sourceWidth,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      CHAR_WIDTH,
      CHAR_HEIGHT
    );
  }

  private drawDigit(n: number, x: number, y: number, index: number) {
    const sourceX = 15;
    const sourceY = 400;
    const sourceHeight = 60;
    const sourceWidth = 66;

    const destX = x * this.levelData.fieldSize.width + index * CHAR_WIDTH;
    const destY = y * this.levelData.fieldSize.height;
    this.ctx.drawImage(
      this.spriteSheet,
      sourceX + n * sourceWidth,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      CHAR_WIDTH,
      CHAR_HEIGHT
    );
  }

  public drawSign(n: TSign, x: number, y: number, index: number) {
    const sourceY = 400;
    const sourceHeight = 60;
    const sourceWidth = 66;

    const signMap: Record<TSign, number> = {
      '-': 675,
      '.': 730,
      '>': 800,
      '@': 890,
      '!': 955,
    };

    const destX = x * this.levelData.fieldSize.width + index * CHAR_WIDTH;
    const destY = y * this.levelData.fieldSize.height;
    this.ctx.drawImage(
      this.spriteSheet,
      signMap[n],
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      CHAR_WIDTH,
      CHAR_HEIGHT
    );
  }
}
