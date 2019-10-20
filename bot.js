var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var known = ["yoshi", "fox"]
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
});