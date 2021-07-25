# MongoDB Demo

## SaaS Application Demo
Allegro demo is consist of middleware and web UI.   
Middleware (API server) is running on NodeJS with mongoose modules (Allegro-node)   
Web UI is based on Vue.js (Allegro-saas)   
![Architecture](/images/image1.png)   
It has tenancy concept, there are two tenant "HMM, Hanjin". In login page there is tenant field and you can choose one of them.


## One source multi use Demo
This is chatbot demo which is used Oracle Digital Assistant and Slack.   
Chatbot is working with existing middleware (API server - node_server)  
Chatbot source is on Allegro-bot   
Integration source between chatbot and API server is in digitalAssistant   
![Architecture](/images/image2.png)   

