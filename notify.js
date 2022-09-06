
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const { clientId, guildId, token, publicKey } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(token);


client.once('ready', async () => {

  await notify_user()
})

// client.on('message',(m)=>{
//   console.log(m)
// })

let notify_user = async function(){
  let guild = await client.guilds.fetch(guildId)
  // console.log(guild)
  let members = await guild.members.fetch({ query: 'kam', limit: 1 })

  console.log('asdf')
  let user = members.values().next().value

  const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('approve')
					.setLabel('Yes')
					.setStyle(ButtonStyle.Primary),
			)
			.addComponents(
				new ButtonBuilder()
					.setCustomId('reject')
					.setLabel('I did not make this request')
					.setStyle(ButtonStyle.Danger),
			);

		// await interaction.reply({ content: 'I think you should,', components: [row] });


  let res = await user.user.send({ content: 'Would you like to subscribe to deployment notifications?', components: [row] })
  console.log(res)

  client.destroy()

}

