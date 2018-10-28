// Display the players with their colors and their points
eel.expose(printPlayers);
function printPlayers(players){
    playerBar = document.getElementById("playerDisplay");
    playerBar.innerHTML = ""; // Get rid of anything already in there
    for(name in players){
        playerBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + players[name]["color"] + ';">' + name + ': ' + players[name]["points"] + '</div>';
    }
}

// Update the information shown in the infobar, e.g. buzzers
eel.expose(updateInfoDisplay);
function updateInfoDisplay(information){
    infoBar = document.getElementById("informationDisplay");
    infoBar.innerHTML = "";
    for(info in information){
        infoBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + information[info]["color"] + ';' + (information[info]["size"] ? " font-size: " + information[info]["size"] + "em;" : "") + '">' + information[info]["text"] + '</div>';
    }
}

// Show the clue
eel.expose(showClue);
function showClue(clues, category, clue, value){
    // Get the board clean
    tableView = document.getElementById("gameView");
    // Grab the clue and its associated information
    clueData = clues[category]["clues"][clue];
    // Show the clue
    tableView.innerHTML = '<div class="container vertical-center text-center clue">' + clueData["clue"] + '</div>';
    toggleBuzzers(category, clue, value);
}

// Show the board
eel.expose(populateBoard);
function populateBoard(clues, players){
    // Creating all columns for the categories
    buttonStyle = "btn btn-outline-secondary btn-lg w-100 h-50";
    gameView = document.getElementById("gameView");
    // Create a row element for the board table
    gameView.innerHTML = '<br><br><div class="row no-gutters" id="tableView">';
    tableView = document.getElementById("tableView");
    tableView.innerHTML = "";
    categoryCount = clues.length;
    for(i = 0; i < categoryCount; i++){
        // Print the name of the category at the top
        appendHtml = '<div class="col" id="categoryColumn-' + i + '"><h3 class="text-center">' + clues[i]["name"] + '</h3></div>';
        tableView.innerHTML += appendHtml;
        // Fill column with buttons to call up the questions
        questionCount = clues[i]["clues"].length;
        categoryView = document.getElementById("categoryColumn-" + i);
        for(question = 0; question < questionCount; question++){
            // Set the button text to the value of the clue if the clue isn't played yet
            name = clues[i]["clues"][question]["played"];
            value = clues[i]["values"][question];
            // Fucking JS is so broken!!!! dang it
            if(name == "false"){
                appendHtml = '<button onclick="eel.show_clue(' + i + ', ' + question + ', ' + value + ')" class="' + buttonStyle + '">' + value + '</button>';
            // Set the button text and color to the name of the player that won it
            } else if(name == "none"){
                appendHtml = '<button class="' + buttonStyle + '" style="background-color: #000; color: white;">' + value + '</button>';
            } else {
                color = players[name]["color"];
                appendHtml = '<button class="' + buttonStyle + '" style="background-color: ' + color + '; color: white;">' + name + ' +' + value + '</button>';
            }
            categoryView.innerHTML += appendHtml;
        }
    }
    // End the row
    /**
    * I would really like to leave a comment for any future developer here.
    * WHY ON EARTH DOES JAVASCRIPT AUTOMATICALLY CLOSE THE DIV TAG WITH THE ROW CLASS???
    * I NOW HAVE TO USE 3 (THREE!!!) DOM ELEMENTS JUST BECAUSE I WOULD LIKE TO HAVE A ROW ON DISPLAY???
    * I'll never do any web stuff again after this. (won't ever happen, lol)
    * btw. you can just leave this line out and see for yourself that everything is still alright
    */
    gameView.innerHTML += "</div>";
}