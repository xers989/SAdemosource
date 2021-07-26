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

After finising add service. You can see 3 services are add in one project. Final task is turn-on service enabled.

![Atlas Connection](/images/allegro-bot/image9.png)  



### Testing chatting service in Skill
Now you can test the digital bot, there is Preview button on top menu.
Click preview and type question.
![Atlas Connection](/images/allegro-bot/image10.png)  

In chatting text box, type "Hi, I'm wondering my cargoship list" and enter.
Then chatbot will respond your question.
![Atlas Connection](/images/allegro-bot/image11.png)  
If chatbot returns Hanjin tenant cargoship list, it works properly.'



### Create Slack Application
Final task is adding conversation channel, channel can be slack, facebook messenger or MS teams.
Here is the way to connect slack, to complete this task you need to have administration role of the slack.
If you want to create new slack workspace, here is link to do that.
https://slack.com/create#email

In the slack, visit the slack api page with your account.
https://api.slack.com/apps

Click create app button 
![Atlas Connection](/images/allegro-bot/image12.png)  

Choose From scratch and type name of the chat-bot
![Atlas Connection](/images/allegro-bot/image13.png)  

Appname as allegro (if you have preferred name you can use) and pick a workspace name.
![Atlas Connection](/images/allegro-bot/image14.png)  

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
![Atlas Connection](/images/allegro-bot/image15.png)  

Go to OAuth Tokens for Your Workspace section, there is intall to workspace button.
![Atlas Connection](/images/allegro-bot/image16.png)  
Click Allow button
![Atlas Connection](/images/allegro-bot/image17.png)  

After creation process, You can get credential information App Credential section from Basic information
![Atlas Connection](/images/allegro-bot/image18.png)  


### Create Slack Channel
Login into Digital Assitant and Channels under Develoment menu.
![Atlas Connection](/images/allegro-bot/image19.png)  

Select Add Channel button and type slackAllegro as name and pick slack as Channel Type.
And then copy client ID and Client Secret from slack.
![Atlas Connection](/images/allegro-bot/image20.png)  

After create the channel enable the Channel Enabled and select Route To as skill what you created.
![Atlas Connection](/images/allegro-bot/image21.png)  

Then copy the Webhook URL in the page and paste it Redirect URLs section in OAuth & Permission page.
The Webhook URL
![Atlas Connection](/images/allegro-bot/image22.png)  
Redirect URL
![Atlas Connection](/images/allegro-bot/image23.png)  
Then click Save URLs

In the left menu, there is App Home and Your App's Presence in Slack section, turn on Always Show My Bot as Online.
![Atlas Connection](/images/allegro-bot/image24.png)  

Select Event Subscriptions in left menu, set Enable Events to ON and paste Web Hook URL on Request URL field.
![Atlas Connection](/images/allegro-bot/image25.png)  

Expand subscribe to bot events and click add a bot user;
Click Add bot user event and add following event.

```text
message.im
app_mention
message.mpim
message.channels
```

![Atlas Connection](/images/allegro-bot/image26.png)  

Go to Manage Distribution menu on left, there is add slack button. Click the button
![Atlas Connection](/images/allegro-bot/image27.png)  

Click Allow button to complete the task.
![Atlas Connection](/images/allegro-bot/image28.png)  



In Subscribe to bot events section, click add a bot user