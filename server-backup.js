const axios = require('axios');
const express = require('express');
const server = express();

server.listen(3000, () => {
  console.log('Server listening on port 3000')
});

server.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  const event = request.body; 
  console.log(event);

  response.send();

  axios.post('https://hooks.slack.com/services/'+process.env.HOOK, {
  "blocks":[
     {
        "type":"section",
        "text":{
           "type":"mrkdwn",
           "text": " *"+event.head_commit.author.name+"* pushed a commit to "+event.repository.full_name+"\n\n "+event.head_commit.url+ ":tada:"
        }
     },
     {
        "type":"actions",
        "elements":[
           {
              "type":"button",
              "text":{
                 "type":"plain_text",
                 "text":"View Changes",
                 "emoji":true
              },
              "value":"click_me_123",
              "url": event.head_commit.url
           },
          {
              "type":"button",
              "text":{
                 "type":"plain_text",
                 "text":"View Repository",
                 "emoji":true
              },
              "value":"click_me_123",
              "url": event.url
           }
        ]
     }
  ]
})
.then(function (response) {
  //console.log(response);
})
.catch(function (error) {
  //console.log(error);
});

});