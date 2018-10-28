buzzers = false;
playerKeys = {};
buzzedInPlayer = "";
buzzedInCategory = -1;
buzzedInClue = -1;
buzzedInValue = 0;

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
        // Basically ask whether we're currently showing a clue
        if(buzzers){
            const key = event.key;
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
                    updateInfoDisplay({1: {"color": "blue", "size": 3, "text": playerKeys[playerKey]}});
                }
            }
        }
    });
}

eel.expose(toggleBuzzers)
// Enable or disable the buzzing functionality
function toggleBuzzers(buzzerCategory, buzzerClue, buzzerValue){
    buzzedInCategory = buzzerCategory;
    buzzedInClue = buzzerClue;
    buzzedInPlayer = "";
    buzzedInValue = buzzerValue;
    if(buzzers){
        buzzers = false;
    } else {
        buzzers = true;
    }
}