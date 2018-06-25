import { Component, OnInit } from '@angular/core';

import {Grid} from '../../model/grid';
import {Game} from '../../model/game';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    
  grid = new Grid();
  game = Game.cells;
  
  refreshed = false;
  running = false;
  first = true;


  constructor() {
      this.loadGrid();
  }
  
  loadGrid(){
      this.grid.calcPositions();
      for (const key in this.grid.positions) {
          Game.setNewCell(this.grid.positions[key].position, this.grid.positions[key].neighbours);
      }
      this.refreshed = true;
      this.running = false;
  }
  
  startGame() {
      this.first = false;
      this.running = true;
      Game.start();
  }
  
  stopGame() {
      this.running = false;
      Game.stop();
  }
  
  loadGridBtn(event){
      this.loadGrid();
  }
  
  startGameBtn(event) {
      this.startGame();
  }
  
  stopGameBtn(event) {
      this.stopGame();
  }
  

  ngOnInit() {
  }

}
