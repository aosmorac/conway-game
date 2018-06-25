import {Cell} from '../model/cell';

/**
 * Game Class
 * 
 * Manage the Conway's Game
 * 
 * The methods are:
 * 
 * setNewCell();
 * start();
 * stop;
 * 
 */
export class Game {
    
    static cells = Object;  // All the cells acording to the columns and rows defined
    
    /**
     * Add a new cell to the game. The cell has to have a position and a newighbours array
     */
    static setNewCell (position:number, neighbours: Array<any>){
        Game.cells[position] = new Cell(position, neighbours);
    }
    
    /**
     * Start to run each cells
     */
    static start() {
        Object.keys(Game.cells).forEach(function(key) {
            Game.cells[key].start();
          });
    }
    
    /**
     * Stop to run each cell
     */
    static stop() {
        Object.keys(Game.cells).forEach(function(key) {
            Game.cells[key].stop();
          });
    }
    
}