
// const { clientId, guildId, token, publicKey } = require('./config.json');
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();
app.use(bodyParser.json());

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async(req, res) => {
  
  const interaction = req.body;
  console.log(JSON.stringify(interaction))
  
  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    let [github_id, state] = interaction.data.custom_id.split('_')
    if(state == 'approve'){
      return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: `${github_id} Cool. You\'re good to go.`,
          components: []
        },
      });
    }
    if(state == 'reject'){
      return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: `${github_id} is not you. We will investgate`,
          components: []
        },
      });
    }
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Hello world',
      },
    });
  }
});





app.listen(8999, () => {

})
  
