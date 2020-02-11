var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');
var known = ["akechi", "aladdin", "amy", "angus", "ann", "arcanine", "ariel", "asriel",
"banjo", "bayonetta", "bea", "beast", "belle", "blastoise", "blaziken", "boruto", "bowser", "braixen", "buizel", "byleth",
"charizard", "charmander", "chespin", "chrom", "claude", "cloud", "corrin", "cuphead", 
"daisy", "daxter", "dedede", "diddy", "dimitri", "dixie", "donkey", "dragonite", 
"eevee", "elizabeth", "espeon", 
"falco", "falcon", "flareon", "fiona", "fox", "futaba", 
"game&watch", "ganondorf", "gaston", "genie", "glaceon", "goodra", "goofy", "goomba", "goombella", "gregg", "greninja", "guilmon", 
"haida", "haru", "hero", "hinata", "houndoom", "hunt", 
"ike", "impmon", "incineroar", "inkling", "ino", "isabelle", 
"jafar", "jasmine", "jerry", "jiggly", "joker", "jolteon", "judy", 
"k.rool", "karin", "kass", "kazooie", "kermit", "khan", "kirby", "knuckles", "kong", "koopa", "koops", "krystal", 
"laylee", "leafeon", "link", "lopunny", "lucario", "lucas", "lucina", "luigi", "luma", 
"mac", "mae", "makoto", "mario", "marowak", "marth", "max", "medli", "mega", "meta", "mewtwo", "mickey", "midna", "mike", "mipha", "mishima", "monika", "morgana", "mugman", "mushu", 
"nala", "nana", "naruto", "natsuki", "ness", "nick", "nook", 
"olimar", 
"pac", "palutena", "peach", "peg", "pichu", "piggy", "pikachu", "pit", "plant", "po", "primarina",
"r.o.b", "raichu", "randall", "rattata", "red", "renamon", "revali", "richter", "ridley", "riolu", "robin", "rocko", "rosalina", "roxanne", "roy", "ruto", "ryu", "ryuji", 
"sakura", "salazzle", "samus", "sans", "sasuke", "scar", "shadow", "sheik", "shinx", "shrek", "shulk", "silver", "simba", "simon", "smeargle", "snake", "snivy", "sonic", "steve", "sulley", "sylveon", 
"tails", "temari", "tepig", "tepig", "tigress", "timon", "tiny", "tom", "toriel",  
"umbreon", 
"vanilla", "villager", "vivian", 
"wario", "weavile", "wii", "wolf", 
"yooka", "yoshi", "yusuke", "yuri", 
"zangoose", "zelda", "zeraora", "zoroark"]
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
    message=message.replace("'", "").toLowerCase();
    // var messtart = (arg[1] + arg[2])
    var messtarts = message.substring(0, 3);
    // var messtart = message.substring(0, 4);
    // logger.info(messtart);

    if (messtarts == "rr ")
    {
    	logger.info("recognized user: "+bot.users.get(user));
    	bot.sendMessage(bot.users.find(user), "test");
    }
    else if (messtarts == "id ")
    // if (messtarts.equalsIgnoreCase("id ")) 
    {
        var args = message.substring(3).split(' ');

        logger.info("registered: "+cmd);
        var recognized = false;
        
        for (i = 0; i < args.length; i++)
        {
            var cmd = args[i];
            if (known.includes(cmd)) {
                logger.info("Recognized!");
                recognized = true;
                var files = fs.readdirSync('./'+cmd);
                logger.info("Files: ".concat(files[Math.floor(Math.random() * files.length)]));
                bot.uploadFile({
                    to: channelID,
                    file: "./"+cmd+"/"+files[Math.floor(Math.random() * files.length)]
                });
                logger.info("File Uploaded!");
                // Just add any case commands if you want to..
            }
        }
        if (cmd == "that") 
        {
            logger.info("Recognized generic!");
            recognized = true;
            var selection = known[Math.floor(Math.random() * known.length)]
            var files = fs.readdirSync('./'+selection);
            logger.info("Files: ".concat(files[Math.floor(Math.random() * files.length)]));
            bot.uploadFile({
                to: channelID,
                file: "./"+selection+"/"+files[Math.floor(Math.random() * files.length)]
            });
            logger.info("File Uploaded!");
        }
        // else if (!recognized)
        // {
        //  	fs.appendFileSync('suggestions.txt', message.substring(3)+"\n");
        // }
    }
    // if (message.substring(0, 3).equalsIgnoreCase("is ")) 
    if (message.substring(0, 3) == "is ") 
    {
        var args = message.substring(3).split(' ');

        var excuse = ["having a good slice of pizza", "on a waterslide", "getting a back rub", "really angry", "enjoying a day at the beach", "napping", "sleeping", "a little hot", "enjoying some yogurt", "wrestling", "a little cold", "struggling to open a jar", "a little sick", "yawning", "laughing", "hugging"];
       
        if (args.includes("porn?")) 
        {
            logger.info("Recognized accusation!");
            bot.sendMessage({
                to: channelID,
                message: "No! They're just "+excuse[Math.floor(Math.random() * excuse.length)]+"."
            });
        }
    }
    // if (message == "log")
    // {
    // 	var contents = fs.readFileSync('suggestions.txt', 'utf8');
    // 	logger.info("log requested!");
    //     bot.sendMessage({
    //         to: channelID,
    //         message: ""+contents
    //     });
    //     logger.info("log sent!");
    // }
    // if (message == "clear log")
    // {
    //     fs.writeFileSync('suggestions.txt', "");
    // }
    // if (message.substring(0, 7) == "remove ")
    // {
    //     var character = message.substring(7);
    //     var contents = fs.readFileSync('suggestions.txt', 'utf8').split('\n');
    //     var newlog = "";
    //     var newlogline = ""
    //     for (i = 0; i < contents.length; i++)
    //     {
    //     	contents[i] = contents[i].split(' ');
    //     	if (contents[i].includes(character))
    //     	{
    //     		contents.splice(i, 1);
    //     		i = i-1;
    //     	}
    //     } 
    //     for (i = 0; i < contents.length; i++)
    //     {
    //     	newlogline = "";
    //     	for (n = 0; n < contents[i].length; n++)
    //     	{
    //     		newlogline = newlogline + contents[i][n] + " ";
    //     	}
    //     	newlog=newlog + newlogline;
    //     	newlogline.replace(" ", "")
    //     	if (newlogline.length>0)
    //     	{
    //     		newlog = newlog + "\n";
    //     	}
    //     }
    //     fs.writeFileSync('suggestions.txt', newlog);
    // }
    // if (message.substring(0, 3).equalsIgnoreCase("v#"))
    if (message == "v#")
    {
        bot.sendMessage({
            to: channelID,
            message: "Version: 1.8.0"
        });
    }
});
