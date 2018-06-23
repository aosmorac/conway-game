import { Component, OnInit } from '@angular/core';

import {Grid} from '../../model/grid';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  title = 'test';
    
  grid = new Grid();

  constructor() { }
  
  refresh(event){
      this.grid.calcPositions();
  }

  ngOnInit() {
  }

}
