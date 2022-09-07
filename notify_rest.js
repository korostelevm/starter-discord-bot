

const { clientId, guildId, token, publicKey } = require('./config.json');

const axios = require('axios');
const discord = axios.create({
  baseURL: 'https://discordapp.com/api/',
  timeout: 1000,
  headers: {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
	"Access-Control-Allow-Headers": "Authorization",
	"Authorization": `Bot ${token}`
  }
});

let notify_user = async function(){
	let discord_user = `korostelevm#5919`
	let github_id = 531306

	let [user_name, discriminator] = discord_user.split('#')
	let member = (await discord.get(
		`/guilds/${guildId}/members/search?query=${user_name}`
	)).data
	let u = null
	if(member.length){
		u = member.find(m=>{
			return m.user.discriminator == discriminator
		})
	}
	if(!u){
		return 'user not in guild'
	}
	let c = (await discord.post(`/users/@me/channels`,{
		recipient_id: u.user.id 
	})).data
	try{
		let res = await discord.post(`/channels/${c.id}/messages`,{
			content:'asdf',
			components:[
				{
					type: 1,
					components: [
					{
						type: 2,
						emoji: undefined,
						custom_id: `${github_id}_approve`,
						label: 'Yes',
						style: 1
					},
					{
						type: 2,
						emoji: undefined,
						custom_id: `${github_id}_reject`,
						label: 'I did not make this request',
						style: 4
					}
					]
				}
				
			]
		})
		console.log(res.data)
	}catch(e){
		console.log(e)
	}
}

notify_user()
