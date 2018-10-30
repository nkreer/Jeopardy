buzzers = false;
playerKeys = {};
buzzedInPlayer = "";
buzzedInCategory = -1;
buzzedInClue = -1;
buzzedInValue = 0;

// Special styling
function updateBuzzerInfoDisplay(players){
    updateInfoDisplay({1: {"color": players[buzzedInPlayer]["color"], "size": 3.5, "text": playerKeys[playerKey]}});
}

// Setting up the buzzers and other shortcuts
eel.expose(setupKeys);
function setupKeys(players){
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
            // Return to the board if q, discard clue
            if(key == "q"){
                toggleBuzzers(-1, -1, 0);
                eel.update_board();
            }

            // Return to the board if w, mark clue played
            if(key == "w"){
                eel.solved_clue("none", buzzedInCategory, buzzedInClue);
                toggleBuzzers(-1, -1, 0);
                eel.update_board();
            }

            // Reset the logged in player without giving or taking points
            if(key == "r"){
                updateInfoDisplay({1: {"color": "black", "text": "Buzzers reset"}, 
                    2: {"color": "blue", "text": "Previously " + buzzedInPlayer}});
                buzzedInPlayer = "";
            }

            // Verify the players answer as correct
            if(key == "v"){
                if(buzzedInPlayer != ""){
                    eel.solved_clue(buzzedInPlayer, buzzedInCategory, buzzedInClue);
                    eel.points_to_player(buzzedInPlayer, buzzedInValue);
                    toggleBuzzers(-1, -1, 0);
                    eel.update_board();
                }
            }

            // Incorrect answer
            if(key == "x"){
                if(buzzedInPlayer != ""){
                    // Give negative points
                    eel.points_to_player(buzzedInPlayer, buzzedInValue * -1);
                    updateInfoDisplay({1: {"color": "red", "text": "Incorrect answer"}, 
                        2: {"color": "black", "text": "by " + buzzedInPlayer}});
                    // Other players can buzz in again
                    buzzedInPlayer = "";
                }
            }

            // Check if a player has buzzed in
            for(playerKey in playerKeys){
                // Verify no one else has buzzed in
                if(key == playerKey && buzzedInPlayer == ""){
                    buzzedInPlayer = playerKeys[playerKey];
                    updateBuzzerInfoDisplay(players)                    
                }
            }
        } else {
            // What to do when we're showing the board

            // Export the game to files
            if(key == "w"){
                console.log("Exporting the game");
                eel.export_game();
                // Let host know via infobar
                updateInfoDisplay([{"color": "black", "text": "Dumped game data."}]);
            }

            // Randomly selecting a player
            if(key == "x"){
                eel.random_player(true);
            }

            // Re-draw the board
            if(key == "r"){
                console.log("Re-loaded the board");
                eel.update_board();
            }
        }
    });
}

eel.expose(toggleBuzzers)
// Enable or disable the buzzing functionality
function toggleBuzzers(buzzerCategory, buzzerClue, buzzerValue, buzzerPlayer=""){
    buzzedInCategory = buzzerCategory;
    buzzedInClue = buzzerClue;
    buzzedInPlayer = buzzerPlayer;
    buzzedInValue = buzzerValue;
    if(buzzers){
        buzzers = false;
    } else {
        buzzers = true;
    }
}