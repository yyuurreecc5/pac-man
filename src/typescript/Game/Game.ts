import states from './states.json';
import entities from './entities.json';
import sprites from './sprites.json';

class Game {
    private readonly images: Object;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private readonly states: object;
    private entities: object;
    private sprites: object;

    private direction: number;
    private tics: number;
    private currentState: any;
    private x: number;
    private y: number;
    private dx: number;
    private dy: number;
    private objects: any;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
        this.canvas.width = 1024;
        this.canvas.height = 720;
        this.ctx = this.canvas.getContext('2d');

        this.states = states;
        this.entities = entities;
        this.sprites = sprites;

        this.images = {};
        this.objects = {};

        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.tics = 0;
        this.direction = 0;
        this.currentState = this.states[this.entities['pacman'].initState];
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

        const imageNames = Object.keys(sprites);

        const promises = imageNames.map((imageName) => {
            const imageSrc = require(`./${imageName}`);
            return new Promise((resolve) => {
                const image = new Image();
                image.onload = () => {
                    const result = {};
                    result[imageName] = image;
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
        for(const key in this.entities) {
            const entity = this.entities[key];
            entity.x = 0;
            entity.y = 0;
            entity.dx = 0;
            entity.dy = 0;
            entity.tics = 0;
            entity.direction = 0;
            entity.currentState = this.states[entity.initState];
            this.objects[key] = entity;
        }
        console.log(this.objects);
    }

    input(event) {
        const pacman = this.objects['pacman'];
        switch(event.key) {
            case 'ArrowRight': pacman.direction = 0; return;
            case 'ArrowDown': pacman.direction = 1; return;
            case 'ArrowLeft': pacman.direction = 2; return;
            case 'ArrowUp': pacman.direction = 3; return;
        }
        const ghostRed = this.objects['ghost-red'];
        switch(event.key) {
            case 'd': ghostRed.direction = 0; return;
            case 's': ghostRed.direction = 1; return;
            case 'a': ghostRed.direction = 2; return;
            case 'w': ghostRed.direction = 3; return;
        }
    }

    update() {
        for(const key in this.objects) {
            const entity = this.objects[key];
            if(entity.direction === 3) {
                entity.dx = 0;
                entity.dy = -entity.speed;
            } else if( entity.direction === 1) {
                entity.dx = 0;
                entity.dy = entity.speed;
            } else if( entity.direction === 2) {
                entity.dx = -entity.speed;
                entity.dy = 0;
            } else if(entity.direction === 0) {
                entity.dx = entity.speed;
                entity.dy = 0;
            } else {
                entity.dx = entity.dy = 0;
            }

            entity.x += Math.floor(entity.dx);
            entity.y += Math.floor(entity.dy);

            if(entity.tics >= entity.currentState.tics) {
                entity.tics = 0;
                entity.currentState = this.states[entity.currentState.nextState];
            }
            entity.tics++;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for(const key in this.objects) {
            const entity = this.objects[key];
            this.ctx.save();
            this.ctx.translate(entity.x + 25, entity.y + 25); // change origin
            const path = `${entity.currentState.sprite}_${entity.direction}.png`;
            console.log('path = ', path);
            const image = this.images[path];
            this.ctx.drawImage(image, -25, -25,50,50);
            this.ctx.restore();
        }

    }

    step() {
        requestAnimationFrame(this.step.bind(this));
        this.update();
        this.draw();
    }
}

export default Game;