# ConwayGame

Run ON Linux (Ubuntu)

$ sudo apt-get update \n
$ sudo apt install docker.io \n
$ git clone https://github.com/aosmorac/conway-game.git \n
$ cd conway-game \n
$ sudo docker build --force-rm -t conway:v1 . \n
$ sudo docker run --name conway -d -p 8084:4200 conway:v1 \n
