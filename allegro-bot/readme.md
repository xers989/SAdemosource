## Digital Assistant 

### Feature and components
Oracle Digital Assistant is one of chatbot service that is based on AI. If you have Oracle cloud free account, you can provision digital assistant and use it for 1 month.   
Bot can talks with users through channel like slack, it dectects users' intents from the sentences.      
This demo is to provide human-centric features with existing allegro-node API, user can retrieve ship information through slack by chatting.   
You can get detailed information about Digital Assistant by following URL.   
https://docs.oracle.com/en/cloud/paas/digital-assistant/   
Digital Assistant is kind of chatbot platform, if you want to use another chatbot service or Python based chatbot, you can use it.

### Provision Digital Assistant
Login to Oracle Cloud console and click Digital Assistant (Home > Analytics & AI > Digital Assistant)   
<img src="/images/allegro-bot/image1.png" width="70%" height="70%">       
Click Create Digital Assistant Instance, type name what you want and select shape as development    
<img src="/images/allegro-bot/image2.png" width="50%" height="50%">       
It takes several minutes to provision digital assistant, After provisioning you can click the digital assistant to open digital assistant console.   
<img src="/images/allegro-bot/image3.png" width="60%" height="60%">       

### Create Skill and Intents
If you click the assistant console, you can enter following page.   
<img src="/images/allegro-bot/image34.png" width="80%" height="80%">   
To create Skill, click menu button on top, and select skills under Development > Skills.    
And then create new Skill. To finish creating type the name of it (allegro), about other columns leave with default value.      
<img src="/images/allegro-bot/image4.png" width="50%" height="50%">        
Skills are designed to interact with users and fulfill specific types of tasks, in this demo search ship and delete ship. Each skill helps a user complete a task through a combination of text messages and simple UI elements.   
Now you need to add intents in the skill, click add 2 intents. (Don't change the intent name, it is used in flow definition)    

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

<img src="/images/allegro-bot/image5.png" width="70%" height="70%">       

When user starts conversation with bot, it detects user's intent by Utterances.   
For example, if you types "I wonders about my cargoship list", the bot recognizes your tentant as CargoShip and proceed the conversation.   

After inputing all information, you need to train the skill. Then digital bot can recognize users' intent.    
<img src="/images/allegro-bot/image6.png" width="60%" height="60%">       
If chatbot can't detect your intention, type the sample utterance in the right skill and then train again.    

### Flow Definition
Now you need to define conversation flow.   
Click flow Editor and delete full text and paste from flow file(allegro-flow.txt).   
<img src="/images/allegro-bot/image7.png" width="50%" height="50%">       

### Adding External Service
Digital Assistant provides feature to integrate with external services.   
You can implement interface program which is based on Nodejs and project name is digitalAssistant.  
This is the project folders and files information.  
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
Replace the domain name as your IP address of allegro-node API Server in allegrobackend.js, deleteCargoShip.js, getCargoShip.js.    

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
There is components menu on left side menu, and click add service.   

<img src="/images/allegro-bot/image8.png" width="60%" height="60%">      

After finising add service. You can see 3 services are add in one project. Final task is turn-on service enabled.   

<img src="/images/allegro-bot/image9.png" width="60%" height="60%">      



### Testing chatting service in Skill
Now you can test the digital bot, there is Preview button on top menu.   
Click preview and type question.   
<img src="/images/allegro-bot/image10.png" width="60%" height="60%">       

In chatting text box, type "Hi, I'm wondering my cargoship list" and enter.   
Then chatbot will respond your question.   
<img src="/images/allegro-bot/image11.png" width="70%" height="70%">       
If chatbot returns Hanjin tenant cargoship list, it works properly.'  



### Create Slack Application
Final task is adding conversation channel. Channel can be slack, facebook messenger or MS teams.   
Here is the way to connect slack, to complete this task you need to have administration role of the slack.   
If you want to create new slack workspace, here is link to make new.   
https://slack.com/create#email   

In the slack, go to the slack api page with your account.   
https://api.slack.com/apps   

Click create app button.   
<img src="/images/allegro-bot/image12.png" width="70%" height="70%">        

Choose From scratch and type name of the chat-bot   
<img src="/images/allegro-bot/image13.png" width="40%" height="40%">        

Appname as allegro (if you have preferred name you can use) and pick a workspace name.   
<img src="/images/allegro-bot/image14.png" width="40%" height="40%">       

When it is created, the page is forward to basic information of the building Apps. On left menu select OAuth and Permissions.   
There is Scopes section and input following information.   

```text
Bot Token Scopes
chat:write
im:history
users:read
```

```text
User Token Scopes
files: write
```
<img src="/images/allegro-bot/image15.png" width="50%" height="50%">       

Go to OAuth Tokens for Your Workspace section, there is intall to workspace button.   
<img src="/images/allegro-bot/image16.png" width="50%" height="50%">       
Click Allow button    
<img src="/images/allegro-bot/image17.png" width="40%" height="40%">        

After creation process, You can get credential information App Credential section from Basic information.   
<img src="/images/allegro-bot/image18.png" width="50%" height="50%">       


### Create Slack Channel
Login into Digital Assitant and Channels under Develoment menu.   
<img src="/images/allegro-bot/image19.png" width="50%" height="50%">       

Select Add Channel button and type slackAllegro as name and pick slack as Channel Type.   
And then copy client ID and Client Secret from slack.   
<img src="/images/allegro-bot/image20.png" width="50%" height="50%">       

After create the channel enable the Channel Enabled and select Route To as skill what you created.    
<img src="/images/allegro-bot/image21.png" width="50%" height="50%">       


### Paste Redirect and complete the config
Then copy the Webhook URL in the page and paste it Redirect URLs section in OAuth & Permission page.   
When you paste the URL, you need to append "/authorizeV2" in the URL.
The Webhook URL.   
<img src="/images/allegro-bot/image22.png" width="50%" height="50%">       
Redirect URL (webhookURL/authorizeV2)   
<img src="/images/allegro-bot/image23.png" width="50%" height="50%">        
Then click Save URLs   
Also you have to paste the Webhook URL on Request URL and Options Load URL on Interactivity & Shortcuts.    
In the page enable interactivity and paste URL on Request URL and Options Load URL (This is in bottom of the page).    
<img src="/images/allegro-bot/image35.png" width="50%" height="50%">     

In the left menu, there is App Home and Your App's Presence in Slack section, turn on Always Show My Bot as Online.   
<img src="/images/allegro-bot/image24.png" width="50%" height="50%">       

Also, you need to turn on Message tab in Show section and check "Allow users to send Slash commands and messages from the messages tab"    
<img src="/images/allegro-bot/image29.png" width="50%" height="50%">       

Select Event Subscriptions in left menu, set Enable Events to ON and paste Web Hook URL on Request URL field.   
<img src="/images/allegro-bot/image25.png" width="50%" height="50%">       

Expand subscribe to bot events and click add a bot user.   
Click Add bot user event and add following event.  

```text
message.im
app_mention
message.mpim
message.channels
```

<img src="/images/allegro-bot/image26.png" width="50%" height="50%">        

Go to Manage Distribution menu on left, there is add slack button. Click the button.  
<img src="/images/allegro-bot/image27.png" width="50%" height="50%">       

Click Allow button to complete the task.   
<img src="/images/allegro-bot/image28.png" width="40%" height="40%">       


### Test ChatBot
Launching slack with your ID, there is allegro-bot is on Apps.   
Click the application to start converstion, then type what you want to know about cargoship.   
Type "Hi I'm wondering about cargoship list.", then allegro-bot will answer the question.   
The cargoship information is list value, so it is displayed vertical card type.   
<img src="/images/allegro-bot/image30.png" width="70%" height="70%">      
