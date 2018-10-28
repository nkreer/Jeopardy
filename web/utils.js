eel.expose(printPlayers)
function printPlayers(players){
    playerBar = document.getElementById("playerDisplay");
    for(name in players){
        playerBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + players[name]["color"] + ';">' + name + ': ' + players[name]["points"] + '</div>';
    }
}

eel.expose(updateInfoDisplay)
function updateInfoDisplay(information){
    infoBar = document.getElementById("informationDisplay");
    for(info in information){
        infoBar.innerHTML += '<div class="col infobar text-center" style="background-color: ' + information[info]["color"] + ';">' + information[info]["text"] + '</div>';
    }
}