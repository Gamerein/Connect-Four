// Todo:
// Fix async stuff
// About command
// author to ID
// cf show should give nick
// remove needed color in cf place

var Discord = require('discord.io');
var pjson = require('./package.json');

var bot = new Discord.Client({
    token: "token_here",
    autorun: true
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.setPresence({game: {type: 0, name: "cf start"}});

var circle = ":black_circle:";
var prefix = "cf";
var red = ":red_circle:";
var blue = ":large_blue_circle:";

var Game = {
    present: false, 
    player1: {name : null, color: null},
    player2: {name : null, color: null},
    colorPlayer1: null,
    colorPlayer2: null,
    lastPlaced: null
}

gs1 = gs2 = gs3 = gs4 = gs5 = gs6 = [circle, circle, circle, circle, circle, circle, circle];

bot.on("message", function (user, userID, channelID, message, event)
{   

    try{
    var author = event.d.author.username
    if (message.substring(0, prefix.length) == prefix)
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command.startsWith("start") == true)
        {
            var arguments = command.replace("start", "").split("|");

            if (command.includes("red:") == true) {
                red = arguments.filter(function (input){return input.replace(" ", "").startsWith("red:")}).toString().replace("red:", "").replace(" ", "");
            }
            if (command.includes("blue:") == true){
                blue = arguments.filter(function (input){return input.replace(" ", "").startsWith("blue:")}).toString().replace("blue:", "").replace(" ", "");
            }

            bot.sendMessage({to: channelID, message: "Game started by `" + author + "`  Join with `cf join`. Place a circle with `cf place <red/>blue> <row>`"});
            draw();
            Game.player1.name = author;            
            Game.present = true;
            timestamp = new Date();
            console.log("new game started");
        }
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();

        if(command == "join" && Game.present == true)
        {
            if (author != Game.player1.name && author != Game.player2.name){
            bot.sendMessage({to: channelID, message: "`" + author + "` joined"})                
            Game.player2.name = author
            } else{
                throw "you have already joined";
            }
        } else if(command == "join" && Game.present != true) {
            throw "no game started";
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
            throw "no game started";
        }
    }
    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();        
        if (command == "reset")
        {
            reset();
            bot.sendMessage({to: channelID, message: "game reset"})
        }
    }   

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();        
        if (command.startsWith("place") == true && Game.present == true)
        {
            if(Game.lastPlaced != author && Game.player1.name == author || Game.lastPlaced != author && Game.player2.name == author)
            {
                if(command.includes("red") == true || command.includes("r") == true)
                {
                    if(command.includes("1") == true){place(red, 0);} 
                    else if(command.includes("2") == true){place(red, 1);}
                    else if(command.includes("3") == true){place(red, 2);}
                    else if(command.includes("4") == true){place(red, 3);}
                    else if(command.includes("5") == true){place(red, 4);}
                    else if(command.includes("6") == true){place(red, 5);}
                    else if(command.includes("7") == true){place(red, 6);}
                }

                else if(command.includes("blue") == true || command.includes("b") == true)
                {
                    if(command.includes("1") == true){place(blue, 0);} 
                    else if(command.includes("2") == true){place(blue, 1);}
                    else if(command.includes("3") == true){place(blue, 2);}
                    else if(command.includes("4") == true){place(blue, 3);}
                    else if(command.includes("5") == true){place(blue, 4);}
                    else if(command.includes("6") == true){place(blue, 5);}
                    else if(command.includes("7") == true){place(blue, 6);}
                }
                if (command.includes("blue") == false && command.includes("red") == false && command.includes("b") == false && command.includes("r") == false) {
                    throw "No color given";    
                }

                if (command.includes("1") == false && command.includes("2") == false && command.includes("3") == false && command.includes("4") == false && command.includes("5") == false && command.includes("6") == false  && command.includes("7") == false){
                    throw"No row given";          
                }
            } else if(author != Game.player1.name && author != Game.player2.name){
                throw"You aren't participating!";
                }else {throw "You already placed!";}
        
        } else if(command.includes("place") == true && Game.present != true){
                throw "No game started";
        }
    }


    function place(color, row){
        if (colorHandler(color) == true){
            if (gs1[row] == circle){gs1[row] = color;}
            else if (gs2[row] == circle){gs2[row] = color;}
            else if (gs3[row] == circle){gs3[row] = color;}
            else if (gs4[row] == circle){gs4[row] = color;}
            else if (gs5[row] == circle){gs5[row] = color;}
            else if (gs6[row] == circle){gs6[row] = color;}

            else {throw "That row is full";}
            Game.lastPlaced = author;
            draw();
            timestamp = new Date();
        }
    }

    function colorHandler(color){
        if (author == Game.player1.name){
            if (color == Game.player1.color) {return true}
            else if (Game.player1.color == null && color != Game.player2.color || Game.player1.color == null && Game.player2.color == null) {
                Game.player1.color = color;
                return true
            } else {throw "That's not your color..."; return false}
        }
        if (author == Game.player2.name){
            if (color == Game.player2.color) {return true}            
            else if (Game.player2.color == null && color != Game.player1.color || Game.player1.color == null && Game.player2.color == null) {
                Game.player2.color = color;
                return true
            } else {throw "That's not your color..."; return false}
        }
    }

    function draw()
    {
        var playingfield = gs6.join(" ") + "\n" + gs5.join(" ") + "\n" + gs4.join(" ") + "\n" + gs3.join(" ") + "\n"+  gs2.join(" ") + "\n" + gs1.join(" ");
        bot.sendMessage({to: channelID, message: "Game between: `" + Game.player1.name + "` and `" + Game.player2.name + "`" + "\n" + playingfield});                
    }   
        
    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        if (command.startsWith("eval") == true && author == "Gamerein"){
            try {eval(command.substring(5));}
            catch(err){
                bot.sendMessage({to: channelID, message: ":x:**EVAL ERROR:** *" + err + "*"})
            }
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

    //if(Game.present == true && new Date() - timestamp >  60000){
    //    console.log("Game set to false");
    //    reset();
    //}

    function sMessage(msg){
        bot.sendMessage({to: channelID, message: msg});
    }

    if (Game.present == 1){
        bot.setPresence({game: {type: 0, name: Game.player1.name + " & " + Game.player2.name}});
    } else{
        bot.setPresence({game: {type: 0, name: "cf start"}});        
    }

    function reset(){
        red = ":red_circle:";
        blue = ":large_blue_circle:";
        Game = {
            present: false, 
            player1: {name : null, color: null},
            player2: {name : null, color: null},
            colorPlayer1: null,
            colorPlayer2: null,
            lastPlaced: null
        };
        gs1 = gs2 = gs3 = gs4 = gs5 = gs6 = [circle, circle, circle, circle, circle, circle, circle];
    }}catch(err){
        console.log(`ERROR: ${err}`)
        bot.sendMessage({to: channelID, message: ":x:**ERROR:** *" + err + "*"});
    }

    if (message.substring(0, prefix.length) == prefix) 
    {
        var command = message.substring(prefix.length + 1);
        command = command.toLowerCase();
        if (command == "kill" && author == "Gamerein"){
            throw "killed by " + author;
        }
    }

});