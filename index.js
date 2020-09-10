const env = process.env.NODE_ENV || 'development';
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const cron = require('node-cron');
const prefix = '~';
const githubRepo = 'https://github.com/RobertG-H/coffee-bot-discord/blob/master/README.md'

function stayAwake() {
    console.log('I am awake!');
}

// Setup
client.once('ready', () => {
    console.log('Coffee Bot Loaded!');
    client.user.setActivity('Java Jumper');
});

// When joining a server
client.on("guildCreate", guild => {
    // createGuild(guild.id)
    guild.systemChannel.send('Hello I am Coffee Bot! Use the "~help" command for a list of things you can do with me. ');
    console.log(`Just joined: ${guild.name}`);
});


// Text commands
client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return message.channel.send("No feature here yet sorry...");
    if (!message.content.startsWith(prefix)) return;

    let cmd = message.content.split(prefix)[1].toLowerCase();

    /* SECTION: COMMANDS */
    // HELP
    if (cmd === 'help') {
        message.channel.send(`Hiya! \n\nMy name is Coffee Bot. \n\nYou can see me other commands at: ${githubRepo} `);
    }
    // HELLO
    else if (cmd === 'hello') {
        message.channel.send("Hiya!");
    }
    // BOTINFO
    else if (cmd === 'botinfo' || cmd === 'info') {
        let bicon = client.user.displayAvatarURL();
        let botembed = new Discord.MessageEmbed()
            .setDescription("All about me!")
            .setColor("#db404a")
            .setThumbnail(bicon)
            .addField("List of commands", githubRepo)
        return message.channel.send(botembed);
    }
});

client.login(process.env.DISCORD_TOKEN);

// Scheduler to keep bot from falling asleep. Pings it self every 10min.
cron.schedule('*/10 * * * *', function () {
    stayAwake();
});