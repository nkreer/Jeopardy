import eel

# Defaults
colors = ["#3e4444", "#82b74b", "#405d27", "#544130", "#441c1c", "#361c44"]

# Setting up the game of Jeopardy
players = {}

while True:
    player = input("Player name: ");
    if player is "":
        # Configuration is done
        break

    color = input("That player's color (leave blank for default): ")
    # Assign the default color
    if color is "":
        color = colors[len(players)]

    # Create player and assign given color and points
    players[player] = {}
    players[player]["color"] = color
    players[player]["points"] = 0


# Eel stuff
eel.init("web")

@eel.expose
def quit_app():
    quit()

@eel.expose
def update_board():
    eel.populateBoard(6, 5)
    eel.printPlayers(players)
    eel.updateInfoDisplay({1: {"color": "black", "text": "Jeopardy!"}})

eel.start("main.html", block=False)

while True:
    eel.sleep(1.0)