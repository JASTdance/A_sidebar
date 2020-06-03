# Soundwave Music - Related Tracks Module

![Picture of Landing Page](https://sdc-alex-images.s3-us-west-2.amazonaws.com/SoundwaveLanding.webp)

## Overview

> Soundwave Music is a streaming music service with Active Display, Active Player, Related Tracks, and Information & Comments modules.
This repo is for the Related Tracks module.

### Team Members

1. Alex Cravalho - [alexcravalho](https://github.com/alexcravalho) (this is Me) - Related Tracks Module
2. Jeehyae Dance - [JeehyaeDance](https://github.com/JeehyaeDance) - Active Player Module
3. Selam Gessese - [sygessese](https://github.com/sygessese) - Information and Comments Module
4. Thomas Johnson - [thomasij813](https://github.com/thomasij813) - Active Display Module

### Related Tracks Module Authors

* Rahim Laiwalla - [rahimlaiwalla](https://github.com/rahimlaiwalla) - Designed and Built the Front-End and UI.
* Alex Cravalho - [alexcravalho](https://github.com/alexcravalho) (this is Me)
  * Reformatted and refactored request handling in front end
  * Completely replaced, then scaled the back end of the application to handle over 50 million records
  * Rewrote Legacy Code in back end to use Postgres column indexing leading to a reduction in query time from 3 minutes to less than 20 ms
  * Implemented local and cloud stress testing and achieved 0% error rate with 900 rps.

### Technologies

* [Node/Express](https://expressjs.com/) - Used to implement back end and serve the application
* [Apache Cassandra](https://cassandra.apache.org/) - Database compared to PosgreSQL during system design
* [PostgreSQL](https://www.postgresql.org/) - Database for this application
* [AWS EC2/](https://aws.amazon.com/ec2/)[S3](https://aws.amazon.com/s3/) - Deployed on EC2 with T2.micro and T2.small instances and hosted images from S3
* [K6](https://k6.io/) - Stress tested system locally
* [Loader](https://loader.io/) - Stress tested system deployed to AWS
* [Trello](https://trello.com/) - Used for workflow management and ticketing
* [New Relic](https://newrelic.com/) - Middleware used to monitor stress tests and provide additional data

## Getting Started

**Prerequisites**
> To run this application on your machine you will need the following installed:
* Git
* Node.js
* npm

First, navigate to the local directory where you want to host the service.

Next, access the service by cloning the Github repository:

```
$ git clone https://github.com/JASTdance/related-tracks.git
```

### Installing

Navigate inside the directory: 'related-tracks' and run the following commands:

```
$ npm install
$ npm run production
```
You must also seed the PostgreSQL database locally. To do this complete the following instructions:

* Use Node to run the local sql file
  ```
  $ node postgres.sql
  ```
> This will create the database in psql

#### Create a reference.js file

1. Navigate to the *database* directory from the project root directory
2. Rename **reference.example.js** to **reference.js**
3. Edit the file to include your psql password instead of the example password

This will allow the application to connect to your created postgres database

#### Seed the Database
1. Navigate to the project root directory in the terminal
2. Use the Data Generation scripts to create the data for Postgres
  ```
  $ node writeRelated.js
  ```
  - This will create a .csv for the related_tracks table
  ```
  $ node writeSong.js
  ```
  - This will create a .csv for the song_info table

3. Use the provided postgres.sql to create the database and tables for Postgres
  - Type the following command into the terminal
  ```
  $ node postgres.sql
  ```
4. Use these commands to import the data from the newly created Data files into Postgres
  ```
  $ COPY related_tracks(song_id, related_song_id) FROM '{project root dir}/ten-million-related.csv' DELIMITER '|';
  $ COPY song_info(title, times_played, reposts, comments, likes, song_picture_url, artist_name, artist_followers, artist_picture_url) FROM '{project root dir}/ten-million-songs.csv' DELIMITER '|';
  ```
  - Note {project root dir} in the above commands should be replaced with the local project root directory.
  - You should see a "database complete" message in your terminal.

5. Add indexes and foreign keys to speed up queries

  - login to the psql shell with the "soundwave" database
  - Run the following commands in the psql shell (this might take a few minutes):
    ```
  $ ALTER TABLE related_tracks ADD CONSTRAINT fk_related_tracks_song_info FOREIGN KEY (related_song_id) REFERENCES song_info (song_id);
  $ CREATE INDEX related_tracks_song_id_idx ON related_tracks(song_id);
  $ CREATE INDEX related_tracks_related_song_id_idx ON related_tracks(song_id);
  ```
> Now you can use the application optimally

### To Use Application
* Now you can start the application on [localhost:3000](http://localhost:3000/?id=1) by typing the following command:
  ```
  $ npm start
    ```
  - To retrieve Related Tracks for a specific song in the database use this format:
    > http://localhost:3000/?id=2000
  - 3000 refers to the server port and 2000 refers to the song's id number. Try changing the number between 1 and 10 million.

Here is an example of what the application looks like:

![Soundwave Gif](https://alexcravalho-portfolio.s3-us-west-2.amazonaws.com/Soundwavedemo.gif)
