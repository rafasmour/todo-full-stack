# A Full-Stack Todo Project

This project was created using:
 - MongoDB - for the database
 - NestJS - for the API
 - QuasarJS - for the frontend 
 - mongo-express - for the database administration
 - Docker Compose for the containers/networking
 - Traefik for the reverse proxy

# How does it work?

The application is broken down to five containers. firstly the MongoDB container which hosts the database used to save
the todo tasks. Then comes NestJS providing access to the database through HTTP/HTTPS requests, this enables the 
Quasar app to be able to save progress in the application. Then comes Mongo-express and QuasarJS for the frontend. 
Finally, we have Docker used to run the development enviroment as containers and initializing the webgateway network,
also we use Traefik to run the application in a local domain.

# Prequisites
1. Have Docker compose installed and a traefik image configured to run https
2. Create a webgateway network ```docker network create -d bridge webgateway```
3. Rename .env.test to .env and configure it by adding the needed values
4. Lastly, ```docker compose up -d```

and you should be up and running! 
If you encounter any errors please open an issue!
Thank you for reviewing my repository!

# Author 
 - ##### **[Rafael Mourouzidis](https://github.com/rafabill)**  

 
