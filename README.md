# Elekey Coresystem

## Start the server

Before you start the server, make sure you start your SteVe
instance locally, under port *8180*.

### In container

1. Run `./gradlew jibDockerBuild`
    - This will build a Docker image of the server and add it
   to the local Docker Repository
    - Run this whenever you make code changes to update the 
   image 
2. Run `docker compose up` to start the container
   - Inside the *docker-compose.yml* file, you may change 
    the **ENV_TIMESLOT_LENGTH** environment variable
3. Open [http://localhost:8080](http://localhost:8080) in 
your browser access the web client

### In web client development mode

Start the server in this manner if you want the web client
to automatically refresh on web client code changes or if the 
container method fails.

#### Start the server process
1. (Optional) Set the **ENV_TIMESLOT_LENGTH** environment variable
   - `export ENV_TIMESLOT_LENGTH=15` for Linux
   - `set ENV_TIMESLOT_LENGTH=15` for Windows
2. Run `./gradlew bootRun` to start the server process
   - The server will run under *localhost:8080*

#### Start the web client process
1. Open the *./angularclient* directory in a new terminal 
2. Run `ng serve` to start the web client process
3. Open [http://localhost:4200](http://localhost:4200) in
   your browser access the web client