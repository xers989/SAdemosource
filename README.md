# Atlas MongoDB Demo

## 1. SaaS Application Demo
Allegro demo is consist of middleware and web UI.   
Middleware (API server) is running on NodeJS with mongoose modules (Allegro-node)   
Web UI is based on Vue.js (Allegro-saas)   
<img src="/images/image1.png" width="70%" height="70%">    

### Demo Scenario
#### Required Project
To do this demo, you need to deploy allegro-node and allegro-saas projects.   

#### Tenant Concept
It has tenancy concept, there are two tenant ("HMM", "Hanjin"). This application is providing management of cargoship. So, each tenant can save their own cargoship information.  
HMM manages their ship information with weight and fuel, also Hanjin manages ship with weight, fuel, and capacity.   
<img src="/images/image3.png" width="90%" height="90%">     

In login page there is tenant field and you can choose one of them. At this time Authentication is not implemented, so you can login with out Email and Password. You can extend authentication.   
<img src="/images/image4.png" width="70%" height="70%">      

If you login with Hanjin, you can retrieve Hanjin's ship information.   
<img src="/images/image5.png" width="80%" height="80%">   
Click edit button on ship information, then you can see there is capacity information.   
<img src="/images/image6.png" width="80%" height="80%">   

#### CRUD functions
This web application provides edit and delete action, you can do click icon in Actions column. 
<img src="/images/image6.png" width="80%" height="80%">   

If you  click New button, you can create new ship information.
<img src="/images/image7.png" width="80%" height="80%">   
Each tenants can manage their own ship's properties.

#### Aggregation function
MongoDB also provides aggregation features like RDBMS (group or having).   
Aggregation of Size, Speeed and Miles per gallon is implemented, making a group in your tenant and calculate sum and averge.
Click button on top.
<img src="/images/image8.png" width="80%" height="80%"> 

## 2. One source multi use Demo
This is chatbot demo which is used Oracle Digital Assistant and Slack.   
Chatbot is working with existing middleware (API server - node_server)  
Chatbot source is on Allegro-bot   
Integration source between chatbot and API server is in digitalAssistant   
<img src="/images/image2.png" width="90%" height="90%">    

### Demo Scenario
#### Required Project
To do this demo, you need to deploy allegro-node, digitalAssistant and allegro-bot projects.   

#### Luanching Slack
Launching Slack with your ID, and you can see allegro-bot is on Apps category.   
Click allegro-bot and start converstion, type what you want to know about cargo ship.  
The question has to include "cargo" and the intension would be wondering about cargo ship list.
For example "I'm wondering about cargoship list." is good. 
If the bot recognize your intension,then it will answer the question.(Bot is AI based and it doesn't recognize too complicated question.)   
The cargoship information is list value, so it is displayed vertical card type.   
<img src="/images/allegro-bot/image30.png" width="70%" height="70%">       

Click details of what you want to see in the ship list.   
Then you can see detail information of the selected ship.   
<img src="/images/allegro-bot/image31.png" width="70%" height="70%">       

If you want to delete the ship information, click delete button.   
<img src="/images/allegro-bot/image32.png" width="70%" height="70%">       

Then, type again to retrieve the cargoship list.    
Type "Cargo ship list, please"   
The selected ship information is not in the result.   
<img src="/images/allegro-bot/image33.png" width="70%" height="70%">       

Click Cancel button to stop conversation.


## 3. Synchronize data in mobile demo
In Atlas, there is mobile backend service. It provides synchronize data between mobile and Atlas. (It provides also functions, triggers and etc for mobile application)    
Using mobile application in business is increased, however it doesn't have enough data space and low connection, we sometimes have difficulties to use it.   
The realm is providing mobile database for mobile application. So, you can store data in the database that you need to save space. Also, auto synchronization between origin data in Atlas and mobile database.  
Here is story, when cargo ship arrives harbor, many containers are unloaded into yard in the harbor. Employees in the habor needs to verify the position of the containers. Allegro-mobile is providing features that the position data is uploaded into Atlas container collection.   
<img src="/images/allegro-mobile/image1.png" width="90%" height="90%">    

### Demo Scenario
#### Required Project
To do this demo, you need to deploy allegro-mobile project.   

#### Launching Allegro
Login in into your Allegro mobile application with your Realm User Id. (It stores login session, so if you logged in before, the login procedure will skip)   
<img src="/images/image9.png" width="30%" height="30%">     

Select tenant "Hanjin".    
<img src="/images/image10.png" width="30%" height="30%">   

Then, you can see stored container list from container collection.   
<img src="/images/image11.png" width="30%" height="30%">   

You can add container position data. click "+" button and type container number and position. (hj-b-a0999 and Busan-C-009)    
<img src="/images/image12.png" width="30%" height="30%">   

Then you can see the data is saved properly. To check Atlas container collection, go Atlas console and click "Browse Collections".   
<img src="/images/image13.png" width="80%" height="80%">   

Now, turn off Laptop internet connection. And try again create container information.   
<img src="/images/image14.png" width="30%" height="30%">   

The data is saved in allegro mobile application.     
<img src="/images/image15.png" width="30%" height="30%">   

Now, turn on the internet connection and check the data in Atlas container collection.
<img src="/images/image16.png" width="70%" height="70%">   