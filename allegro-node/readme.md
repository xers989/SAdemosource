## Allegro Web application API Server

### Architecture
This API server is running on NodeJS and It provide CRUD function on Atlas MongoDB.
To run this application server you need to have Atlas MongoDB or install mongoDB on your server.
Here is running Atlas MongoDB
https://www.mongodb.com/cloud/atlas/register


### Atlas MongoDB
Login to Atlas and create cluster (You can create 2 clusters for free)
After creation of cluster, you can get the connection link.
![Atlas Connection](/images/image3.png)   
Choose a connection method.
![Atlas Connection](/images/image4.png)
Now you can connection URL, so copy the address and close the window.
![Atlas Connection](/images/image5.png)   

### Atlas Access
To create database user, go to atlas console page and click Database Access.
Click + Add new database user.
![Access database User](/images/image6.png)   
Select Password as Authentication Method, and then set up the password.
User Privileges is need to read and write to any database.

To connect the database, you have to also add IP address in Network Access.
Click Network Access and add IP Address.
![Access database User](/images/image7.png) 
You have to add the server IP address (allegro-node server IP address).
This is not private IP, if you don't know your public IP address, open google and type "my ip".
Type the IP address on Access List Entry. You can use CIDR format.
![Access database User](/images/image8.png) 

### NPM 
Clone the allegro-node and install modules
``` bash
$ npm i express, morgan, dotenv, nunjucks, mongoose, cors
$ npm i -D nodemon
```
If you don't have nodeJS, you can get NodeJS following link
https://nodejs.org/en/download/
I tested this on Node 14.17.0 and NPM 6.14.13
If you install NodeJS, NPM is included on NodeJS.

### Setting Atlas Connection
To set up connection, you need to create .env file first.
Don't upload .env file to github. It has password to connect 
create file .env    
``` bash
$ touch .env
$ vi .env
PASSWORD=<<YOUR PASSWOR>
ATLAS=<<YOUR Atlas connection string>>
```


### Start Express API Server
$ npm start