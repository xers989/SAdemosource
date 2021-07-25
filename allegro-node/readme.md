## Allegro Web application API Server

### Feature and components
This API server is running on NodeJS and it provides CRUD function on document database.    
Therefore, NodeJS and document database are required to run this API Server. There is option to use document database, You can choose MongoDB on-premise or Atlas MongoDB. In this demo I will use Atlas MongoDB that is managed database cloud service. So, it is easy to provision database instance.    
Here is how to provision the Atlas MongoDB   
https://www.mongodb.com/cloud/atlas/register   


In terms of NodeJS, you can download from nodejs site.    
https://nodejs.org/en/download/    
I recommend using the latest version (+14.17.0). If you install NodeJS, npm (Node Package Manager) is also included in the package.   
The API server doesn't have authentication and authorization feature to protect API. If you want to protect the API end-point, API gateway can be deployed in front of the API-server.  

### Atlas MongoDB
If you have Atlas account, you can create MongoDB cluster.   
Login to Atlas web console and create cluster (You can create 2 clusters for free)   
After creation of cluster, you can get the connection link.   
![](/images/allegro-node/image3.png){:width="70%"}   


Choose a connection method.   
![Atlas Connection](/images/allegro-node/image4.png){: width="90%" height="90%"}   

Now you can connection URL, so copy the address and close the window.   
![Atlas Connection String](/images/allegro-node/image5.png){: width="90%" height="90%"}   

### Atlas Access
To create database user, go to atlas console page and click Database Access.   
Click + Add new database user.   
![Access database User](/images/allegro-node/image6.png)   
Select Password as Authentication Method, and then set up the password.   
User Privileges is need to read and write to any database.   


To connect the database, you have to also add IP address in Network Access.   
Click Network Access and add IP Address.   
![Access database User](/images/allegro-node/image7.png)  
You have to add the server IP address (allegro-node server IP address).   
This is not private IP, if you don't know your public IP address, open google and type "my ip".   
Type the IP address on Access List Entry. You can use CIDR format.   
![Access database User](/images/allegro-node/image8.png)  


### Create Database and Insert Sample Data on collection
Log in to Atlas console and create database.   
To create Database, click Databases and click + Create Database.   
![Access database User](/images/allegro-node/image9.png)   

Next is create collection in the database.   
Select the database you created, click "+" button on the database.   
Set Collection name as ship.   
![Access database User](/images/allegro-node/image10.png)   

Insert sample Document   
There are two tenant Hanjin and HMM.  
Each tenant has 3 ship information.   
Select collection ship that you created, and click insert document button.   
![Access database User](/images/allegro-node/image11.png)  

```JSON
{"tenant":"Hanjin","ship":"HJ-1","type":"Container ships","weight":{"size": 90000,"standard":"ton"},"fuel":{"averagespeed":25,"milespergallon":560,"fullyloaded":4},"capacity":{"average":22000}}
{"tenant":"Hanjin","ship":"HJ-2","type":"Container ships","weight":{"size":100000,"standard":"ton"},"fuel":{"averagespeed":23,"milespergallon":480,"fullyloaded":3},"capacity":{"combined":55000,"average":28000}}
{"tenant":"Hanjin","ship":"HJ-3","type":"Container ships","weight":{"size":150000,"standard":"ton"},"fuel":{"averagespeed":18,"milespergallon":350,"fullyloaded":2.5},"capacity":{"combined":85000,"average":48000}}
{"tenant":"HMM","ship":"HMM-1","type":"Container ships","weight":{"size":100000,"standard":"ton"},"fuel":{"averagespeed":20,"milespergallon":576,"fullyloaded":4.5}}
{"tenant":"HMM","ship":"HMM-2","type":"General cargo vessels","weight":{"size":50000,"standard":"ton"},"fuel":{"averagespeed":25,"milespergallon":750,"fullyloaded":6.5}}
{"tenant":"HMM","ship":"HMM-3","type":"Dry bulk carriers","weight":{"size":80000,"standard":"ton"},"fuel":{"averagespeed":30,"milespergallon":830,"fullyloaded":7}}
```

### NPM 
Clone the allegro-node and install modules
Here is the git URL   
https://github.com/xers989/SAdemosource.git    

Here is directoris and files structure. 
``` bash
allegro-node $ tree
.
├── app.js
├── package.json
├── readme.md
├── routes
│   ├── aggregation.js
│   ├── cargoships.js
│   └── index.js
└── schemas
    ├── cargoship.js
    └── index.js
```
app.js is main node script and in routes folder, there are express router node scripts.
MongoDB connection information is in /schemas/index.js and /schemas/cargoship.js has definition about collection of ship.   

To run the the API server, you need to install required modules.  
``` bash
allegro-node $ npm i express morgan dotenv nunjucks mongoose cors
allegro-node $ npm i -D nodemon
```
If you don't have nodeJS, you can get NodeJS following link   
https://nodejs.org/en/download/   
I tested this on Node 14.17.0 and NPM 6.14.13   
If you install NodeJS, NPM is included on NodeJS.   

### Setting Atlas Connection
To set up connection, you need to create .env file first.   
The .env file has to be created under allegro-node directory.   
Don't upload .env file to github. It has password to connect.      
create file .env    
You can get all information from your atlas connection string
``` bash
allegro-node $ touch .env
allegro-node $ vi .env
PASSWORD=<<YOUR PASSWORD>>
ATLAS=<<YOUR Atlas connection string>>
USERID=<<YOUR Atlas DB User>>
DATABASE=<<YOUR Atlas Database Name>>
```
For example if you connection string is mongodb+srv://johndoe:<password>@allegro.abcd.mongodb.net/atlasdatabase?retryWrites=true&w=majority   
ATLAS is allegro.abcd.mongodb.net   
DATABASE is atlasdatabase   
USERID is johndoe   

### Start Express API Server
Now, it's time to run the server
You can run the application in allegro-node diretory (Where is package.json exists)
``` bash
allegro-node $ npm start
% npm start    

> vessal-node@1.0.0 start /*****/allegro-node
> nodemon app

[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
3002  is waiting to connect
(node:25642) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
(Use `node --trace-warnings ...` to show where the warning was created)
DB connection success
```
If you get DB connection success message, the API server is running successfully.   


### REST API Test
It time to test the server is running properly. To test the API, you need REST API tool.   
If you don't have it, use postman.  
Here is download link.   
https://www.postman.com/downloads/

Launch Postman and type following address and then click send button to get information.   
http://localhost:3002/cargoship/Hanjin  
That is enquery ship information belongs to Hanjin.   

![Access database User](/images/allegro-node/image12.png)  

Here is curl string to test in Linux OS.   
```bash
$ curl --location --request GET 'http://localhost:3002/cargoship/Hanjin' \
--header 'Content-Type: application/json'
[{"weight":{"size":90000,"standard":"ton"},"fuel":{"averagespeed":25,"milespergallon":560,"fullyloaded":4},"capacity":{"average":22000},"_id":"60e6f72c8e726694c050da27","tenant":"Hanjin","ship":"HJ-1","type":"Container ships"},{"weight":{"size":100000,"standard":"ton"},"fuel":{"averagespeed":23,"milespergallon":480,"fullyloaded":3},"capacity":{"combined":55000,"average":28000},"_id":"60e6f72c8e726694c050da28","tenant":"Hanjin","ship":"HJ-2","type":"Container ships"},{"weight":{"size":150000,"standard":"ton"},"fuel":{"averagespeed":18,"milespergallon":350,"fullyloaded":2.5},"capacity":{"combined":85000,"average":48000},"_id":"60e6f72c8e726694c050da29","tenant":"Hanjin","ship":"HJ-3","type":"Container ships"}]
```
All API list is following  
GET /cargoship/:tenant/:ship   
ship is option   

POST /cargoship   
Body is json document   
Sample is 
```json
{
    "type": "Container ships",
    "weight": {
        "size": 100000,
        "standard": "ton"
    },
    "fuel": {
        "averagespeed": 23,
        "milespergallon": 480,
        "fullyloaded": 3
    },
    "capacity":
    {
        "combined": 55000,
        "average": 28000
    },
    "tenant": "Hanjin", "ship": "HJ-4"
}
```

DELETE /cargoship/:tenant/:ship   
tenant and ship are mandetory   

PATH  /cargoship/:tenant/:ship   
tenant and ship are mandetory   
Body is json document   
Sample is  
```json
{
    "type": "Container ships",
    "weight": {
        "size": 100000,
        "standard": "ton"
    },
    "fuel": {
        "averagespeed": 23,
        "milespergallon": 480,
        "fullyloaded": 3
    },
    "capacity":
    {
        "combined": 55000,
        "average": 28000
    }
}
```


### Running Express API Server background 
There is PM2 module which is control npm.   
That module has to be install in global.   
Here is install command. 
```bash  
allegro-node $ sudo npm install pm2 -g
```

Running the node server in backgroud   
```bash
allegro-node $ pm2 --name <<background-process name>> start npm -- <<npm script>>
```
![Access database User](/images/allegro-node/image13.png) 

You can search the process by 
```bash
$ pm2 ps
```

Also to stop the process by
```bash
$ pm2 delete <<id>>
```

If you want to see server log of the Allegro-node, type this.
```bash
$ pm2 logs
```
