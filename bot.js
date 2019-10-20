var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var known = ["yoshi", "fox", "banjo", "duckhunt", "kazooie", "falco"]
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 4) == "I'd ") 
    {
        var args = message.substring(4).split(' ');
        var cmd = args[1];

        logger.info("registered: "+cmd);
       
        args = args.splice(1);
        if (known.includes(cmd)) {
            logger.info("Recognized!");
            var files = fs.readdirSync('./'+cmd);
            logger.info("Files: ".concat(files[Math.floor(Math.random() * files.length)]));
            bot.uploadFile({
                to: channelID,
                file: "./"+cmd+"/"+files[Math.floor(Math.random() * files.length)]
            });
            logger.info("File Uploaded!");
            // Just add any case commands if you want to..
        }
        else if (cmd == "that") 
        {
            logger.info("Recognized generic!");
            var selection = known[Math.floor(Math.random() * known.length)]
            var files = fs.readdirSync('./'+selection);
            logger.info("Files: ".concat(files[Math.floor(Math.random() * files.length)]));
            bot.uploadFile({
                to: channelID,
                file: "./"+selection+"/"+files[Math.floor(Math.random() * files.length)]
            });
            logger.info("File Uploaded!");
        }
    }
    if (message.substring(0, 3) == "Is ") 
    {
        var args = message.substring(3).split(' ');
        var cmd = args[1];

        var excuse = ["having a good slice of pizza", "on a waterslide", "enjoying a day at the beach", "a little hot"]

        logger.info("registered: "+cmd);
       
        args = args.splice(1);
        if (cmd == "porn?") 
        {
            logger.info("Recognized generic!");
            bot.sendMessage({
                to: channelID,
                message: "No! They're just "+excuse[Math.floor(Math.random() * excuse.length)+"."]
            });
        }
    }
});