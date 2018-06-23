import {Cell} from '../model/cell';


export class Game {
    
    static cells = Object;
    
    static setNewCell (position:number, neighbours: Array<any>){
        Game.cells[position] = new Cell(position, neighbours);
    }
    
    static start() {
        Object.keys(Game.cells).forEach(function(key) {
            Game.cells[key].start();
          });
    }
    
    static stop() {
        Object.keys(Game.cells).forEach(function(key) {
            Game.cells[key].stop();
          });
    }
    
}