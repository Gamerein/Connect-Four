//todo: give start attributes, like emoticon choices. 
// Make a help

var Discord = require('discord.io');

var bot = new Discord.Client({
    token: "token_here",
    autorun: true
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.setPresence({game: {type: 0, name: "cf start"}});

var circle = ":black_circle: ";
var prefix = "cf";
var red = ":red_circle: ";
var blue = ":large_blue_circle: ";

var Game = {
    present: false, 
    player1: null, 
    player2: null,
    lastPlaced: null
}

var timestamp
var lastPlayer
var gs1 = [circle, circle, circle, circle, circle, circle, circle];
var gs2 = [circle, circle, circle, circle, circle, circle, circle];
var gs3 = [circle, circle, circle, circle, circle, circle, circle];
var gs4 = [circle, circle, circle, circle, circle, circle, circle];
var gs5 = [circle, circle, circle, circle, circle, circle, circle];
var gs6 = [circle, circle, circle, circle, circle, circle, circle];

bot.on("message", function (user, userID, channelID, message, event)
{
    var author = event.d.author.username
    if (message.substring(0, prefix.length) == prefix)
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command == "start")
        {
            bot.sendMessage({to: channelID, message: "Game started by `" + author + "`  Join with `cf join`. Place a circle with `cf place <red/>blue> <row>`"});      
            draw();
            Game.present = true
            Game.player1 = author
            timestamp = new Date();
            console.log("new game started")
        }
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command == "join" && Game.present == true)
        {
            bot.sendMessage({to: channelID, message: "`" + author + "` joined"})
            if (author != Game.player1 || author != Game.player1){
            Game.player2 = author
            draw();
            } else{
                bot.sendMessage({to: channelID, message: "you have already joined"})
            }
        } else if(command == "join" && Game.present != true) {
            bot.sendMessage({to: channelID, message: "no game started"})
        }
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command == "show" && Game.present == true)
        {
            draw();
        } else if(command == "show" && Game.present == false){
            bot.sendMessage({to: channelID, message: "no game started"});
        }
    }
    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();        
        if (command == "reset")
        {
            Game.present = false
            Game.player1 = null
            Game.player2 = null
            gs1 = [circle, circle, circle, circle, circle, circle, circle];
            gs2 = [circle, circle, circle, circle, circle, circle, circle];
            gs3 = [circle, circle, circle, circle, circle, circle, circle];
            gs4 = [circle, circle, circle, circle, circle, circle, circle];
            gs5 = [circle, circle, circle, circle, circle, circle, circle];
            gs6 = [circle, circle, circle, circle, circle, circle, circle];
            bot.sendMessage({to: channelID, message: "game reset"})
        }
    }   

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();        
        if (command.includes("place") == true && Game.present == true){
            if(Game.lastPlaced != author && Game.player1 == author || Game.lastPlaced != author && Game.player2 == author){
                if(command.includes("red") == true)
                {
                    if(command.includes("1") == true){place(red, 0);} 
                    else if(command.includes("2") == true){place(red, 1);}
                    else if(command.includes("3") == true){place(red, 2);}
                    else if(command.includes("4") == true){place(red, 3);}
                    else if(command.includes("5") == true){place(red, 4);}
                    else if(command.includes("6") == true){place(red, 5);}
                    else if(command.includes("7") == true){place(red, 6);}
                }

                else if(command.includes("blue") == true)
                {
                    if(command.includes("1") == true){place(blue, 0);} 
                    else if(command.includes("2") == true){place(blue, 1);}
                    else if(command.includes("3") == true){place(blue, 2);}
                    else if(command.includes("4") == true){place(blue, 3);}
                    else if(command.includes("5") == true){place(blue, 4);}
                    else if(command.includes("6") == true){place(blue, 5);}
                }
                if (command.includes("blue") == false && command.includes("red") == false) {
                    bot.sendMessage({to: channelID, message: "No color given"});                
                }

                if (command.includes("1") == false && command.includes("2") == false && command.includes("3") == false && command.includes("4") == false && command.includes("5") == false && command.includes("6") == false ){
                    bot.sendMessage({to: channelID, message: "No row given"});                
                }
            } else{
                bot.sendMessage({to:channelID, message: "You already placed!"});
            }
        } else if(command.includes("place") == true && Game.present != true){
                bot.sendMessage({to: channelID, message: "No game started"});
        }
    }


    function place(color, row){
         if (gs1[row] == circle){gs1[row] = color;}
         else if (gs2[row] == circle){gs2[row] = color;}
         else if (gs3[row] == circle){gs3[row] = color;}
         else if (gs4[row] == circle){gs4[row] = color;}
         else if (gs5[row] == circle){gs5[row] = color;}
         else if (gs6[row] == circle){gs6[row] = color;}

         else {bot.sendMessage({to: channelID, message: "That row is full"});}
         Game.lastPlaced = author;
         draw();
         timestamp = new Date();
    }

    function draw(){
        bot.sendMessage({to: channelID, message: "Game between: `" + Game.player1 + "` and `" + Game.player2 + "`"});                
        bot.sendMessage({to: channelID, message: gs6.join("") + "\n" + gs5.join("") + "\n" + gs4.join("") + "\n" + gs3.join("") + "\n"+  gs2.join("") + "\n" + gs1.join("") });
    }   
        
    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        if (command.startsWith("eval") == true && author == "Gamerein"){
            try {eval(command.substring(5));}
            catch(err){
                bot.sendMessage({to: channelID, message:err})
            }
        }
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();
        if (command == "kill" && author == "Gamerein"){
            throw "killed by " + author;
        }
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command == "invite")
        {
            bot.sendMessage({to: channelID, message: " https://discordapp.com/oauth2/authorize?client_id=374338545185193984&scope=bot&permissions=3072"});
        }
    }

    if(new Date() - timestamp >  60000){
        console.log("Game set to false");
        Game.present = false;
        Game.player1 = null;
        Game.player2 = null;
    }

    function sMessage(msg){
        bot.sendMessage({to: channelID, message: msg});
    }

    if (Game.present == 1){
        bot.setPresence({game: {type: 0, name: Game.player1 + " & " + Game.player2}});
    } else{
        bot.setPresence({game: {type: 0, name: "cf start"}});        
    }
});