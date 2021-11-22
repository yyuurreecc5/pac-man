import states from '../game-data/states/states.json';
import entities from '../game-data/entities/entities.json';
import images from '../game-data/images/images.json';
import sprites from '../game-data/sprites/sprites.json';
import levelData from '../game-data/game-data.json';

class Game {
    private readonly images: Object;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private readonly states: object;
    private readonly entities: object;
    private readonly sprites: object;
    private tics: number;
    private objects: any;
    private levelData: any;
    private readonly imagesNew: any;
    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = 400;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');

        this.states = states;
        this.entities = entities;
        this.imagesNew = images;
        this.sprites = sprites;
        this.levelData = levelData;

        this.images = {};
        this.objects = [];
    }

    start () {
        this.init()
            .then(() => {
                this.step();
            });
    }

    init() {
        this.initObjects();

        document.addEventListener('keydown', (event) => {
            this.input(event);
        });

        const imageKeys = Object.keys(this.imagesNew);
        const promises = imageKeys.map((imageKey) => {
            const imageSrc = require(`../game-data/images/${this.imagesNew[imageKey]}`);
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    const result = {};
                    result[imageKey] = image;
                    resolve(result);
                };
                image.src = imageSrc;
            })
        });
        return Promise.all(promises).then((values: Array<HTMLImageElement>) => {
            values.forEach((value) => {
                this.images[Object.keys(value)[0]] = value[Object.keys(value)[0]];
            })
        });
    }

    initObjects() {
        const layers = this.levelData.layers;
        let entries = [];
        for(const key in layers) {
            entries = entries.concat(layers[key].entries.map((entry) => {
                const entity = this.entities[entry.name];
                return {
                    name: entry.name,
                    x: entry.coordinates.x,
                    y: entry.coordinates.y,
                    dx: 0,
                    dy: 0,
                    tics: 0,
                    direction: entry.direction,
                    currentState: this.states[entity.initState],
                    size: entity.size,
                    angle: entry.angle
                }
            }));
        }
        this.objects = entries;
    }

    input(event) {
        const pacman = this.objects.find(object => object.name === 'pacman');
        switch(event.key) {
            case 'ArrowRight': pacman.direction = 'right'; return;
            case 'ArrowDown': pacman.direction = 'down'; return;
            case 'ArrowLeft': pacman.direction = 'left'; return;
            case 'ArrowUp': pacman.direction = 'up'; return;
        }

        const ghostRed = this.objects.find(object => object.name === 'ghost');
        switch(event.key) {
            case 'd': ghostRed.direction = 'right'; return;
            case 's': ghostRed.direction = 'down'; return;
            case 'a': ghostRed.direction = 'left'; return;
            case 'w': ghostRed.direction = 'up'; return;
        }
    }

    update() {
        this.objects.forEach((object) => {

            const entity = this.entities[object.name];

            if(object.direction === 'up') {
                object.dx = 0;
                object.dy = -entity.speed;
            } else if( object.direction === 'down') {
                object.dx = 0;
                object.dy = entity.speed;
            } else if( object.direction === 'left') {
                object.dx = -entity.speed;
                object.dy = 0;
            } else if(object.direction === 'right') {
                object.dx = entity.speed;
                object.dy = 0;
            } else {
                object.dx = object.dy = 0;
            }

            object.x += Math.floor(object.dx);
            object.y += Math.floor(object.dy);
            // console.log(object.dx, object.dy);
            if(object.tics >= object.currentState.tics) {
                object.tics = 0;
                object.currentState = this.states[object.currentState.nextState];
            }
            object.tics++;
        })
    }

    draw() {
        const levelWidth = this.levelData.gridSize.width * this.levelData.fieldSize.width;
        const levelHeight = this.levelData.gridSize.height * this.levelData.fieldSize.height;
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0,0, levelWidth, levelHeight);
        this.objects.forEach((object) => {
            const halfWidth = object.size.width / 2;
            const halfHeight = object.size.height / 2;
            this.ctx.save();
            this.ctx.translate(object.x + halfWidth, object.y + halfHeight); // change origin
            const sprite = this.sprites[object.currentState.sprite];
            const spr = sprite[object.direction];

            if(spr.rotate > 0) {
                this.ctx.rotate(spr.rotate * Math.PI / 180);
            }

            this.ctx.translate(-halfWidth, -halfHeight); // change origin
            const image = this.images[spr.image];
            this.ctx.drawImage(image, 0, 0, object.size.width, object.size.height);
            this.ctx.restore();
        })

    }

    step() {
        requestAnimationFrame(this.step.bind(this));
        this.update();
        this.draw();
    }
}

export default Game;
