## Digital Assistant 

### Feature and components
Oracle Digital Assistant is one of chatbot service that is based on AI. If you have Oracle cloud free account, you can provision digital assistant and use it for 1 month.   
It collects users chatting through channel, and analyze it and dectect users' intents.
This demo feature is user can retrieve ship information through slack by chatting with chatbot.
You can get detail information about Digital Assistant by following URL.
https://docs.oracle.com/en/cloud/paas/digital-assistant/
Digital Assistant is kind of chatbot platform, so if you want to use another chatbot service or Python based chatbot, you can use it.


### Provision Digital Assistant
Login to Oracle Cloud console and click Digital Assistant (Home > Analytics & AI > Digital Assistant)
![Atlas Connection](/images/allegro-bot/image1.png)   
Click Create Digital Assistant Instance, type name what you want and select shape as development
![Atlas Connection](/images/allegro-bot/image2.png)   
It takes several minutes to provision digital assistant, After provisioning you can click the digital assistant to open digital assitant console.
![Atlas Connection](/images/allegro-bot/image3.png) 

### Create Skill and Intents
In digital assistant console, select skills under Development > Skills.
And Create new Skill, then type the name of it (allegro)
![Atlas Connection](/images/allegro-bot/image4.png)   
Skills are designed to interact with users and fulfill specific types of tasks, in this demo search ship and delete ship. Each skill helps a user complete a task through a combination of text messages and simple UI elements.
Now you need to add intents in the skill, click add 2 intents.

```text
ChargoShip intent
Conversation Name : ChargoShip
Name : ChargoShip
Utterances :
Can I see ship information
Cargoship information please
Cargoship list, please
I' wondering about the ship information
Show me the ship information
What kind of ship do I have?
```
```text
DeleteCargoShip intent
Conversation Name : DeleteCargoShip
Name : DeleteCargoShip
Utterances :
delete cargoship
Get rid of the ship
I have to delete the cargo ship
This is need to be delete
```

![Atlas Connection](/images/allegro-bot/image5.png)  

When user conversates, the chatbot detect user's intennt by Utterances.
For example, if you types "I wonders about my cargoship list", digital assistant recognizes your tentant as CargoShip and proceed the conversation.

After type all information, you need to train the skill. Then digital bot can recognize your intent.
![Atlas Connection](/images/allegro-bot/image6.png)  
If chatbot can't detect your intention, type the sample utterance in the right skill and then train again.

### Flow Definition
Now you need to define conversation flow.
Click flow Editor and copy flow file (allegro-flow.txt).
![Atlas Connection](/images/allegro-bot/image7.png)  


### Flow Definition
Now you need to define conversation flow.
Click flow Editor and copy flow file (allegro-flow.txt).
![Atlas Connection](/images/allegro-bot/image7.png)  

### Adding External Service
Digital Assistant provides feature to integrate with external services. 
You can implement interface program which is based on Nodejs and project name is digitalAssistant.
This is the project folders and files information
```bash
digitalAssistant $ tree
.
├── Dockerfile
├── README.md
├── allegro-backend-1.0.0.tgz
├── components
│   ├── allegrobackend.js
│   ├── deleteCargoShip.js
│   └── getCargoShip.js
├── docker-compose.yml
├── main.js
├── package-lock.json
├── package.json
└── spec
    ├── test.cc.req.json
    └── test.eh.req.json
```
Main function to interface with allegro-node is implemented in components folder.
There are 3 interfaces and open the files and correct the URL of allegro-node server.
In this project the allegro-node API domain name is "terraform.cloudiam.site" and 
the reqURL sets up that URL.
```javascript 
var reqURL="http://terraform.cloudiam.site:3002/cargoship/Hanjin";
```
Replace the domain name as your IP address of allegro-nod API Server in allegrobackend.js, deleteCargoShip.js, getCargoShip.js.

Goto digitalAssistant directory and package the project by following.
```bash
$ npm install -g @oracle/bots-node-sdk
$ npm install request
$ npm pack

> allegro-backend@1.0.0 prepack ***/digitalAssistant
> npm run bots-node-sdk -- pack --dry-run


> allegro-backend@1.0.0 bots-node-sdk /***/digitalAssistant
> bots-node-sdk "pack" "--dry-run"

---------------------------------------------------------------------
Component Package 'digitalAssistant' is valid!
---------------------------------------------------------------------
npm notice 
npm notice 📦  allegro-backend@1.0.0
npm notice === Tarball Contents === 
npm notice 30B   .dockerignore                
npm notice 86B   Dockerfile                   
npm notice 1.8kB components/allegrobackend.js 
npm notice 2.1kB components/deleteCargoShip.js
npm notice 1.9kB components/getCargoShip.js   
npm notice 60B   main.js                      
npm notice 624B  package.json                 
npm notice 2.6kB README.md                    
npm notice 221B  docker-compose.yml           
npm notice === Tarball Details === 
npm notice name:          allegro-backend                         
npm notice version:       1.0.0                                   
npm notice filename:      allegro-backend-1.0.0.tgz               
npm notice package size:  2.9 kB                                  
npm notice unpacked size: 9.4 kB                                  
npm notice shasum:        b1d3210a3d689a5f230c0bbe7509f44a53c9a8d3
npm notice integrity:     sha512-WBvf4NAvUQGJS[...]mxobhxfGNc3+w==
npm notice total files:   9                                       
npm notice 
allegro-backend-1.0.0.tgz

```
Go to digital assistant console and select skill what you created.
There is components menu on left side menu, and click add service

![Atlas Connection](/images/allegro-bot/image8.png)  


