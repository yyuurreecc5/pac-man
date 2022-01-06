import { TGameObjects } from 'src/main/GameObject';
import { TLevelData } from 'src/main/LevelData';
import levelData from 'src/game-data/game-data.json';
import imagesNew from 'src/game-data/images/images.json';
import sprites from 'src/game-data/sprites/sprites.json';
import { TSprites } from 'src/main/Sprite';

const SCALE = 0.75;

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly levelData: TLevelData = levelData;
  private readonly scale = 0.75;
  private readonly images: Record<string, HTMLImageElement> = {};
  private readonly sprites: TSprites;
  private readonly imagesNew;
  constructor() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvas.width = this.levelData.gridSize.width * levelData.fieldSize.width * SCALE;
    this.canvas.height = this.levelData.gridSize.height * levelData.fieldSize.height * SCALE;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.scale(this.scale, this.scale);
    this.sprites = sprites;
    this.imagesNew = imagesNew;
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

    return Promise.all(promises).then((values) => {
      values.forEach((value) => {
        this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];
      });
    });
  }

  draw(objects: TGameObjects) {
    const levelWidth = this.levelData.gridSize.width * this.levelData.fieldSize.width;
    const levelHeight = this.levelData.gridSize.height * this.levelData.fieldSize.height;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, levelWidth, levelHeight);

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
    //this.drawGrid()
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
}
