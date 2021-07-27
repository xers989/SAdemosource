## Allegro Mobile Application with Realm

### Feature and components
This mobile application is for handling container information.
The application has mongodb inside to work with UI pages.
Origin of data is Atlas mongoDB. So, it stores what is needed in the mobile app.
If the mobile application lost connection, still mobile app can handle the data and it synchronizes with origin data after connecting.
<img src="/images/allegro-mobile/image1.png" width="90%" height="90%">    
The mobile application is made with react Native.   

### Atlas Realm setup backend
If you have Atlas account, log in the Atlas console and create cluster.
To create Realm backend click Realm on top menu and click Create a New App.
<img src="/images/allegro-mobile/image3.png" width="80%" height="80%">    
Input Appliation name as allegro-mobile and in Link your Database select existing mongodb.
<img src="/images/allegro-mobile/image4.png" width="60%" height="60%">    

### Atlas Realm Add Collection
In you realm application, click Get Started button to Add a Collection or click Schema in left side menu.   
<img src="/images/allegro-mobile/image5.png" width="80%" height="80%">   

In realm collection, add a collection that is allegro.container.   
<img src="/images/allegro-mobile/image6.png" width="70%" height="70%">   

Select Schema menu and click generate schema button.   
<img src="/images/allegro-mobile/image7.png" width="90%" height="90%">    

pick just the container collection and click Generate Schema.   
<img src="/images/allegro-mobile/image8.png" width="60%" height="60%">   

Schema of container is generated like following picture, after checking that save the change.   
<img src="/images/allegro-mobile/image9.png" width="60%" height="60%">   
The changes are not deployed on the realme application to deploy it below of top menu there is REVIEW DRAFT & DEPLOY button. Click the button to deploy into your application.   
<img src="/images/allegro-mobile/image10.png" width="80%" height="80%">  


### Atlas Realm Add App Users
Now we need to create user for the mobile application, click Authentication on left menu. There are several options to authenticate users, but this time just enable Email/Password authentication. Click Edit button.   
<img src="/images/allegro-mobile/image11.png" width="90%" height="90%">    

Enable Email/Password field and to make user verification, select automatically confirm users and run a password reset function. And click save draft button below the page.   
<img src="/images/allegro-mobile/image12.png" width="70%" height="70%">   


To deploy the change, click REVIEW DRAFT & DEPLOY button.

Moves to Users section and click Add New User.   
<img src="/images/allegro-mobile/image13.png" width="70%" height="70%">   

Put your email as ID and password what you want.   
<img src="/images/allegro-mobile/image14.png" width="80%" height="80%">   


### Atlas Realm Enable Sync
The mobile application is providing data even offline and automatically synchronize data. To support the feature, we need to enable Sync. Open Sync page on left menu in Realm.   
It is Disabled, to enable this we have to pick Custer to sync and partition Key, then click enable button.   
<img src="/images/allegro-mobile/image15.png" width="70%" height="70%">   

To deploy the change, click REVIEW DRAFT & DEPLOY button.   
And then moves to Development Mode in Sync, select Define a Database Name, click Turn Dev Mode On.   
<img src="/images/allegro-mobile/image16.png" width="70%" height="70%">    

To deploy the change, click REVIEW DRAFT & DEPLOY button.

### Preparing Collection and data
Go to your realm application and go App Users. There one user that you have created.
Copy the Id value.    
<img src="/images/allegro-mobile/image18.png" width="90%" height="90%">     

If you have Atlas account, log in the Atlas and create collection and data.   
The collection name is "container" and put into the document into the "container".    

It has simply containerNumber and position data. replace <<Realm User Id>> as user id.          
```json
{"realm_id":"hanjin=<<Realm User Id>>","containerNumber":"hj-c-a001","position":"Incheon-A-Z001"}
{"realm_id":"hanjin=<<Realm User Id>>","containerNumber":"hj-c-a002","position":"Incheon-A-Z010"}
{"realm_id":"hanjin=<<Realm User Id>>","containerNumber":"hj-x-a019","position":"Incheon-Z-Z090"}
```

If you finished it, the data would like following.   
<img src="/images/allegro-mobile/image2.png" width="90%" height="90%">    

### Mobile Application
To set up React Native, you have to install React Native +0.31.0    
Here is installation to make environments.   
https://reactnative.dev/docs/environment-setup    

In this demo, I will use macOS.   
In macOS install Node & Watchman is needed, also Xcode is required.     
Run Xcode and click preferences in Xcode.   
In Locations tab, there is Command Line Tools option, Select one in the list.
<img src="/images/allegro-mobile/image17.png" width="60%" height="60%">

What you need to change is replament of realm app id in "/components/getRealmApp.js".   
You can get the realm app id from your realm application.
<img src="/images/allegro-mobile/image22.png" width="80%" height="80%">

Open "/components/getRealmApp.js" and replace appId value with your app id.   
```javascript
const appId = "<<your app id>>"; // Set Realm app ID here.
```

To install Realm, you have to install required modules.  
```bash
allegro-mobile $ npm install
allegro-mobile $ cd ios && pod install && cd ..
..
allegro-mobile $ react-native run-ios
...
success Successfully built the app
info Installing "/***/Library/Developer/Xcode/DerivedData/allegro-cuustfjnstnnblcajbqfemqiupro/Build/Products/Debug-iphonesimulator/allegro.app"
info Launching "org.reactjs.native.example.allegro"
success Successfully launched the app on the simulator
```

In few minutes, mobile simulator will be launched.   
Login with your user id and password.    
<img src="/images/allegro-mobile/image19.png" width="30%" height="30%">    

Select Hanjin as tenant.    
<img src="/images/allegro-mobile/image20.png" width="30%" height="30%">    

And then you can see your container information that you created before.   
<img src="/images/allegro-mobile/image21.png" width="30%" height="30%">    