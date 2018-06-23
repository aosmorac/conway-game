
export class Grid {
    
  x: number;
  y: number;
  total_positions: number;
  positions = Object();
  corners = {
      tl: {
            value: 0,
            name: 'tl',
            description: 'top-left'
        },
      tr: {
            value: 0,
            name: 'tr',
            description: 'top-right'
        },
      bl: {
            value: 0,
            name: 'bl',
            description: 'bottom-left'
        },
      br: {
            value: 0,
            name: 'br',
            description: 'bottom-right'
        },
  };
  grid = Array();  
  
  
  constructor() { 
    this.x = 3;
    this.y = 3;
    this.total_positions = this.x * this.y;
  }
  
  
  
  calcPositions() {
    this.total_positions = this.x * this.y;
    this.corners.tl.value = 0;
    this.corners.tr.value = 0;
    this.corners.bl.value = 0;
    this.corners.br.value = 0;
    this.setPositions();
    this.setCorners();
    this.setLocations();
    this.setNeighbours();
    this.setGrid();
  }
  
  setGrid() {
      var p = 1;
      for ( var j = 0; j < this.y; j++ ) {
          this.grid[j] = Array();
        for ( var i = 1; i <= this.x; i++ ) {
            this.grid[j][i] = p;
            p++;
        }
      }
  }
  
  
  
  setPositions(){
      for ( var i = 1; i <= this.total_positions; i++ ) {
          this.positions[i] = {
              position: i,
              location: '',
              neighbours: Array           
          }   
      }
  }
  
  
  
  setCorners() {
          
      // Set the top-left
      if (this.corners.tl.value == 0) {
          this.corners.tl.value = 1;
      }       
      // Set the top-right
      if (this.corners.tr.value == 0) {
          this.corners.tr.value = this.x;
      }       
      // Set the bottom-left
      if (this.corners.bl.value == 0) {
          this.corners.bl.value = (this.x * this.y)-( this.x-1);
      }       
      // Set the bottom-right
      if (this.corners.br.value == 0) {
          this.corners.br.value = this.x * this.y;
      }   
      
      this.positions[this.corners.tl.value].location = this.corners.tl.name;
      this.positions[this.corners.tr.value].location = this.corners.tr.name;
      this.positions[this.corners.bl.value].location = this.corners.bl.name;
      this.positions[this.corners.br.value].location = this.corners.br.name;
      
  }
  
  setLocations(){
      for ( var i = 1; i <= this.total_positions; i++ ) {
          
        if ( i != this.corners.tl.value && i != this.corners.tr.value && i != this.corners.bl.value && i != this.corners.br.value ){
            
            if ( this.corners.tl.value < i && i < this.corners.tr.value ) { // Set the top-border
                this.positions[i].location = 'tb';
            }else if ( this.corners.tr.value < i && i < this.corners.br.value && i%this.x == 0 ) {    // Set the right-border
                this.positions[i].location = 'rb';
            }else if ( this.corners.bl.value < i && i < this.corners.br.value ) { // Set the bottom-border
                this.positions[i].location = 'bb';
            }else if ( this.corners.tl.value < i && i < this.corners.bl.value && i%this.x == 1 ) {    // Set the left-border
                this.positions[i].location = 'lb';
            }else {
                this.positions[i].location = 'in';
            }
        }
        
      }
  }
  
  
  
  setNeighbours() {
      for ( var i = 1; i <= this.total_positions; i++ ) {
          
          if (this.positions[i].location == 'tl') {  // the neighbours are nr, b and br
              var n = this.positions[i].position;
              var nr = n+1;
              var b = n+this.x;
              var br = b+1;
              this.positions[i].neighbours = [nr, b, br];
          }else if (this.positions[i].location == 'tr') {  // the neighbours are nl, b and bl
              var n = this.positions[i].position;
              var nl = n-1;
              var b = n+this.x;
              var bl = b-1;
              this.positions[i].neighbours = [nl, b, bl];
          }else if (this.positions[i].location == 'bl') {  // the neighbours are nr, t and tr
              var n = this.positions[i].position;
              var nr = n+1;
              var t = n-this.x;
              var tr = t+1;
              this.positions[i].neighbours = [nr, t, tr];
          }else if (this.positions[i].location == 'br') {  // the neighbours are nl, t and tl
              var n = this.positions[i].position;
              var nl = n-1;
              var t = n-this.x;
              var tl = t-1;
              this.positions[i].neighbours = [nl, t, tl];
          }else if (this.positions[i].location == 'tb') {  // the neighbours are nl, nr, b, bl and br
              var n = this.positions[i].position;
              var nl = n-1;
              var nr = n+1;
              var b = n+this.x;
              var bl = b-1;
              var br = b+1;
              this.positions[i].neighbours = [nl, nr, b, bl, br];
          }else if (this.positions[i].location == 'rb') {  // the neighbours are nl, t, tl, b and bl
              var n = this.positions[i].position;
              var nl = n-1;
              var t = n-this.x;
              var tl = t-1;
              var b = n+this.x;
              var bl = b-1;
              this.positions[i].neighbours = [nl, t, tl, b, bl];
          }else if (this.positions[i].location == 'bb') {  // the neighbours are nl, nr, t, tl and tr
              var n = this.positions[i].position;
              var nl = n-1;
              var nr = n+1;
              var t = n-this.x;
              var tl = t-1;
              var tr = t+1;
              this.positions[i].neighbours = [nl, nr, t, tl, tr];
          }else if (this.positions[i].location == 'lb') {  // the neighbours are nr, t, tr, b and br
              var n = this.positions[i].position;
              var nr = n+1;
              var t = n-this.x;
              var tr = t+1;
              var b = n+this.x;
              var br = b+1;
              this.positions[i].neighbours = [nr, t, tr, b, br];
          }else if (this.positions[i].location == 'in') {  // the neighbours are nr, nl, t, tr, tl, b, br and bl
              var n = this.positions[i].position;
              var nr = n+1;
              var nl = n-1;
              var t = n-this.x;
              var tr = t+1;
              var tl = t-1;
              var b = n+this.x;
              var br = b+1;
              var bl = b-1;
              this.positions[i].neighbours = [nr, nl, t, tr, tl, b, br, bl];
          }
          
      }
  }
  
  
}