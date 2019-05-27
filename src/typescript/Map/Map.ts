// import mapData from './MapData';
// import spritesheetData from '../../assets/readyImages/map/renamed-custom/map-spritesheet';
// //#0a46a7
// //https://www.piskelapp.com/p/agxzfnBpc2tlbC1hcHByEwsSBlBpc2tlbBiAgKCgrKzICAw/edit
// //https://www.leshylabs.com/apps/sstool/
// class Map {
//     private readonly mapData;
//
//     constructor(mapData) {
//         console.log("mapConstructor");
//         this.mapData = mapData;
//     }
//
//     draw () {
//         const canvas = <HTMLCanvasElement>document.getElementById("canvas");
//         canvas.width = 1000;
//         canvas.height = 1000;
//         let ctx = canvas.getContext("2d");
//         ctx.fillStyle = "black";
//         ctx.fillRect(0,0,1000, 1000);
//         const image = new Image();
//         image.src = "./src/assets/readyImages/map/renamed-custom/map-spritesheet.png";
//         let y = 0;
//         image.onload = () => {
//             mapData.forEach((mapElement, index) => {
//                 console.log(mapElement)
//                 if(index % 28 === 0 && index > 0) {
//                     y+= 32;
//                 } else {
//                     //console.log('index = ', index)
//                 }
//                 console.log(y)
//                 let spritesheetElement = this.getSpriteSheetElement(mapElement[0]);
//                     ctx.drawImage(
//                         image,
//                         spritesheetElement.x,
//                         spritesheetElement.y,
//                         32,
//                         32,
//                         (index%28)*32,
//                         y,
//                         32,
//                         32 );
//             })
//         }
//     }
//
//     getSpriteSheetElement (fileName) {
//         return spritesheetData.find(({name}) => name === fileName);
//     }
// }
// export default Map;