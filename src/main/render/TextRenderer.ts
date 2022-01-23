import src from 'src/game-data/text.png';
import { TLevelData } from 'src/main/LevelData';

export enum Color {
  RED = 'red',
  WHITE = 'white',
}

type TTextSetting = {
  align?: Align;
  color?: Color;
};

type TColorShiftMap = Record<Color, { x: number; y: number }>;

export const CHAR_WIDTH = 33;
export const CHAR_HEIGHT = 30;
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
  }

  async init(): Promise<boolean> {
    this.spriteSheet.src = this.src;

    return new Promise((resolve) => {
      this.spriteSheet.onload = () => {
        resolve(true);
      };
    });
  }

  draw(text: string | number, x: number, y: number, setting?: TTextSetting): void {
    const textString = String(text);
    const align = setting?.align ? setting.align : Align.LEFT;
    for (let i = 0, j = 0 - textString.length + 1; i < textString.length; i++, j++) {
      const index = align === Align.LEFT ? i : j;
      this.drawChar(textString[i], x, y, index, setting?.color);
    }
  }

  private drawChar(char: string, x: number, y: number, index: number, color: Color = Color.WHITE) {
    const charsArray = ['abcdefghijklmno', 'pqrstuvwxyz!@', '0123456789/-"'];
    let xIndex = -1;
    let yIndex = -1;
    for (let i = 0; i < charsArray.length; i++) {
      const chars = charsArray[i];
      xIndex = chars.indexOf(char);
      if (xIndex !== -1) {
        yIndex = i;
        break;
      }
    }
    if (xIndex === -1) return;

    const sourceHeight = 110;
    const sourceWidth = 108;
    const colorShiftMap: TColorShiftMap = {
      [Color.WHITE]: {
        x: 0,
        y: 0,
      },
      [Color.RED]: {
        x: 1650,
        y: 0,
      },
    };
    let sourceX = xIndex * sourceWidth + colorShiftMap[color].x;
    if (char === '!') {
      sourceX -= 7;
    } else if (char === '@') {
      sourceX -= 10;
    }
    const sourceY = yIndex * sourceHeight + 5 + colorShiftMap[color].y;
    const destX = x * this.levelData.fieldSize.width + index * CHAR_WIDTH;
    const destY = y * this.levelData.fieldSize.height;
    this.ctx.drawImage(
      this.spriteSheet,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      CHAR_WIDTH,
      CHAR_HEIGHT
    );
  }

  drawNamcoLogo(x: number, y: number) {
    const sWidth = 700;
    const sHeight = 110;
    const sRatio = sHeight / sWidth;

    const dWidth = 200;
    const destX = x * this.levelData.fieldSize.width;
    const destY = y * this.levelData.fieldSize.height;
    this.ctx.drawImage(this.spriteSheet, 1650, 340, sWidth, sHeight, destX, destY, dWidth, dWidth * sRatio);
  }
}
