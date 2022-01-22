import levelData from 'src/game-data/game-data.json';
import imagesNew from 'src/game-data/images/images.json';
import sprites from 'src/game-data/sprites/sprites.json';
import { GameObject } from 'src/main/GameObject';
import { TLevelData } from 'src/main/LevelData';
import { StartScreenRenderer } from 'src/main/render/StartScreenRenderer';
import { Align, Color, TextRenderer } from 'src/main/render/TextRenderer';
import { TSprites } from 'src/main/Sprite';

export const SIDE_BAR_WIDTH = 400;
const DEBUG = false;

export class GameRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly levelData: TLevelData = levelData;
  private readonly scale = 0.75;
  private readonly images: Record<string, HTMLImageElement> = {};
  private readonly sprites: TSprites;
  private readonly imagesNew;
  private readonly debug = DEBUG;
  private readonly textRenderer: TextRenderer;
  private readonly startScreenRenderer: StartScreenRenderer;

  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = (this.levelData.gridSize.width * levelData.fieldSize.width + SIDE_BAR_WIDTH) * this.scale;
    this.canvas.height = this.levelData.gridSize.height * levelData.fieldSize.height * this.scale;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
    this.sprites = sprites;
    this.imagesNew = imagesNew;
    this.textRenderer = new TextRenderer(this.ctx, this.levelData);
    this.startScreenRenderer = new StartScreenRenderer(this.ctx, this.levelData, this.textRenderer);
  }

  async init() {
    const imageKeys = Object.keys(this.imagesNew);
    const promises: Promise<Record<string, HTMLImageElement>>[] = imageKeys.map((imageKey) => {
      const imageSrc = require(`src/game-data/images/${this.imagesNew[imageKey]}`);
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const result: Record<string, HTMLImageElement> = {};
          result[imageKey] = image;
          resolve(result);
        };
        image.src = imageSrc;
      });
    });

    await Promise.all(promises).then((values) => {
      values.forEach((value) => {
        this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];
      });
    });

    await this.textRenderer.init();
    await this.startScreenRenderer.init();
  }

  draw(objects: GameObject[]) {
    this.clearScreen();

    if (true) {
      this.drawStartScreen();
    } else {
      this.drawScene(objects);
      this.drawSidebar();
      if (this.debug) {
        this.drawGrid();
      }
    }
  }

  clearScreen() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(
      0,
      0,
      this.levelData.fieldSize.width * this.levelData.gridSize.width + SIDE_BAR_WIDTH,
      this.levelData.fieldSize.height * this.levelData.gridSize.height
    );
  }

  drawScene(objects: GameObject[]) {
    objects.forEach((object) => {
      const halfWidth = object.size.width / 2;
      const halfHeight = object.size.height / 2;
      const sprite = this.sprites[object.currentState.sprite];
      const spr = sprite[object.direction];

      this.ctx.save();
      const offsetX = Math.floor((this.levelData.fieldSize.width - object.size.width) / 2);
      const offsetY = Math.floor((this.levelData.fieldSize.height - object.size.height) / 2);
      this.ctx.translate(object.x + offsetX, object.y + offsetY); // change origin

      if (spr.rotate > 0) {
        this.ctx.translate(halfWidth, halfHeight); // change origin
        this.ctx.rotate((spr.rotate * Math.PI) / 180);
        this.ctx.translate(-halfWidth, -halfHeight); // change origin
      }

      if (object.flipped) {
        this.ctx.translate(object.size.width, 0);
        this.ctx.scale(-1, 1);
      }

      const image = this.images[spr.image];
      this.ctx.drawImage(image, 0, 0, object.size.width, object.size.height);
      this.ctx.restore();
    });
  }

  drawGrid() {
    this.ctx.strokeStyle = '#FFFFFF';
    for (let w = 0; w < levelData.gridSize.width; w++) {
      for (let h = 0; h < levelData.gridSize.height; h++) {
        this.ctx.strokeRect(
          w * this.levelData.fieldSize.width,
          h * this.levelData.fieldSize.height,
          this.levelData.fieldSize.width,
          this.levelData.fieldSize.height
        );
      }
    }
  }

  drawSidebar() {
    this.textRenderer.draw('hi-score', this.levelData.gridSize.width, 1, { color: Color.RED });
    this.textRenderer.draw('10000', this.levelData.gridSize.width + 6, 3, { align: Align.RIGHT });
    this.textRenderer.draw('1up', this.levelData.gridSize.width + 1, 5, { color: Color.RED });
    this.textRenderer.draw('3470', this.levelData.gridSize.width + 6, 7, { align: Align.RIGHT });
  }

  private drawStartScreen() {
    this.startScreenRenderer.draw();
  }
}
