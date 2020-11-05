const Discord = require('discord.js');
const tmi = require('tmi.js');
const discord = new Discord.Client();
const channel = "channelid" //Discord channel id
var draw = []
let status = false;
discord.on('return', (username) => {
    //discord.channels.cache.get(channel).send(username)
    if(status){
        
        let drawlist = '';
        draw.forEach(user => drawlist += ` ${user}`)
        discord.channels.cache.get(channel).send(drawlist)
    }
 });

discord.on('ready', () => {
  console.log(`Logged in as ${discord.user.tag}!`);
});

discord.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === 'twitch') {
    twitch.say('muminjack','twitch')
    msg.reply('Twitch!');
  }
});

discord.login('Discord Apikey'); // Discord apikey

const twitch = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'username', //twitch username
        password: 'Twitch Apikey' // Twitch apikey
    },
    channels: [ 'channelname' ] //channels
});

twitch.connect().catch(console.error);

twitch.on('message', (channel, tags, message, self,user) => {
    if(self) return;

       // twitch.say(channel, `@${tags.username}, heya!`);
        if(message.toLowerCase() === 'list'){
            let drawlist = '';
            draw.forEach(user => drawlist += ` ${user}`)
            twitch.say(channel, drawlist)
            discord.emit('return',tags.username);
        }

        if(message.toLowerCase() === '!draw'){
            status ? status=false : status=true 
            status ? twitch.say(channel, `draw active!`) : twitch.say(channel, `draw deactive!`)
        }
        
        if(!draw.includes(tags.username) && status){
        draw.push(tags.username)
        }

});