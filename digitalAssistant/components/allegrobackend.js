'use strict';
const request = require("request");

// You can use your favorite http client package to make REST calls, however, the node fetch API is pre-installed with the bots-node-sdk.
// Documentation can be found at https://www.npmjs.com/package/node-fetch
// Un-comment the next line if you want to make REST calls using node-fetch. 
// const fetch = require("node-fetch");
 
module.exports = {
  metadata: () => ({
    name: 'allegro.getCargoShips',
    properties: {
      cargoShips: { required: true, type: 'map' },
    },
    supportedActions: ['success', 'failure']
  }),
  invoke: (conversation, done) => {
    // perform conversation tasks.
    const { cargoShips } = conversation.properties();

    var req_body;
    var reqURL="http://terraform.cloudiam.site:3002/cargoship/Hanjin";
    
    conversation.logger().info("Request URL is : "+reqURL);
    request(reqURL, {json: true}, (error, response, body) => {
      conversation.logger().info("Request call proceed");
      if (response.statusCode == 200) {
        conversation.logger().info("Successful getting Cargoship Information");
        
        const _cargoshipInfo = body;
        
        conversation.logger().info("Return Information is "+ JSON.stringify(_cargoshipInfo));
     
        conversation.variable(cargoShips,_cargoshipInfo);
        conversation.transition('success');
        conversation.keepTurn(true);
        done();
      }
      else
      {
        conversation.logger().warn("error type: "+body.error.type);        
          if(body.error.hasOwnProperty("info")){
            conversation.logger().warn("error message: "+body.error.info);
          }
          conversation.transition('failure');
          conversation.logger().warn("Error code: "+response.statusCode);
          done();
      }
    });
  }
};
