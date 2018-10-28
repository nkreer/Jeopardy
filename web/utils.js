// Display the players with their colors and their points
eel.expose(printPlayers)
function printPlayers(players){
    playerBar = document.getElementById("playerDisplay");
    playerBar.innerHTML = ""; // Get rid of anything already in there
    for(name in players){
        playerBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + players[name]["color"] + ';">' + name + ': ' + players[name]["points"] + '</div>';
    }
}

// Update the information shown in the infobar, e.g. buzzers
eel.expose(updateInfoDisplay)
function updateInfoDisplay(information){
    infoBar = document.getElementById("informationDisplay");
    infoBar.innerHTML = "";
    for(info in information){
        infoBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + information[info]["color"] + ';">' + information[info]["text"] + '</div>';
    }
}

// Show the board
eel.expose(populateBoard)
function populateBoard(categoryCount, questionCount){
    // Creating all columns for the categories
    tableView = document.getElementById("jeopardyTableView");
    tableView.innerHTML = "";
    for(i = 1; i <= categoryCount; i++){
        appendHtml = '<div class="col" id="categoryColumn-' + i + '"><h3 class="text-center">Category ' + i + '</h3></div>';
        tableView.innerHTML += appendHtml;
        categoryView = document.getElementById("categoryColumn-" + i);
        // Fill column with buttons to call up the questions
        for(question = 1; question <= questionCount; question++){
            appendHtml = '<button class="btn btn-outline-secondary btn-lg w-100 h-50">' + (question * 100) + '</button>';
            categoryView.innerHTML += appendHtml;
        }
    }
}