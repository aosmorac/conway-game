# ConwayGame

Run ON Linux (Ubuntu)

$ sudo apt-get update
$ sudo apt install docker.io
$ git clone https://github.com/aosmorac/conway-game.git
$ cd conway-game
$ sudo docker build --force-rm -t conway:v1 .
$ sudo docker run --name conway -d -p 8084:4200 conway:v1
