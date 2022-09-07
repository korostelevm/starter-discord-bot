
const { clientId, guildId, token, publicKey } = require('./config.json');


const express = require('express');
const bodyParser = require('body-parser');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();

app.post('/interactions', verifyKeyMiddleware(publicKey), async(req, res) => {
  
  const interaction = req.body;
  console.log(JSON.stringify(interaction))
  
  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    console.log('message component')
    // console.log(interaction)
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
    
    // let user = await client.users.fetch(interaction.member.user.id)
    // await user.send('yo')
    // console.log(user)
    // let guild = await client.guilds.fetch(guildId)
    // const c = guild.channels.cache.find(channel => channel.name === 'bot-test')
    // await c.send('yo')
    // await client.destroy()
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Hello world',
      },
    });
  }


});


// It's best to set up body-parser so that it does NOT apply to interaction
// routes.
app.use(bodyParser.json());

// client.once('ready', () => {

  app.listen(8999, () => {
    console.log('Example app listening at http://localhost:8999');
  })
  
// 	console.log('Ready!');
// });




// const { Client, GatewayIntentBits } = require('discord.js');
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// let guild;


// client.on('ready', async () => {
//   console.log(`Logged in as ${client.user.tag}!`);
//   guild = await client.guilds.fetch(guildId)
// //   let c = guild.channels.cache
//   const c = guild.channels.cache.find(channel => channel.name === 'bot-test')
//     await c.send('yo')
// //   let c = await guild.channels.fetch()
//     console.log(c)
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });


// // 534723950656
// client.login(token);

