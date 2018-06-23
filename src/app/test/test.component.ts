import { Component, OnInit } from '@angular/core';

import {Grid} from '../../model/grid';
import {Game} from '../../model/game';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title = 'test';
    
  grid = new Grid();
  game = Game.cells;


  constructor() { }
  
  loadGrid(event){
      this.grid.calcPositions();
      for (const key in this.grid.positions) {
          Game.setNewCell(this.grid.positions[key].position, this.grid.positions[key].neighbours);
      }
      console.log(this.game[1]);
  }
  
  startGame(event) {
      Game.start();
  }
  
  stopGame(event) {
      Game.stop();
  }
  

  ngOnInit() {
  }

}
