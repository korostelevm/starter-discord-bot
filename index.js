
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { clientId, guildId, token, publicKey } = require('./config.json');

// // Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // When the client is ready, run this code (only once)


// client.on('interactionCreate', async interaction => {
//     console.log(interaction)
// 	if (!interaction.isChatInputCommand()) return;

// 	const { commandName } = interaction;

// 	if (commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	} else if (commandName === 'server') {
// 		await interaction.reply('Server info.');
// 	} else if (commandName === 'user') {
// 		await interaction.reply('User info.');
// 	}
// });

// // Login to Discord with your client's token
// client.login(token);/


// const { SlashCommandBuilder, Routes } = require('discord.js');
// const { REST } = require('@discordjs/rest');

// const commands = [
// 	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
// 	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
// 	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
// ]
// 	.map(command => command.toJSON());

// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
// 	.then(() => console.log('Successfully registered application commands.'))
// 	.catch(console.error);

const express = require('express');
const bodyParser = require('body-parser');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');


const app = express();

app.post('/interactions', verifyKeyMiddleware(publicKey), async(req, res) => {
  const interaction = req.body;
  
  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    console.log('message component')
    console.log(interaction)
    if(interaction.data.custom_id == 'approve'){
      return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: 'Cool. You\'re good to go.',
          components: []
        },
      });
    }
    if(interaction.data.custom_id == 'reject'){
      return res.send({
        type: InteractionResponseType.UPDATE_MESSAGE,
        data: {
          content: 'Thank you. We will investigate what happened.',
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

