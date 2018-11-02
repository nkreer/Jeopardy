buzzers = false;
playerKeys = {};
buzzedInPlayer = "";
buzzedInCategory = -1;
buzzedInClue = -1;
buzzedInValue = 0;
expectedResponse = "None";

// Special styling
eel.expose(updateBuzzerInfoDisplay)
function updateBuzzerInfoDisplay(players){
    eel.update_info_display([{"color": players[buzzedInPlayer]["color"], "size": 3.5, "text": buzzedInPlayer}]);
}

// Setting up the buzzers and other shortcuts
eel.expose(setupKeys);
function setupKeys(players, controls){
    // Assign the players to keys
    for(player in players){
        key = players[player]["key"];
        playerKeys[key] = player;
    }

    // Key handler
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        // Basically ask whether we're currently showing a clue
        if(buzzers){
            // Return to the board
            if(key == controls["discard"]){
                toggleBuzzers(-1, -1, 0);
                eel.update_board();
            }

            // Return to the board, mark clue played
            if(key == controls["played"]){
                eel.solved_clue("none", buzzedInCategory, buzzedInClue);
                toggleBuzzers(-1, -1, 0);
                eel.update_board();
            }

            // Reset the logged in player without giving or taking points
            if(key == controls["reset"]){
                eel.update_info_display({1: {"color": "black", "text": "Buzzers reset"}, 
                    2: {"color": "blue", "text": "Previously " + buzzedInPlayer}});
                buzzedInPlayer = "";
            }

            // Show the expected response on this screen only
            if(key == controls["reveal"]){
                updateInfoDisplay([{"color": "blue", "text": expectedResponse}]);
            }

            // Verify the players answer as correct
            if(key == controls["correct"]){
                if(buzzedInPlayer != ""){
                    eel.solved_clue(buzzedInPlayer, buzzedInCategory, buzzedInClue);
                    eel.points_to_player(buzzedInPlayer, buzzedInValue);
                    toggleBuzzers(-1, -1, 0);
                    // Return to the board
                    eel.update_board();
                }
            }

            // Incorrect answer
            if(key == controls["wrong"]){
                if(buzzedInPlayer != ""){
                    // Give negative points
                    eel.points_to_player(buzzedInPlayer, buzzedInValue * -1);
                    eel.update_info_display([{"color": "red", "text": "Incorrect answer"}, 
                        {"color": "black", "text": "by " + buzzedInPlayer}]);
                    // Other players can buzz in again
                    buzzedInPlayer = "";
                }
            }

            // Check if a player has buzzed in
            for(playerKey in playerKeys){
                // Verify no one else has buzzed in
                if(key == playerKey && buzzedInPlayer == ""){
                    buzzedInPlayer = playerKeys[playerKey];
                    eel.buzz_player();
                    console.log("Buzzing in");                 
                }
            }
        } else {
            // What to do when we're showing the board

            // Export the game to files
            if(key == controls["export"]){
                console.log("Exporting the game");
                eel.export_game();
                // Let host know via infobar
                eel.update_info_display([{"color": "black", "text": "Dumped game data."}]);
            }

            // Randomly selecting a player
            if(key == controls["random"]){
                eel.random_player(true);
            }

            // Re-draw the board
            if(key == controls["reload"]){
                console.log("Re-loaded the board");
                eel.update_board();
            }
        }
    });
}

eel.expose(toggleBuzzers)
// Enable or disable the buzzing functionality
function toggleBuzzers(buzzerCategory, buzzerClue, buzzerValue, buzzerPlayer="", response="None"){
    buzzedInCategory = buzzerCategory;
    buzzedInClue = buzzerClue;
    buzzedInPlayer = buzzerPlayer;
    buzzedInValue = buzzerValue;
    expectedResponse = response;
    if(buzzers){
        buzzers = false;
    } else {
        buzzers = true;
    }
}