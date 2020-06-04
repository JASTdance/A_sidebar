# Soundwave Music - Related Tracks Module

![Picture of Landing Page](https://sdc-alex-images.s3-us-west-2.amazonaws.com/SoundwaveLanding.webp)

## Overview

> Soundwave Music is a streaming music service with Active Display, Active Player, Related Tracks, and Information & Comments modules.
This repo is for the Related Tracks module.

### Team Members

* Alex Cravalho - [alexcravalho](https://github.com/alexcravalho) (this is Me) - Related Tracks Module
* Jeehyae Dance - [JeehyaeDance](https://github.com/JeehyaeDance) - Active Player Module
* Selam Gessese - [sygessese](https://github.com/sygessese) - Information and Comments Module
* Thomas Johnson - [thomasij813](https://github.com/thomasij813) - Active Display Module

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
* [K6](https://k6.io/docs/getting-started/installation)
* PostgreSQL

First, navigate to the local directory where you want to host the service.

Next, access the service by cloning the Github repository:

```
$ git clone https://github.com/SoundwaveMusic/related-tracks.git
```

### Installing

Navigate inside the directory: 'related-tracks' and run the following commands:

```
$ npm install
$ npm run production
```
You must also seed the PostgreSQL database locally. To do this complete the following instructions:

#### Create a PostgreSQL database locally

> Note: Make sure you have [PostgreSQL](http://postgresguide.com/setup/install.html) installed on your machine to continue.

* After installation of PostgreSQL, take a look at the **postgres.sql** file in the root of the project directory
  > This file is a reference for the commands you will need to create the Postgres database
* Log in to the psql shell with the user and password you made when you installed PostgreSQL
* Type the following commands into the psql shell in this order:
  ```
  $ CREATE DATABASE soundwave;
  $ \c soundwave;

  $ CREATE TABLE song_info(
    song_id serial PRIMARY KEY,
    title VARCHAR(100),
    times_played INT,
    reposts INT,
    comments INT,
    likes INT,
    song_picture_url VARCHAR(250),
    artist_name VARCHAR(100),
    artist_followers INT,
    artist_picture_url VARCHAR(250)
    );

  $ CREATE TABLE related_tracks(
    id serial PRIMARY KEY,
    song_id INT,
    related_song_id INT
    );
  ```
> These commands should create a database named soundwave, use the database, and create the appropriate tables.

* You can now exit the psql shell and continue in the terminal

#### Create a reference.js file

1. Navigate to the *database* directory from the project root directory
2. Rename **reference.example.js** to **reference.js**
3. Edit the file to include your psql username and password instead of the example password

This will allow the application to connect to your created postgres database

#### Seed the Database
1. Navigate to the project root directory in the terminal
2. Use the Data Generation scripts to create the data for Postgres
  ```
  $ node writeRelated.js
  ```
  > This will create a .csv for the related_tracks table
  ```
  $ node writeSong.js
  ```
  > This will create a .csv for the song_info table

3. Use these commands to import the data from the newly created Data files into Postgres
  * First login to the psql shell with same user and password as before. Make sure to use the soundwave database. Run these commands from psql:
  ```
  $ COPY related_tracks(song_id, related_song_id) FROM '{project root dir}/ten-million-related.csv' DELIMITER '|';
  $ COPY song_info(title, times_played, reposts, comments, likes, song_picture_url, artist_name, artist_followers, artist_picture_url) FROM '{project root dir}/ten-million-songs.csv' DELIMITER '|';
  ```
  > Note {project root dir} in the above commands should be replaced with the local project root directory.
  * You should see a "database complete" message in your terminal.

4. Add indexes and foreign keys to speed up queries

  * Make sure you are still logged in to the psql shell with the "soundwave" database
  * Run the following commands in the psql shell (this might take a few minutes):
  ```
  $ ALTER TABLE related_tracks ADD CONSTRAINT fk_related_tracks_song_info FOREIGN KEY (related_song_id) REFERENCES song_info (song_id);
  $ CREATE INDEX related_tracks_song_id_idx ON related_tracks(song_id);
  $ CREATE INDEX related_tracks_related_song_id_idx ON related_tracks(song_id);
  ```
> Now you can query the data from Postgres optimally

### To Use Application
* Now you can start the application on [localhost:3000](http://localhost:3000/?id=1) by typing the following command:
  ```
  $ npm start
  ```
  * To retrieve Related Tracks for a specific song in the database use this format:
    > http&#58;//localhost:3000/?id=2000
  * 3000 refers to the server port and 2000 refers to the song's id number. Try changing the id number between 1 and 10 million.

Here is an example of what this module looks like:

![Soundwave Gif](https://alexcravalho-portfolio.s3-us-west-2.amazonaws.com/Soundwavedemo.gif)

## Stress Testing

### Local Stress Testing

To stress test my system locally I used [K6](https://k6.io/docs/test-types/stress-testing). The test I used gradually increased from 1 to 500 virtual users over one minute. Each virtual user makes 1 request per second.

* First make sure [K6](https://k6.io/docs/getting-started/installation) is installed on your machine if you want to run the stress test locally.

To stress test the system run the following command in the project root directory:
  ```
  $ npm run stress-test
  ```

Below is an example output of the test:

![K6 Example](https://sdc-alex-images.s3-us-west-2.amazonaws.com/K6-example.webp)

### Cloud Stress Testing

To run Loader.io stress testing suites yourself, you will have to deploy the app and create your own tests at Loader.io. To use Loader.io, visit their website: [Loader.io](https://loader.io/)).

Originally I deployed this application using AWS EC2 instances for the database, load balancer, and the microservice. After I deployed the app and the PostgreSQL database to AWS EC2 instances, I seeded the database with over 50 million records then began stress testing with Loader.io to measure performance increases. I ran stress tests that simulate real world web traffic, meaning that some of requests to the database would be cached and some would not. The results are shown below. The average response time remained under 120 ms until 800 rps and the app maintained a 0% error rate until 900 rps.

![Stress Test 800rps](https://sdc-alex-images.s3-us-west-2.amazonaws.com/stress-test-800.webp)
![Stress Test 900rps](https://sdc-alex-images.s3-us-west-2.amazonaws.com/stress-test-900.webp)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Acknowledgments

* Thanks to [Joshua Elder](https://www.linkedin.com/in/jcelder/) for his support and tips throughout design, implementation and stress testing.
* Another thanks to my fantastic team who worked so hard on this application!