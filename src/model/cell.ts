import {Game} from '../model/game';

export class Cell {
    
    status: boolean;
    position = 0;
    neighbours: Array<any>;
    running = false;
    time = 500;
    
    
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
    
    isAlive() {
        return this.status;
    }
    
    kill() {
        this.status = false;
    }
    
    revive(){
         this.status = true;
    }
    
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