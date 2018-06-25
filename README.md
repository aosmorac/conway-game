# ConwayGame

Run ON Linux (Ubuntu)

$ sudo apt-get update <br>
$ sudo apt install docker.io <br>
$ git clone https://github.com/aosmorac/conway-game.git <br>
$ cd conway-game <br>
$ sudo docker build --force-rm -t conway:v1 . <br>
$ sudo docker run --name conway -d -p 8084:4200 conway:v1 <br>

## Main Module

/app/test/
/app/test/app.component.ts

## Main Code
/model

### Grid Class

/model/grid.ts

### Cell Class

/model/cell.ts

### Game Class

/model/game.ts
