/**
 * Grid Class
 * 
 * It is where the grid got structured and ordered
 * 
 * The methods are:
 * 
 * constructor();
 * setGrid();
 * calcPositions();
 * setPositions();
 * setCorners();
 * setLocations();
 * setNeighbours();
 */
export class Grid {
    
  x: number;    // Number of columns
  y: number;    // Number of rows
  total_positions: number;  // Number total of positions
  positions = Object(); // Object with positions
  //    corners are the definition of corners in the grid, the calue of coorners can change according to x and y
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
  grid = Array();  // Array with the real organization of the grid
  
  
  /**
   * Initialize x, y and calc the total of cells
   */
  constructor() { 
    this.x = 20; // Default number of columns
    this.y = 10; // Default number of rows
    this.total_positions = this.x * this.y; // Total number of cells
  }
  
  /**
   * Build the structure of the grid. It is useful for a fast view of the structure and cand render the grid
   * 
   */
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
  
  /**
   * Set the information for each position. For each position is importan:
   * 1. Can find the element with the index position
   * 2. Know any neighbours
   */
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
  
  
  /**
   * Initialize each position. The info for each position is:
   * 1. Index. It must be the same number than its position number for help to find it 
   * 2. Position. It is the number of the position
   * 3. location. There are 9 different kinds of location (4 different corners, 4 different kinds of border and the Internals cells)
   * 4. Neighbours. The amount of neighbours change acoording with the location kind (coners have 3, borders have 5 and internals have 8)
   */
  setPositions(){
      for ( var i = 1; i <= this.total_positions; i++ ) {
          this.positions[i] = {
              position: i,
              location: '',
              neighbours: Array           
          }   
      }
  }
  
  
  /**
   * Set the location to the positions where are corners
   * 1. The corner 1 is always 1
   * 2. The corner 2 is always x
   * 3. The corner 3 is (x*y)-(x-1)
   * 4. The corner 4 is x*y
   */
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
  
  /**
   * Set the location for the positions different to corners
   * 1. Top border is the positions between top-left corner and top-right corner
   * 2. Right border is the positions between top-right corner and bottom-right corner where i%x==0
   * 3. Border bottom is the position between bottom-left corner and bottom-right corner
   * 4. Left border is the positions between top-left corner and bottom-left corner where i%x==1 
   * 5. Internal cells are the cells that are not corners and are not border either
   */
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
  
  
 /**
  * Build the neighbour array acording to the position number and location kind.
  */ 
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