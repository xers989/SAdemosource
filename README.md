# MongoDB Demo

## SaaS Application Demo
Allegro demo is consist of middleware and web UI.   
Middleware (API server) is running on NodeJS with mongoose modules (Allegro-node)   
Web UI is based on Vue.js (Allegro-saas)   
<img src="/images/image1.png" width="60%" height="60%">    
It has tenancy concept, there are two tenant ("HMM", "Hanjin"). This application is providing management of cargoship. So, each tenant can save their own cargoship information.  
HMM manages their ship information with weight and fuel, also Hanjin manages ship with weight, fuel, and capacity.   
<img src="/images/image3.png" width="70%" height="70%">     

In login page there is tenant field and you can choose one of them. At this time Authentication is not implemented, so you can login with out Email and Password. You can extend authentication.   
<img src="/images/image4.png" width="70%" height="70%">      

If you login with Hanjin, you can retrieve Hanjin's ship information.   
<img src="/images/image5.png" width="70%" height="70%">   
Click edit button on ship information, then you can see there is capacity information.   
<img src="/images/image6.png" width="80%" height="80%">   

## One source multi use Demo
This is chatbot demo which is used Oracle Digital Assistant and Slack.   
Chatbot is working with existing middleware (API server - node_server)  
Chatbot source is on Allegro-bot   
Integration source between chatbot and API server is in digitalAssistant   
<img src="/images/image2.png" width="50%" height="50%">    
