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


### Create Skill and Intents
In digital assistant console, select skills under Development > Skills.
And Create new Skill, then type the name of it (allegro)
![Atlas Connection](/images/allegro-bot/image3.png)   
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

![Atlas Connection](/images/allegro-bot/image3.png)  

When user conversates, the chatbot detect user's intennt by Utterances.
For example, if you types "I wonders about my cargoship list", digital assistant recognizes your tentant as CargoShip and proceed the conversation.

After type all information, you need to train the skill. Then digital bot can recognize your intent.
![Atlas Connection](/images/allegro-bot/image4.png)  
If chatbot can't detect your intention, type the sample utterance in the right skill and then train again.

### Flow Definition
Now you need to define conversation flow.
Click flow Editor and copy flow file (allegro-flow.txt).
![Atlas Connection](/images/allegro-bot/image5.png)  


If you want to see server log of the Allegro-node, type this.
```bash
$ pm2 logs
```
