FROM ubuntu:16.04
MAINTAINER Abel Moreno <moreno.abel@gmail.com>

WORKDIR /test

RUN apt-get -y update; apt-get clean all
RUN apt-get -y install nodejs; apt-get clean all
RUN apt-get -y install npm; apt-get clean all
RUN apt-get -y install curl; apt-get clean all
RUN apt-get -y install python-software-properties; apt-get clean all
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get -y install nodejs; apt-get clean all
RUN apt-get -y install git; apt-get clean all 
RUN npm install -g @angular/cli

ADD . /test

RUN cd /test; npm install;   

EXPOSE 4200


CMD ng serve --host 0.0.0.0
