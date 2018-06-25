import {Game} from '../model/game';

/**
 * Cell Class
 * 
 * It is the class where is the behavior of a cell in Conway's Game of Life
 * 
 * The methods are:
 * 
 * constructor();
 * isAlive();
 * kill();
 * revive();
 * changeStatus();
 * run();
 * start();
 * stop();
 */

export class Cell {
    
    status: boolean;    // status of the cell (alive or dead)
    position = 0;   // position of the cell in a grid
    neighbours: Array<any>; // Array with the neighbours positions
    running = false;    // Status to know if its running in the game
    time = 500;     // Default time for run status update
    
    
    /**
     * Initioalize position, neighbours and status
     * In this case the status (aliver or dead), is random
     */
    constructor(position:number, neighbours: Array<any>) { 
        this.position = position;
        this.neighbours = neighbours;
        var rand = Math.floor(Math.random() * 2); 
        if (rand == 0) {
            this.status = false;
        }else {
            this.status = true;
        }
    }
    
    /**
     * Return the status value
     */
    isAlive() {
        return this.status;
    }
    
    /**
     * Set false the status value (set dead)
     */
    kill() {
        this.status = false;
    }
    
    /**
     * Set true the status value (set alive)
     */
    revive(){
         this.status = true;
    }
    
    /**
     * Count how many alive neighbours are and how many dead are
     * Then according to the games rules set status alive or dead
     * 
     * Rules
     * 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
     * 2. Any live cell with two or three live neighbours lives on to the next generation.
     * 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
     * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     * 
     */
    changeStatus(){
        var alive = 0;
        var dead = 0;
        this.neighbours.forEach(function(element) {
            if ( Game.cells[element].isAlive() ) {
                alive++;
            }else{
                dead++;
            }
        });
        if ( this.isAlive() ) {
            if ( alive < 2 ) {
                this.kill();
            }else if ( alive < 4 ) {
                this.revive();
            }else if ( alive > 3 ) {
                this.kill();
            }
        }else {
            if ( alive == 3 ) {
                this.revive();
            }
        }
    }
    
    /**
     * Check and change its status
     */
    run() {
        if ( this.running ){
            this.changeStatus();
            setTimeout(() => {
                this.run();
              }, this.time);
        }
    }
    
    start() {
        this.running = true;
        this.run();
    }
    
    stop() {
        this.running = false;
    }
    
}